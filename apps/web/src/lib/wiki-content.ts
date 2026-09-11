import type { Category } from "@/payload-types";
import { getPayloadClient, publishedOnly } from "./payload";

/**
 * Queries across the four wiki collections.
 *
 * Entries share one flat namespace at /wiki/<slug>, so a lookup has to ask
 * every collection. They are listed here rather than hardcoded at each call
 * site, which is also what makes adding a fifth collection a one-line change.
 *
 * The collections differ because their subjects do — a god has a status and
 * domains, a region has keyed locations — but they are all wiki entries with a
 * title, a summary, a body, a pillar and tags.
 */
export const WIKI_COLLECTIONS = [
  { collection: "wiki-articles" as const, label: "Article" },
  { collection: "wiki-gods" as const, label: "God" },
  { collection: "wiki-factions" as const, label: "Faction" },
  { collection: "wiki-regions" as const, label: "Region" },
];

export type WikiCollectionSlug = (typeof WIKI_COLLECTIONS)[number]["collection"];

export type WikiEntryRef = {
  id: number;
  collection: WikiCollectionSlug;
  label: string;
  title: string;
  summary?: string | null;
  slug: string;
};

/** Pillars, in the order declared in lib/wiki.ts rather than alphabetically. */
export const findPillars = async (): Promise<Category[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "categories",
    where: { kind: { equals: "wiki" } },
    limit: 50,
    depth: 0,
  });
  return docs;
};

export const findPillarBySlug = async (slug: string): Promise<Category | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "categories",
    where: { kind: { equals: "wiki" }, slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });
  return docs[0] ?? null;
};

/** Every published entry in a pillar, across all four collections. */
export const findEntriesInPillar = async (pillarId: number): Promise<WikiEntryRef[]> => {
  const payload = await getPayloadClient();

  const perCollection = await Promise.all(
    WIKI_COLLECTIONS.map(async (source) => {
      const { docs } = await payload.find({
        collection: source.collection,
        where: { ...publishedOnly, category: { equals: pillarId } },
        sort: "title",
        limit: 200,
        depth: 0,
      });
      return docs.map((doc) => ({
        id: doc.id,
        collection: source.collection,
        label: source.label,
        title: String(doc.title),
        summary: (doc as { summary?: string | null }).summary ?? null,
        slug: String(doc.slug),
      }));
    }),
  );

  return perCollection.flat().sort((a, b) => a.title.localeCompare(b.title));
};

export const countEntriesByPillar = async (): Promise<Record<number, number>> => {
  const payload = await getPayloadClient();
  const pillars = await findPillars();

  const counts = await Promise.all(
    pillars.map(async (pillar) => {
      const perCollection = await Promise.all(
        WIKI_COLLECTIONS.map(async (source) => {
          const { totalDocs } = await payload.count({
            collection: source.collection,
            where: { ...publishedOnly, category: { equals: pillar.id } },
          });
          return totalDocs;
        }),
      );
      return [pillar.id, perCollection.reduce((a, b) => a + b, 0)] as const;
    }),
  );

  return Object.fromEntries(counts);
};

/**
 * Finds one entry by slug, whichever collection holds it.
 *
 * Slugs are unique within a collection but not across them, and the flat
 * namespace assumes they are unique globally. The first match wins in the
 * declared order; a duplicate would make one entry unreachable, so the admin
 * should treat a clash as an error rather than relying on this order.
 */
export const findWikiEntry = async (slug: string) => {
  const payload = await getPayloadClient();

  for (const source of WIKI_COLLECTIONS) {
    const { docs } = await payload.find({
      collection: source.collection,
      where: { ...publishedOnly, slug: { equals: slug } },
      limit: 1,
      depth: 2,
    });
    if (docs[0]) return { doc: docs[0], collection: source.collection, label: source.label };
  }

  return null;
};

/** Every published entry, for generateStaticParams and the sitemap. */
export const findAllWikiEntries = async (): Promise<WikiEntryRef[]> => {
  const payload = await getPayloadClient();

  const perCollection = await Promise.all(
    WIKI_COLLECTIONS.map(async (source) => {
      const { docs } = await payload.find({
        collection: source.collection,
        where: publishedOnly,
        limit: 1000,
        depth: 0,
      });
      return docs.map((doc) => ({
        id: doc.id,
        collection: source.collection,
        label: source.label,
        title: String(doc.title),
        summary: (doc as { summary?: string | null }).summary ?? null,
        slug: String(doc.slug),
      }));
    }),
  );

  return perCollection.flat();
};
