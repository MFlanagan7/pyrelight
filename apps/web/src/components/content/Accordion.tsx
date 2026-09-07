"use client";

import { useId, useState, type ReactNode } from "react";
import styles from "./Accordion.module.css";

export type AccordionItem = { title: string; body: ReactNode };

/**
 * Exclusive accordion — one row open at a time. Use FaqAccordion where rows
 * should open independently.
 *
 * Works uncontrolled by default. The design system's version was
 * controlled-only, which forced every caller to be a client component just to
 * hold an index; passing `openIndex` still opts into that when a parent needs
 * to drive it.
 *
 * Panels stay mounted and toggle the hidden attribute so in-page search finds
 * closed content and aria-controls points at a node that exists. SpoilerBlock
 * deliberately does the opposite.
 */
export function Accordion({
  items,
  openIndex,
  onToggle,
  className,
}: {
  items: AccordionItem[];
  /** Provide with onToggle to control externally. */
  openIndex?: number;
  onToggle?: (index: number) => void;
  className?: string;
}) {
  const [selfOpen, setSelfOpen] = useState(-1);
  const baseId = useId();

  const controlled = openIndex !== undefined;
  const current = controlled ? openIndex : selfOpen;

  if (items.length === 0) return null;

  const toggle = (i: number) => {
    const next = current === i ? -1 : i;
    if (!controlled) setSelfOpen(next);
    onToggle?.(next);
  };

  return (
    <div className={[styles.list, className].filter(Boolean).join(" ")}>
      {items.map((item, i) => {
        const open = i === current;
        const panelId = `${baseId}-panel-${i}`;
        const triggerId = `${baseId}-trigger-${i}`;

        return (
          <div key={item.title} className={styles.item}>
            <button
              type="button"
              id={triggerId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => toggle(i)}
              className={styles.trigger}
            >
              <span className={styles.label}>{item.title}</span>
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className={styles.chevron}>
                <path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!open}
              className={styles.panel}
            >
              {item.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}
