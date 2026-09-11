import "server-only";

import { getPayloadClient } from "./payload";

/**
 * Full-text search over every published content collection.
 *
 * Postgres rather than a hosted index: the data is already here, a GIN index
 * answers in single-digit milliseconds, and there is no sync pipeline to drift.
 *
 * Ranking is weighted, because a match in a title means far more than the same
 * word buried in a body:
 *
 *   A  title
 *   C  summary, excerpt or blurb
 *   D  the flattened body, from the searchText column
 *
 * B is left for tags. They live in a join table, and mixing that into the rank
 * expression would cost a join per row for a weight nobody has yet asked for.
 * Tag matches are surfaced separately instead — see findMatchingTags — which is
 * both cheaper and more useful, since it offers a filter rather than a result.
 *
 * websearch_to_tsquery is what parses the query: it understands quoted phrases
 * and OR, and — unlike to_tsquery — never throws on input a human typed. A
 * search box that errors on an apostrophe is worse than one that finds nothing.
 */

/** Collections searched, with the columns each uses for its short text. */
const SEARCHABLE = [
  { table: "wiki_articles", label: "Article", summary: "summary", href: "/wiki/" },
  { table: "wiki_gods", label: "God", summary: "summary", href: "/wiki/" },
  { table: "wiki_factions", label: "Faction", summary: "summary", href: "/wiki/" },
  { table: "wiki_regions", label: "Region", summary: "summary", href: "/wiki/" },
  { table: "resources", label: "Resource", summary: "summary", href: null },
  { table: "dispatches", label: "Dispatch", summary: "excerpt", href: "/dispatches/" },
  { table: "products", label: "Product", summary: "blurb", href: "/products/" },
] as const;

export type SearchHit = {
  label: string;
  title: string;
  summary: string | null;
  href: string;
  rank: number;
};

/** The ranked expression, repeated per table with its own summary column. */
const rankExpression = (summaryColumn: string) => `
  ts_rank(
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(${summaryColumn}, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(search_text, '')), 'D'),
    query
  )`;

const matchExpression = (summaryColumn: string) => `
  (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(${summaryColumn}, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(search_text, '')), 'D')
  ) @@ query`;

export const search = async (term: string, limit = 30): Promise<SearchHit[]> => {
  const trimmed = term.trim();
  if (trimmed.length < 2) return [];

  const payload = await getPayloadClient();

  /**
   * One UNION ALL rather than a query per table, so Postgres ranks the whole
   * result set at once. Resources need their section in the path, which is why
   * the href is built in SQL rather than by a shared prefix.
   */
  const parts = SEARCHABLE.map((source) => {
    const href =
      source.href === null
        ? `'/resources/' || section || '/' || slug`
        : `'${source.href}' || slug`;

    return `
      SELECT
        '${source.label}' AS label,
        title,
        ${source.summary} AS summary,
        ${href} AS href,
        ${rankExpression(source.summary)} AS rank
      FROM payload.${source.table}, websearch_to_tsquery('english', $1) query
      WHERE _status = 'published' AND ${matchExpression(source.summary)}`;
  });

  const sql = `${parts.join("\n      UNION ALL\n")}
    ORDER BY rank DESC, title ASC
    LIMIT ${Number(limit)}`;

  try {
    const result = await payload.db.pool.query(sql, [trimmed]);
    return result.rows as SearchHit[];
  } catch {
    // A malformed query must return nothing rather than break the page.
    return [];
  }
};

/**
 * Tags whose name or alias resembles the query.
 *
 * Offered as filters above the results, which is the job tags do that
 * full-text cannot: an entry calling something "the Lantern" throughout is
 * unreachable by a search for "Drowned Lantern" unless a human asserted the
 * connection. That assertion is the alias.
 */
export const findMatchingTags = async (term: string) => {
  const trimmed = term.trim();
  if (trimmed.length < 2) return [];

  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "tags",
    where: {
      or: [
        { title: { like: trimmed } },
        { "aliases.alias": { like: trimmed } },
      ],
    },
    limit: 6,
    depth: 0,
  });

  return docs;
};
