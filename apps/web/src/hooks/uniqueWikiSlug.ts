import type { CollectionBeforeValidateHook } from "payload";
import { WIKI_COLLECTION_SLUGS, type WikiCollectionSlug } from "../lib/wiki";

/**
 * Keeps wiki slugs unique across all four collections, not just within one.
 *
 * `unique: true` is enforced per collection, which is not what the flat
 * namespace needs. Entries live at /wiki/<slug> regardless of which collection
 * holds them, so a God and an Article may both claim "astralite" with every
 * constraint satisfied and nothing complaining.
 *
 * What happens then is the problem: findWikiEntry asks each collection in
 * declared order and returns the first hit, so the loser becomes unreachable at
 * its own URL — no error, no warning, just a page that quietly shows something
 * else. The editor who wrote it has no way to tell from the admin.
 *
 * Checked at validation rather than repaired later because the repair is the
 * expensive part: by the time two entries are published, one of the URLs has
 * been shared, and changing either breaks a link that already exists.
 *
 * Drafts count. An unpublished entry still owns its slug, or publishing it
 * would fail at the moment it matters most.
 */
export const uniqueWikiSlug =
  (self: WikiCollectionSlug): CollectionBeforeValidateHook =>
  async ({ data, req, originalDoc }) => {
    const slug = data?.slug;
    if (typeof slug !== "string" || !slug) return data;

    // Unchanged slug on an existing entry: it already owns this, so re-checking
    // would only find itself and refuse every subsequent save.
    if (originalDoc?.slug === slug) return data;

    for (const collection of WIKI_COLLECTION_SLUGS) {
      if (collection === self) continue;

      const { totalDocs } = await req.payload.count({
        collection,
        where: { slug: { equals: slug } },
        // Drafts included deliberately — see above.
        req,
      });

      if (totalDocs > 0) {
        throw new Error(
          `The slug "${slug}" is already used by an entry in ${collection}. ` +
            "Wiki entries share one flat namespace at /wiki/<slug>, so two cannot " +
            "hold the same slug even in different collections.",
        );
      }
    }

    return data;
  };
