import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

/** Nothing-here state for search, filtered grids and an empty cart. */
export function EmptyState({
  title,
  body,
  action,
  className,
}: {
  title: string;
  body?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={[styles.empty, className].filter(Boolean).join(" ")}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className={styles.mark}>
        <path d="M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z" fill="currentColor" />
      </svg>
      <h3 className={styles.title}>{title}</h3>
      {body && <p className={styles.body}>{body}</p>}
      {action}
    </div>
  );
}
