import type { ReactNode } from "react";
import styles from "./ReadingPanel.module.css";

type Props = {
  meta?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
};

/**
 * Long-form on a dark ground. Replaces the parchment reading theme, which is now
 * reserved for print and PDF. Lifted surface, 72ch measure, 1.75 line-height.
 */
export function ReadingPanel({ meta, title, children, action, className }: Props) {
  return (
    <article className={[styles.panel, className].filter(Boolean).join(" ")}>
      {meta && <p className={styles.meta}>{meta}</p>}
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.body}>{children}</div>
      {action}
    </article>
  );
}
