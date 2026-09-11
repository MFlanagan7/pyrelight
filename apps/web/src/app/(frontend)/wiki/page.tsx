import type { Metadata } from "next";
import { SectionHeading } from "@/components/core";
import { ContentCard } from "@/components/site";
import { WIKI_PILLARS } from "@/lib/wiki";
import { countEntriesByPillar, findPillars } from "@/lib/wiki-content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The World",
  description:
    "The Starfall wiki: astralite, the gods, the sea, its peoples, its magic, its realms and its history.",
  alternates: { canonical: "/wiki" },
};

export default async function WikiIndex() {
  const [pillars, counts] = await Promise.all([findPillars(), countEntriesByPillar()]);

  // Ordered by lib/wiki.ts rather than by title or creation date: the pillars
  // have a deliberate reading order, with astralite first because it is the
  // setting's signature.
  const ordered = WIKI_PILLARS.map((declared) =>
    pillars.find((p) => p.slug === declared.slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className={styles.main}>
      <SectionHeading
        eyebrow="Peoples of Starfall"
        title="The World"
        body="Divinity came down as light and landed as currency. What follows is the world that grew around it — seven ways in."
      />

      <div className={styles.grid}>
        {ordered.map((pillar) => (
          <ContentCard
            key={pillar.id}
            href={`/wiki/${pillar.slug}`}
            title={pillar.title}
            body={pillar.description}
            count={counts[pillar.id] || undefined}
          />
        ))}
      </div>
    </main>
  );
}
