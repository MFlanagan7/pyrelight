import type { Tag } from "@/payload-types";
import { getPayloadClient, publishedOnly } from "./payload";

/**
 * Tag pages aggregate across every area — that is the point of one shared
 * vocabulary. A tag page under /wiki or /resources would show a third of the
 * answer, which is why these live at /tags/<slug>.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ MAINTENANCE — ADD A SOURCE WHEN ITS ROUTES EXIST                        │
 * │                                                                         │
 * │ Only collections with a rendered detail route belong here. Listing a    │
 * │ collection before its routes are built produces results that link to    │
 * │ 404s, which is worse than omitting it.                                  │
 * │                                                                         │
 * │ Every content collection with a detail route is registered. Add the next │
 * │ one here when its routes land, not before.                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
const TAGGED_SOURCES: {
  collection:
    | "dispatches"
    | "products"
    | "resources"
    | "wiki-articles"
    | "wiki-gods"
    | "wiki-factions"
    | "wiki-regions";
  label: string;
  href: (slug: string, doc: { section?: string }) => string;
}[] = [
  {
    collection: "dispatches" as const,
    label: "Dispatch",
    href: (slug: string) => `/dispatches/${slug}`,
  },
  {
    collection: "products" as const,
    label: "Product",
    href: (slug: string) => `/products/${slug}`,
  },
  {
    collection: "resources" as const,
    label: "Resource",
    // Resources are addressed by section as well as slug.
    href: (slug: string, doc: { section?: string }) =>
      `/resources/${doc.section ?? ""}/${slug}`,
  },
  // The four wiki collections share one flat namespace at /wiki/<slug>.
  { collection: "wiki-articles" as const, label: "Article", href: (slug: string) => `/wiki/${slug}` },
  { collection: "wiki-gods" as const, label: "God", href: (slug: string) => `/wiki/${slug}` },
  { collection: "wiki-factions" as const, label: "Faction", href: (slug: string) => `/wiki/${slug}` },
  { collection: "wiki-regions" as const, label: "Region", href: (slug: string) => `/wiki/${slug}` },
];

export type TaggedResult = {
  id: string;
  label: string;
  title: string;
  summary?: string | null;
  href: string;
};

export const findTagBySlug = async (slug: string): Promise<Tag | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "tags",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });
  return docs[0] ?? null;
};

export const findAllTags = async (): Promise<Tag[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "tags",
    sort: "title",
    limit: 500,
    depth: 0,
  });
  return docs;
};

/** Everything published carrying this tag, across every registered source. */
export const findTaggedContent = async (tagId: number): Promise<TaggedResult[]> => {
  const payload = await getPayloadClient();

  const perSource = await Promise.all(
    TAGGED_SOURCES.map(async (source) => {
      const { docs } = await payload.find({
        collection: source.collection,
        where: { ...publishedOnly, tags: { in: [tagId] } },
        limit: 100,
        depth: 0,
      });

      return docs.map((doc) => ({
        id: `${source.collection}-${doc.id}`,
        label: source.label,
        title: String(doc.title),
        // Collections name their short text differently — dispatches use
        // excerpt, products blurb, resources summary — and none is guaranteed.
        summary:
          ("excerpt" in doc ? doc.excerpt : undefined) ??
          ("blurb" in doc ? doc.blurb : undefined) ??
          ("summary" in doc ? doc.summary : undefined) ??
          null,
        href: source.href(String(doc.slug), doc as { section?: string }),
      }));
    }),
  );

  return perSource.flat();
};

/** Tag counts for the index, so an empty tag can be shown as empty. */
export const countTagged = async (tagId: number): Promise<number> => {
  const payload = await getPayloadClient();
  const counts = await Promise.all(
    TAGGED_SOURCES.map(async (source) => {
      const { totalDocs } = await payload.count({
        collection: source.collection,
        where: { ...publishedOnly, tags: { in: [tagId] } },
      });
      return totalDocs;
    }),
  );
  return counts.reduce((a, b) => a + b, 0);
};
