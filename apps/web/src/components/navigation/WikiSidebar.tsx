import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./WikiSidebar.module.css";

export type WikiSidebarLink = { label: string; href: string; count?: number };
export type WikiSidebarGroup = { title: string; links: WikiSidebarLink[] };

/** Left-rail wiki navigation: grouped sections with counts and a current entry. */
export function WikiSidebar({
  groups,
  currentHref,
  footer,
}: {
  groups: WikiSidebarGroup[];
  /** href of the entry being read */
  currentHref?: string;
  /** Slot beneath the groups — a search field, or "recently updated". */
  footer?: ReactNode;
}) {
  return (
    <nav aria-label="Wiki sections" className={styles.nav}>
      {groups.map((group) => (
        <div key={group.title} className={styles.group}>
          <span className={styles.groupTitle}>{group.title}</span>
          {group.links.map((link) => {
            const active = link.href === currentHref;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`${styles.link} ${active ? styles.active : ""}`}
              >
                <span className={styles.label}>{link.label}</span>
                {link.count != null && <span className={styles.count}>{link.count}</span>}
              </Link>
            );
          })}
        </div>
      ))}
      {footer}
    </nav>
  );
}
