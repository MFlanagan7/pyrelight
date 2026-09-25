import configPromise from "@payload-config";
import { getPayload } from "payload";

/**
 * Payload's Local API — queries the database in-process, with no HTTP hop.
 *
 * Use this in Server Components rather than fetching /api/*: it skips
 * serialisation, respects access control, and avoids a network round trip to
 * our own server.
 */
export const getPayloadClient = async () => getPayload({ config: configPromise });

/** Published entries only. Drafts must never leak onto the public site. */
export const publishedOnly = { _status: { equals: "published" } } as const;

/**
 * How a detail route should query, given whether the reader is previewing.
 *
 * Returned as one object rather than two separate flags because the two parts
 * must agree and it is easy to set one and forget the other. `draft: true` tells
 * Payload to return the newest version of a document; leaving the `_status`
 * filter in place would then discard exactly the drafts it just fetched, and the
 * page would 404 while looking correctly configured.
 *
 * Reading `isEnabled` does not force dynamic rendering — Next allows it inside a
 * caching scope specifically so that published pages stay static and only a
 * request carrying the draft cookie bypasses the cache.
 */
export const previewQuery = async () => {
  const { draftMode } = await import("next/headers");
  const { isEnabled } = await draftMode();

  return {
    draft: isEnabled,
    /** Spread into `where`. Empty while previewing, so drafts are visible. */
    status: isEnabled ? {} : publishedOnly,
    isPreview: isEnabled,
  };
};

/** Fetch a legal document by its fixed slug. Returns null if not yet authored. */
export const getLegalDocument = async (slug: string) => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "legal-documents",
    where: { ...publishedOnly, slug: { equals: slug } },
    limit: 1,
    depth: 0,
  });
  return docs[0] ?? null;
};

/**
 * Site chrome. Returns null if the global has never been saved, so callers can
 * fall back rather than render a site with no navigation.
 */
export const getSiteSettings = async () => {
  const payload = await getPayloadClient();
  try {
    return await payload.findGlobal({ slug: "site-settings", depth: 0 });
  } catch {
    return null;
  }
};
