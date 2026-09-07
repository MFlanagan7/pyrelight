import type { ReactNode } from "react";
import styles from "./DataTable.module.css";

type Align = "left" | "center" | "right";

/** Rules and price tables. Hairline rows, small-caps head, no vertical rules. */
export function DataTable({
  caption,
  columns,
  rows,
  align = [],
  className,
}: {
  caption?: string;
  columns: string[];
  rows: ReactNode[][];
  /** Per-column alignment, positionally matched to `columns`. */
  align?: Align[];
  className?: string;
}) {
  return (
    /**
     * tabIndex makes the scroll container reachable by keyboard. A scrollable
     * region that cannot be focused is unusable without a mouse, and the role
     * plus label are what make that focus stop meaningful to a screen reader.
     */
    <div
      className={[styles.frame, className].filter(Boolean).join(" ")}
      tabIndex={0}
      role="region"
      aria-label={caption ?? "Table"}
    >
      <table className={styles.table}>
        {caption && <caption className={styles.caption}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={c} scope="col" className={styles.th} data-align={align[i] ?? "left"}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={styles.row}>
              {row.map((cell, j) => (
                <td key={j} className={styles.td} data-align={align[j] ?? "left"}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
