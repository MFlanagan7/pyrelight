"use client";

import { useState, type ReactNode } from "react";
import styles from "./SpoilerBlock.module.css";

/**
 * GM-only reveal. Closed by default.
 *
 * The hidden content is UNMOUNTED rather than hidden with CSS or the hidden
 * attribute — deliberately the opposite of FaqAccordion, which keeps panels
 * mounted so in-page search can find closed answers. Here that would be the
 * bug: a player pressing Ctrl+F would hit the very text the block exists to
 * conceal. Being absent from the DOM is the point.
 *
 * It is concealment, not security. The content still travels in the page
 * payload, so anything genuinely secret does not belong on a public page.
 */
export function SpoilerBlock({
  title = "GM only",
  note,
  children,
  defaultOpen = false,
  className,
}: {
  title?: string;
  /** Shown while closed — says what is behind it without giving it away. */
  note?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={[styles.block, className].filter(Boolean).join(" ")}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={styles.trigger}
      >
        <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" className={styles.chevron}>
          <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className={styles.title}>{title}</span>
        <span className={styles.action}>{open ? "Hide" : "Reveal"}</span>
      </button>

      {!open && note && <p className={styles.note}>{note}</p>}
      {open && <div className={styles.panel}>{children}</div>}
    </section>
  );
}
