import type { Metadata } from "next";
import { Pill, SectionHeading } from "@/components/core";
import { EmptyState } from "@/components/content";
import { SearchField } from "@/components/navigation";
import { ListGroup, ListRow } from "@/components/site";
import { findMatchingTags, search } from "@/lib/search";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Starfall wiki, dispatches, resources and catalogue.",
  // A results page is thin, duplicative and infinite in variety. Crawling it
  // wastes budget that belongs on the content it points at.
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const params = await searchParams;
  const raw = params.q;
  const query = (Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "";

  const [hits, tags] = query
    ? await Promise.all([search(query), findMatchingTags(query)])
    : [[], []];

  return (
    <main className={styles.main}>
      <SectionHeading
        eyebrow="Find"
        title="Search"
        body="One box across the wiki, the dispatches, the resource library and the catalogue."
      />

      <div className={styles.field}>
        <SearchField defaultValue={query} size="lg" autoFocus={!query} />
      </div>

      {query && (
        <>
          {/* Offered before results because a tag is a better answer than a
              keyword match when one exists — it gathers everything on a
              subject, including entries that never use the word searched. */}
          {tags.length > 0 && (
            <div className={styles.tagSuggestions}>
              <p className={styles.tagLead}>
                There {tags.length === 1 ? "is a tag" : "are tags"} for this. A tag
                gathers everything on the subject, including entries that never use
                the word you typed.
              </p>
              <div className={styles.tagRow}>
                {tags.map((tag) => (
                  <Pill key={tag.id} href={`/tags/${tag.slug}`} tone="gold">
                    {tag.title}
                  </Pill>
                ))}
              </div>
            </div>
          )}

          <p className={styles.count}>
            {hits.length === 0
              ? "No matches"
              : `${hits.length} ${hits.length === 1 ? "match" : "matches"} for “${query}”`}
          </p>

          <div className={styles.results}>
            {hits.length === 0 ? (
              <EmptyState
                title="Nothing found"
                body="Try a shorter phrase, or browse the wiki by pillar. Very new writing may not be published yet."
              />
            ) : (
              <ListGroup>
                {hits.map((hit) => (
                  <ListRow
                    key={hit.href}
                    href={hit.href}
                    title={hit.title}
                    body={hit.summary ?? undefined}
                    meta={hit.label}
                    display={false}
                  />
                ))}
              </ListGroup>
            )}
          </div>
        </>
      )}
    </main>
  );
}
