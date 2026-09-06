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
