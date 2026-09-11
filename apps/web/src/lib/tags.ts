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
 * │ Still to add:                                                           │
 * │   - wiki-articles, wiki-regions, wiki-factions, wiki-gods -> /wiki/<slug>│
 * │   - resources -> /resources/<section>/<slug>                            │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
const TAGGED_SOURCES = [
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
        // Collections name their short text differently; neither field is
        // guaranteed, so fall through rather than assuming a shape.
        summary:
          ("excerpt" in doc ? doc.excerpt : undefined) ??
          ("blurb" in doc ? doc.blurb : undefined) ??
          null,
        href: source.href(String(doc.slug)),
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
