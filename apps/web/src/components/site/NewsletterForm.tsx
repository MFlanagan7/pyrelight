"use client";

import { useActionState } from "react";
import { Button } from "@/components/core";
import { subscribe, type SubscribeState } from "@/actions/newsletter";
import styles from "./NewsletterForm.module.css";

const initial: SubscribeState = { status: "idle", message: "" };

/**
 * Email capture. Stores the address unconfirmed — no mail is sent, because
 * double opt-in is not built yet.
 */
export function NewsletterForm({
  align = "center",
  source = "",
  confirmation,
}: {
  align?: "center" | "stretch";
  source?: string;
  /** In-world microcopy shown on success. */
  confirmation?: string | null;
}) {
  const [state, formAction, pending] = useActionState(subscribe, initial);

  const note =
    state.status === "ok" ? (confirmation || state.message) : state.message;

  return (
    <form
      action={formAction}
      className={[styles.form, align === "center" ? styles.center : null]
        .filter(Boolean)
        .join(" ")}
    >
      <input type="hidden" name="source" value={source} />
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
          {pending ? "Joining" : "Join"}
        </Button>
      </div>
      <p
        className={[styles.note, state.status === "error" ? styles.error : null]
          .filter(Boolean)
          .join(" ")}
        role="status"
        aria-live="polite"
      >
        {note}
      </p>
    </form>
  );
}
