import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * GIN indexes for full-text search.
 *
 * Hand-written rather than generated: Payload has no tsvector field type, so
 * these cannot be expressed in a collection config.
 *
 * Expression indexes rather than a stored tsvector column, deliberately. A
 * column Payload does not know about is schema drift — the next generated
 * migration would propose dropping it. An index is not a column, so it sits
 * outside that diff.
 *
 * The expression here must match lib/search.ts EXACTLY or Postgres will
 * silently ignore the index and fall back to a sequential scan. That includes
 * the explicit 'english' config, which is also what makes to_tsvector immutable
 * and therefore indexable at all — the two-argument form depending on a session
 * setting is not.
 */

const TABLES = [
  { table: "wiki_articles", summary: "summary" },
  { table: "wiki_gods", summary: "summary" },
  { table: "wiki_factions", summary: "summary" },
  { table: "wiki_regions", summary: "summary" },
  { table: "resources", summary: "summary" },
  { table: "dispatches", summary: "excerpt" },
  { table: "products", summary: "blurb" },
];

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const { table, summary } of TABLES) {
    await db.execute(
      sql.raw(`
        CREATE INDEX IF NOT EXISTS "${table}_search_idx"
        ON "payload"."${table}"
        USING GIN ((
          setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
          setweight(to_tsvector('english', coalesce(${summary}, '')), 'C') ||
          setweight(to_tsvector('english', coalesce(search_text, '')), 'D')
        ))`),
    )
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const { table } of TABLES) {
    await db.execute(sql.raw(`DROP INDEX IF EXISTS "payload"."${table}_search_idx"`))
  }
}
