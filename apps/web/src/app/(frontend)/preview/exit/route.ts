import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Leaves draft mode.
 *
 * Needed because the cookie otherwise persists for the whole browser session,
 * and an editor who forgets is quietly reading unpublished content everywhere
 * while believing they are looking at the live site. That is the failure worth
 * preventing: not seeing a draft, but not knowing you are.
 *
 * POST, because it changes what later requests return. The banner submits a
 * form rather than linking, so a crawler or a prefetch cannot trip it.
 */
export async function POST(request: Request) {
  const draft = await draftMode();
  draft.disable();

  const referer = request.headers.get("referer");
  let target = "/";

  // Return to the page they were reading, now showing its published state.
  if (referer) {
    try {
      const url = new URL(referer);
      if (url.origin === new URL(request.url).origin) target = url.pathname;
    } catch {
      // Unparseable referer: fall back to the home page.
    }
  }

  redirect(target);
}
