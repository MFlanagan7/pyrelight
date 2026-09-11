import type { Metadata } from "next";
import { SectionHeading } from "@/components/core";
import { ContentCard } from "@/components/site";
import { RESOURCE_SECTIONS, countBySection } from "@/lib/resources";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Resources",
  description: "Maps, adventures, tools, guides and handouts for running Starfall.",
  alternates: { canonical: "/resources" },
};

export default async function ResourcesIndex() {
  const counts = await countBySection();

  return (
    <main className={styles.main}>
      <SectionHeading
        eyebrow="For the table"
        title="Resources"
        body="Everything for running a game: maps to drop into a VTT, adventures to run on Thursday, and tools that do the fiddly parts for you."
      />

      <div className={styles.grid}>
        {RESOURCE_SECTIONS.map((section) => (
          <ContentCard
            key={section.slug}
            href={`/resources/${section.slug}`}
            title={section.title}
            body={section.note}
            count={counts[section.slug] || undefined}
          />
        ))}
      </div>
    </main>
  );
}
