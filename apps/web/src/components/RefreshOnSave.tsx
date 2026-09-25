"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

/**
 * Refreshes the previewed page when Payload saves the document.
 *
 * The admin's preview pane is an iframe of the real site, and the page inside it
 * is a Server Component reading from the database. Nothing about editing a form
 * in the parent window would otherwise reach it: no state is shared, and the
 * server has already rendered.
 *
 * So the admin posts a `payload-document-event` message on every save, this
 * listens for it, and `router.refresh()` re-runs the server render with the new
 * draft. Combined with autosave (collections/versions.ts) that is a save shortly
 * after typing stops, which is what makes the pane feel live.
 *
 * `serverURL` is not decoration: the package checks `event.origin` against it,
 * so a message from any other page on any other site is ignored. Passed from the
 * server rather than read from `window.location` so a page framed somewhere
 * unexpected cannot nominate its own origin as trusted.
 *
 * Rendered only in draft mode, so no visitor ever ships this listener.
 */
export function RefreshOnSave({ serverURL }: { serverURL: string }) {
  const router = useRouter();

  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />;
}
