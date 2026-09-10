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
