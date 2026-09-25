"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";


/**
 * Refreshes the previewed page when Payload saves the document.
 *
 * The admin's preview pane is an iframe of the real site, and the page inside it
 * is a Server Component reading from the database. Nothing about editing a form
 * in the parent window would otherwise reach it: no state is shared, and the
 * server has already rendered. So the admin posts a `payload-document-event`
 * message on every save, this listens, and `router.refresh()` re-runs the server
 * render with the new draft. With autosave, that is a save shortly after typing
 * stops, which is what makes the pane feel live.
 *
 * ORIGIN IS READ FROM THE BROWSER, not from NEXT_PUBLIC_SITE_URL.
 *
 * The library drops any message whose `event.origin` does not equal `serverURL`,
 * so the two must be the same string exactly. A configured site URL is not: on
 * Vercel the same deployment answers on a branch alias AND a per-deployment
 * hostname, and opening the admin through the deployment URL made every message
 * arrive from an origin that did not match the configured one. Autosave worked,
 * the page just never refreshed — which is precisely what happened on staging
 * while working locally, where the two happen to agree.
 *
 * This is not a weakening. `window.location.origin` here is the IFRAME's own
 * origin, not the parent's, so the comparison still says "only accept messages
 * from a frame on this same site". A page framed by some other site would still
 * reject its messages; it simply also works on every hostname this app is
 * legitimately served from.
 *
 * Read during render rather than in an effect. Both branches produce no DOM —
 * this component and the one it wraps each render null — so the server pass and
 * the first client pass cannot disagree about anything React has to reconcile.
 */
export function RefreshOnSave() {
  const router = useRouter();

  if (typeof window === "undefined") return null;

  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={window.location.origin}
    />
  );
}
