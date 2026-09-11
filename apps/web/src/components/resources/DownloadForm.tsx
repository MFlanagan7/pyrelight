"use client";

import { useActionState } from "react";
import { Button } from "@/components/core";
import { requestDownload, type DownloadState } from "@/actions/download";
import styles from "./DownloadForm.module.css";

const initial: DownloadState = { status: "idle", message: "" };

/**
 * Email-gated download.
 *
 * The newsletter tick is separate, optional and unticked by default. The file
 * arrives either way — subscription is never a condition of the download, which
 * is both the GDPR position on bundled consent and the reason a list built this
 * way is worth having.
 */
export function DownloadForm({
  resourceId,
  label = "Get the download",
}: {
  resourceId: number;
  label?: string;
}) {
  const [state, formAction, pending] = useActionState(requestDownload, initial);

  if (state.status === "ready" && state.url) {
    return (
      <div className={styles.ready}>
        <Button href={state.url} rel="noopener">
          {label}
        </Button>
        <p className={styles.note}>
          Link expires in ten minutes — reload the page for a fresh one.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className={styles.form}>
      <input type="hidden" name="resourceId" value={resourceId} />

      <div className={styles.row}>
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          aria-label="Email address"
          className={styles.input}
        />
        <Button type="submit" disabled={pending}>
          {pending ? "Preparing" : label}
        </Button>
      </div>

      <label className={styles.consent}>
        <input type="checkbox" name="subscribe" />
        <span>
          Also send me occasional news about Starfall. Optional — the download is
          yours either way, and you can unsubscribe at any time.
        </span>
      </label>

      <p
        className={[styles.note, state.status === "error" ? styles.error : null]
          .filter(Boolean)
          .join(" ")}
        role="status"
        aria-live="polite"
      >
        {state.message}
      </p>
    </form>
  );
}
