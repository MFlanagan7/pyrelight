import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export type Crumb = { label: string; href?: string };

/**
 * Wiki trail. Middot separators, small caps, current page in heading ink.
 *
 * Rendered as an ordered list inside the nav — a breadcrumb trail is a
 * sequence, and screen readers announce its length and position from the list.
 * The design system's original used bare spans.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className={styles.item}>
              {last || !item.href ? (
                <span aria-current={last ? "page" : undefined} className={styles.current}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              )}
              {!last && (
                <span aria-hidden="true" className={styles.separator}>
                  &middot;
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
