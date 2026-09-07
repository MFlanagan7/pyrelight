"use client";

import { useEffect, useState } from "react";
import styles from "./TableOfContents.module.css";

export type TocItem = { id: string; label: string; depth?: 1 | 2 };

/**
 * Sticky in-article contents. Gold left rule marks the heading in view.
 *
 * Tracks the active heading itself rather than taking it as a prop, since the
 * only source of that information is the scroll position. IntersectionObserver
 * rather than a scroll handler: the browser does the work off the main thread
 * and there is nothing to throttle.
 *
 * rootMargin pulls the detection line near the top of the viewport, so a
 * heading becomes active as it arrives rather than when it fully clears the
 * fold — which would leave the last heading on a short page never activating.
 */
export function TableOfContents({
  items,
  title = "On this page",
}: {
  items: TocItem[];
  title?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label={title} className={styles.nav}>
      <span className={styles.title}>{title}</span>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={item.id === activeId ? "location" : undefined}
          className={[
            styles.link,
            item.depth === 2 ? styles.nested : null,
            item.id === activeId ? styles.active : null,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
