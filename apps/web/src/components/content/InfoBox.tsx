import type { ReactNode } from "react";
import styles from "./InfoBox.module.css";

export type InfoBoxRow = { label: string; value: ReactNode };

/** Wiki summary box: art, then label/value rows. The right rail of an article. */
export function InfoBox({
  title,
  image,
  rows = [],
  footer,
  className,
}: {
  title?: string;
  image?: ReactNode;
  rows?: InfoBoxRow[];
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <aside className={[styles.box, className].filter(Boolean).join(" ")}>
      {image && <div className={styles.well}>{image}</div>}
      <div className={styles.body}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {rows.length > 0 && (
          <dl className={styles.rows}>
            {rows.map((r) => (
              <div key={r.label} className={styles.row}>
                <dt className={styles.label}>{r.label}</dt>
                <dd className={styles.value}>{r.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {footer}
      </div>
    </aside>
  );
}
