import type { Metadata } from "next";
import { SectionHeading } from "@/components/core";
import { ContentCard } from "@/components/site";
import { getPayloadClient, publishedOnly } from "@/lib/payload";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Dispatches",
  description: "Notes from the work and from the world. Starfall, built in public.",
};

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function DispatchesIndex() {
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "dispatches",
    where: publishedOnly,
    sort: "-publishedAt",
    limit: 24,
    depth: 1,
  });

  return (
    <main className={styles.main}>
      <SectionHeading
        eyebrow="Built in public"
        title="Dispatches"
        body="Notes from the work and from the world — what is being written, what is being cut, and why."
      />

      {docs.length === 0 ? (
        <p className={styles.empty}>
          Nothing published yet. The first dispatch is being written.
        </p>
      ) : (
        <div className={styles.grid}>
          {docs.map((d) => (
            <ContentCard
              key={d.id}
              href={`/dispatches/${d.slug}`}
              title={d.title}
              body={d.excerpt}
              tag={d.publishedAt ? dateFormat.format(new Date(d.publishedAt)) : undefined}
            />
          ))}
        </div>
      )}
    </main>
  );
}
