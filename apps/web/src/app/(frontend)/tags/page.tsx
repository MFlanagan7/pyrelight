import type { Metadata } from "next";
import { Pill, SectionHeading } from "@/components/core";
import { EmptyState } from "@/components/content";
import { findAllTags } from "@/lib/tags";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Tags",
  description: "Every subject, type and system label used across Starfall.",
  alternates: { canonical: "/tags" },
};

/** Group order and copy, matching the vocabulary rules in the site IA. */
const GROUPS = [
  { key: "subject", title: "Subject", note: "What an entry is about." },
  { key: "type", title: "Type", note: "What kind of thing an entry is." },
  {
    key: "system",
    title: "System",
    note: "Game mechanics an entry contains — not what it is about.",
  },
] as const;

export default async function TagsIndex() {
  const tags = await findAllTags();

  return (
    <main className={styles.main}>
      <SectionHeading
        eyebrow="Index"
        title="Tags"
        body="One vocabulary across the wiki, the dispatches and the catalogue. A tag gathers everything that touches it, wherever it lives."
      />

      {tags.length === 0 ? (
        <div className={styles.groups}>
          <EmptyState
            title="No tags yet"
            body="Tags are added as the writing demands them, rather than invented in advance."
          />
        </div>
      ) : (
        <div className={styles.groups}>
          {GROUPS.map((group) => {
            const inGroup = tags.filter((t) => t.group === group.key);
            if (inGroup.length === 0) return null;

            return (
              <section key={group.key}>
                <h2 className={styles.groupTitle}>{group.title}</h2>
                <p className={styles.groupNote}>{group.note}</p>
                <div className={styles.cloud}>
                  {inGroup.map((tag) => (
                    <Pill key={tag.id} href={`/tags/${tag.slug}`}>
                      {tag.title}
                    </Pill>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}
