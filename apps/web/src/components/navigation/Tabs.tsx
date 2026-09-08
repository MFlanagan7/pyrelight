"use client";

import { useRef, type KeyboardEvent } from "react";
import styles from "./Tabs.module.css";

export type TabItem = { value: string; label: string; count?: number };

/**
 * Pill tab row for switching a panel's content.
 *
 * Implements the tablist keyboard contract, which the design system's original
 * declared but did not provide: arrow keys move between tabs, Home and End jump
 * to the ends, and only the selected tab is in the tab order (roving
 * tabindex) so Tab moves past the group rather than through every option.
 *
 * Announcing role="tab" without that behaviour is worse than using plain
 * buttons — a screen reader tells the user arrow keys work, and they do not.
 *
 * `panelId` wires aria-controls to the panel this row switches. Omit it only
 * when the tabs filter content that is not a single labelled region.
 */
export function Tabs({
  items,
  value,
  onChange,
  panelId,
  label = "Sections",
  className,
}: {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  panelId?: string;
  label?: string;
  className?: string;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = items.findIndex((t) => t.value === value);
    if (current === -1) return;

    const move = (next: number) => {
      event.preventDefault();
      const item = items[next];
      onChange(item.value);
      // Follow focus, as the tablist pattern expects.
      refs.current[next]?.focus();
    };

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        return move((current + 1) % items.length);
      case "ArrowLeft":
      case "ArrowUp":
        return move((current - 1 + items.length) % items.length);
      case "Home":
        return move(0);
      case "End":
        return move(items.length - 1);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={[styles.tablist, className].filter(Boolean).join(" ")}
    >
      {items.map((tab, i) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.value)}
            className={styles.tab}
          >
            {tab.label}
            {tab.count != null && <span className={styles.count}>{tab.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
