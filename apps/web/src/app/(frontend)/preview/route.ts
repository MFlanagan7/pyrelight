import { draftMode } from "next/headers";
import { headers as requestHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";

/**
 * Turns on draft mode, so an editor can see unpublished work at its real URL.
 *
 * Every public query filters on `_status: published`, which is what keeps drafts
 * off the site and must not change. The consequence is that live preview could
 * only ever show something already published — useless for the one job preview
 * exists to do. This route is the exception that makes the rule survivable.
 *
 * SECURITY: authorised by the editor's own Payload session, not a shared secret.
 *
 * Next's guide uses a secret token in the URL because a headless CMS is normally
 * a separate service with no access to your session. Ours is not — Payload runs
 * inside this app, so `payload.auth` can simply ask whether the person clicking
 * Preview is a logged-in editor. That is strictly better: there is no token to
 * leak through a URL, a log, a referrer header or a screenshot, access is tied
 * to a real account, and revoking it means disabling that account rather than
 * rotating a secret and updating every collection.
 *
 * GET rather than POST, against the usual rule about GET being read-only,
 * because Payload opens this in a new tab and a tab open is a GET. The exit
 * route uses POST, as it should.
 */

/**
 * Only ever redirect somewhere on this site.
 *
 * Without this the route is an open redirect: `/preview?path=https://evil.test`
 * would send a logged-in editor off-site from a URL that looks like ours.
 * Protocol-relative `//evil.test` is the case people forget, since it has no
 * scheme but browsers treat it as absolute.
 */
const safePath = (path: string | null): string | null => {
  if (!path) return null;
  if (!path.startsWith("/")) return null;
  if (path.startsWith("//")) return null;
  return path;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = safePath(searchParams.get("path"));

  if (!path) {
    return new Response("A valid, site-relative ?path= is required.", { status: 400 });
  }

  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: await requestHeaders() });

  if (!user) {
    // Deliberately not a redirect to the login page: this is opened in an
    // iframe or a new tab from the admin, where a silent redirect would look
    // like the preview itself had failed.
    return new Response("Not authorised. Sign in to /admin first.", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(path);
}
