import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Pill, SectionHeading } from "@/components/core";
import { EmptyState, SpoilerBlock } from "@/components/content";
import { Breadcrumbs, TableOfContents } from "@/components/navigation";
import { ListGroup, ListRow } from "@/components/site";
import { EntryInfoBox } from "@/components/wiki/EntryInfoBox";
import { RichText } from "@/components/RichText";
import { attributionFor } from "@/lib/legal";
import { extractToc } from "@/lib/toc";
import { WIKI_PILLARS } from "@/lib/wiki";
import {
  findAllWikiEntries,
  findEntriesInPillar,
  findPillarBySlug,
  findWikiEntry,
} from "@/lib/wiki-content";
import type { Tag } from "@/payload-types";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

import styles from "./page.module.css";

/** The shape the four wiki collections share. */
type WikiEntryDoc = Record<string, unknown> & {
  title: string;
  summary?: string | null;
  body?: SerializedEditorState | null;
  spoiler?: boolean | null;
  licence?: string | null;
  category?: { title?: string; slug?: string } | null;
};

/**
 * One route for two kinds of page.
 *
 * Pillars live at /wiki/<pillar> and entries at /wiki/<slug>, in one flat
 * namespace — so a single dynamic segment has to serve both, and two routes
 * would conflict. Pillar names are reserved as entry slugs (lib/wiki.ts), so
 * the branch below can never be ambiguous.
 */

export async function generateStaticParams() {
  const entries = await findAllWikiEntries();
  return [
    ...WIKI_PILLARS.map((p) => ({ slug: p.slug })),
    ...entries.map((e) => ({ slug: e.slug })),
  ];
}

export async function generateMetadata({
  params,
}: PageProps<"/wiki/[slug]">): Promise<Metadata> {
  const { slug } = await params;

  const pillar = await findPillarBySlug(slug);
  if (pillar) {
    return {
      title: pillar.title,
      description: pillar.description || undefined,
      alternates: { canonical: `/wiki/${pillar.slug}` },
    };
  }

  const found = await findWikiEntry(slug);
  if (!found) return {};

  const doc = found.doc as { title: string; summary?: string | null; seo?: { title?: string | null; description?: string | null; noIndex?: boolean | null } };
  return {
    title: doc.seo?.title || doc.title,
    description: doc.seo?.description || doc.summary || undefined,
    robots: doc.seo?.noIndex ? { index: false } : undefined,
    alternates: { canonical: `/wiki/${slug}` },
  };
}

export default async function WikiSlugPage({ params }: PageProps<"/wiki/[slug]">) {
  const { slug } = await params;

  const pillar = await findPillarBySlug(slug);
  if (pillar) return <PillarPage pillar={pillar} />;

  const found = await findWikiEntry(slug);
  if (!found) notFound();

  return <EntryPage found={found} />;
}

async function PillarPage({
  pillar,
}: {
  pillar: { id: number; title: string; slug: string; description?: string | null };
}) {
  const entries = await findEntriesInPillar(pillar.id);

  return (
    <main className={styles.main}>
      <Breadcrumbs
        items={[{ label: "The World", href: "/wiki" }, { label: pillar.title }]}
      />

      <SectionHeading
        eyebrow="Pillar"
        title={pillar.title}
        body={pillar.description || undefined}
      />

      <div className={styles.pillarList}>
        {entries.length === 0 ? (
          <EmptyState
            title="Nothing written here yet"
            body="This pillar is waiting on its first entries. They arrive alongside the products that introduce them."
          />
        ) : (
          <ListGroup>
            {entries.map((entry) => (
              <ListRow
                key={`${entry.collection}-${entry.id}`}
                href={`/wiki/${entry.slug}`}
                title={entry.title}
                body={entry.summary ?? undefined}
                meta={entry.label}
                display={false}
              />
            ))}
          </ListGroup>
        )}
      </div>
    </main>
  );
}

function EntryPage({
  found,
}: {
  found: Awaited<ReturnType<typeof findWikiEntry>>;
}) {
  if (!found) notFound();

  /**
   * The four collections share these fields but are four distinct generated
   * types, and only some carry `spoiler`. Narrowing through `unknown` is
   * deliberate rather than lazy: the shared shape is real, and the alternative
   * is a four-way discriminated union repeated at every read.
   */
  const doc = found.doc as unknown as WikiEntryDoc;

  const pillar = doc.category ?? null;
  const tags = ((doc.tags as unknown[]) ?? []).filter(
    (t): t is Tag => typeof t === "object" && t !== null,
  );
  const related = ((doc.related as unknown[]) ?? []).filter(
    (r): r is { value: { title?: string; slug?: string }; relationTo: string } =>
      typeof r === "object" && r !== null,
  );

  const toc = extractToc(doc.body ?? undefined);
  const attribution = attributionFor(doc.licence);

  const body = doc.body ? <RichText data={doc.body} /> : null;

  return (
    <main className={styles.main}>
      <Breadcrumbs
        items={[
          { label: "The World", href: "/wiki" },
          ...(pillar?.slug
            ? [{ label: pillar.title ?? "", href: `/wiki/${pillar.slug}` }]
            : []),
          { label: doc.title },
        ]}
      />

      <h1 className={styles.title}>{doc.title}</h1>
      {doc.summary && <p className={styles.summary}>{doc.summary}</p>}

      <div className={styles.layout}>
        <div>
          {/* An entry marked as a spoiler hides its whole body behind a reveal,
              rather than relying on the author remembering to wrap it. */}
          {doc.spoiler ? (
            <SpoilerBlock
              title="Spoilers"
              note="This entry gives away something the table may not have found yet."
            >
              {body}
            </SpoilerBlock>
          ) : (
            body
          )}

          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <Pill key={tag.id} href={`/tags/${tag.slug}`}>
                  {tag.title}
                </Pill>
              ))}
            </div>
          )}

          {related.length > 0 && (
            <div className={styles.related}>
              <p className={styles.relatedTitle}>Related</p>
              <ListGroup>
                {related.map((r, i) => (
                  <ListRow
                    key={`${r.relationTo}-${i}`}
                    href={r.value?.slug ? `/wiki/${r.value.slug}` : undefined}
                    title={r.value?.title ?? "Untitled"}
                    display={false}
                  />
                ))}
              </ListGroup>
            </div>
          )}

          {attribution && <p className={styles.licence}>{attribution}</p>}
        </div>

        <aside className={styles.rail}>
          <EntryInfoBox collection={found.collection} doc={doc} />
          {/* Hidden for a spoilered entry: a contents list of concealed
              headings would give away exactly what the reveal is protecting. */}
          {!doc.spoiler && toc.length > 1 && <TableOfContents items={toc} />}
        </aside>
      </div>
    </main>
  );
}
