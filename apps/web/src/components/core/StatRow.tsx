import styles from "./StatRow.module.css";

export type Stat = {
  /** A count, never a metric. "4 regions", not "98% satisfaction". */
  n: string;
  label: string;
};

type Props = {
  items?: Stat[];
  align?: "left" | "center";
  className?: string;
};

/** Cormorant numerals over small-caps labels. Four items reads best; never more than five. */
export function StatRow({ items = [], align = "left", className }: Props) {
  return (
    <div
      className={[styles.row, align === "center" ? styles.center : null, className]
        .filter(Boolean)
        .join(" ")}
    >
      {items.map((s) => (
        <div key={s.label} className={styles.item}>
          <span className={styles.value}>{s.n}</span>
          <span className={styles.label}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
