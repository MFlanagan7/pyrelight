"use client";

import { useId, useState, type ReactNode } from "react";
import styles from "./FaqAccordion.module.css";

export type FaqItem = { question: string; answer: ReactNode };

/**
 * FAQ list. Rows open independently by default.
 *
 * Panels stay mounted and are toggled with the `hidden` attribute rather than
 * unmounted, so in-page search finds closed answers and assistive tech can
 * follow aria-controls to a node that exists.
 */
export function FaqAccordion({
  items = [],
  allowMultiple = true,
}: {
  items?: FaqItem[];
  allowMultiple?: boolean;
}) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const baseId = useId();

  if (items.length === 0) return null;

  const toggle = (i: number) =>
    setOpen((prev) => {
      if (!allowMultiple) return prev.has(i) ? new Set() : new Set([i]);
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className={styles.list}>
      {items.map((it, i) => {
        const isOpen = open.has(i);
        const panelId = `${baseId}-panel-${i}`;
        const triggerId = `${baseId}-trigger-${i}`;

        return (
          <div key={it.question} className={styles.item}>
            <button
              type="button"
              id={triggerId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
              className={styles.trigger}
            >
              <span className={styles.question}>{it.question}</span>
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                aria-hidden="true"
                className={styles.chevron}
              >
                <path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen} className={styles.panel}>
              {it.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
