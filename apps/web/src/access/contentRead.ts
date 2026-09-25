import type { Access } from "payload";

/**
 * Who may read content through Payload's HTTP API.
 *
 * This governs REST and GraphQL only. It does NOT govern the website, because
 * Server Components use Payload's Local API, which runs with
 * `overrideAccess: true` by default — verified in Payload's own source. Our
 * pages filter by status explicitly instead (lib/payload.ts). So this file can
 * be as strict as we like without the site noticing.
 */

/** Published entries to anyone; drafts to signed-in editors. */
export const publishedOrEditor: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: "published" } };
};

/** Nothing to anyone not signed in. */
export const editorOnly: Access = ({ req: { user } }) => Boolean(user);

/**
 * THE POLICY. Every content collection imports this, so it changes in one line.
 *
 * Currently `editorOnly`, which closes the HTTP API to the public entirely.
 *
 * That sounds drastic and costs nothing, because nothing uses it. The site is
 * rendered server-side through the Local API; no client code fetches /api at
 * all. Payload ships REST and GraphQL because Payload ships them, and they have
 * been sitting open serving a convenience we do not need.
 *
 * The reason to close rather than merely limit: published content is already
 * public in the site's own HTML, so an API adds no secrecy — what it adds is a
 * far more convenient way to enumerate and scrape the whole catalogue, and a
 * serverless invocation billed to us for every call. Rate limiting narrows that;
 * closing removes it.
 *
 * SWITCH TO `publishedOrEditor` when something legitimately needs to read
 * content over HTTP — a mobile app, a partner integration, a static build
 * elsewhere. That is a one-word change here and affects nothing else.
 *
 * Either value satisfies scripts/check-access.ts, which only insists that
 * drafts never reach an anonymous caller.
 */
export const contentRead: Access = editorOnly;
