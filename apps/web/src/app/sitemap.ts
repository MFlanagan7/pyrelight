import type { MetadataRoute } from "next";
import { countDispatchPages, dispatchPageHref } from "@/lib/dispatches";
import { findProducts } from "@/lib/products";
import { findAllTags } from "@/lib/tags";
import { getPayloadClient, publishedOnly } from "@/lib/payload";
import { siteUrl } from "@/lib/site";

/**
 * XML sitemap.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ MAINTENANCE — READ BEFORE ADDING A COLLECTION                           │
 * │                                                                         │
 * │ Pages, Dispatches and Products appear here automatically once their     │
 * │ query below exists; new entries in them need no change.                 │
 * │                                                                         │
 * │ A new COLLECTION does not. This function names each one explicitly, so  │
 * │ anything not listed below is invisible to search engines with no error  │
 * │ to warn you. Add a query and a mapping here when you add:               │
 * │                                                                         │
 * │   - Wiki entries    -> /wiki/<slug>   (all four wiki collections share  │
 * │                        the flat namespace; see lib/wiki.ts)             │
 * │   - Resources       -> /resources/<section>/<slug>                      │
 * │                                                                         │
 * │ Also add any new static route (a /wiki or /resources index, say) to the │
 * │ returned array — static routes are not discovered either.               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * Built from published content only. A sitemap that lists an unpublished URL
 * points crawlers at a 404, which is worse than omitting it.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient();

  const [pages, dispatches, legal, dispatchPageCount, products, tags] = await Promise.all([
    payload.find({
      collection: "pages",
      where: publishedOnly,
      limit: 500,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: "dispatches",
      where: publishedOnly,
      limit: 1000,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: "legal-documents",
      where: publishedOnly,
      limit: 10,
      depth: 0,
      select: { slug: true, updatedAt: true },
    }),
    countDispatchPages(),
    findProducts(),
    findAllTags(),
  ]);

  const entry = (
    path: string,
    updatedAt?: string | null,
    priority = 0.5,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  ) => ({
    url: new URL(path, siteUrl()).toString(),
    lastModified: updatedAt ? new Date(updatedAt) : undefined,
    changeFrequency,
    priority,
  });

  return [
    // Pages: "home" is the site root, everything else is its slug.
    ...pages.docs.map((p) =>
      p.slug === "home"
        ? entry("/", p.updatedAt, 1, "weekly")
        : entry(`/${p.slug}`, p.updatedAt, 0.8),
    ),

    // Static routes — these must be listed by hand.
    entry("/dispatches", undefined, 0.7, "weekly"),
    entry("/products", undefined, 0.9, "weekly"),
    entry("/tags", undefined, 0.4, "weekly"),
    ...tags.map((t) => entry(`/tags/${t.slug}`, t.updatedAt, 0.3)),
    ...products.docs.map((p) => entry(`/products/${p.slug}`, p.updatedAt, 0.8)),

    // Paginated index pages, 2..N. Page 1 is /dispatches above, so it is not
    // repeated here — two URLs for one page is duplicate content.
    ...Array.from({ length: Math.max(0, dispatchPageCount - 1) }, (_, i) =>
      entry(dispatchPageHref(i + 2), undefined, 0.4, "weekly"),
    ),

    ...dispatches.docs.map((d) => entry(`/dispatches/${d.slug}`, d.updatedAt, 0.6)),
    ...legal.docs.map((l) => entry(`/${l.slug}`, l.updatedAt, 0.3, "yearly")),
  ];
}
