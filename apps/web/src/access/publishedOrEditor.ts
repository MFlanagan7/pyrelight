import type { Access } from "payload";

/**
 * Anyone may read PUBLISHED entries. Only a signed-in editor may read drafts.
 *
 * `read: () => true` is not that, and the difference is not theoretical. Payload
 * serves every collection over REST and GraphQL as well as to our own pages, and
 * unconditional read access applies to all three. Our routes filter drafts out
 * carefully; the API had no such filter, so an anonymous request to
 * `/api/wiki-articles?draft=true` returned unpublished work in full — title,
 * body, everything.
 *
 * That is worth stating plainly because the mistake is easy and invisible. The
 * site looked correct from every page, and nothing about writing a draft
 * suggested it was already readable by anyone who guessed a query string.
 *
 * Returning a WHERE clause rather than a boolean is how Payload expresses
 * "some of it": the constraint is merged into every query the caller makes, so
 * it cannot be bypassed by asking differently. A signed-in editor gets `true`
 * and sees everything, which is what the admin panel needs.
 *
 * Our own pages are unaffected. The Local API used by Server Components runs
 * with overrideAccess by default, and those queries already filter by status
 * explicitly — see lib/payload.ts. This closes the door that faces outward.
 */
export const publishedOrEditor: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: "published" } };
};
