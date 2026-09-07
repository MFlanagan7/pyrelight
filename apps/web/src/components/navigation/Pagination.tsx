import Link from "next/link";
import styles from "./Pagination.module.css";

const WINDOW = 5;

type Props = {
  page: number;
  pages: number;
  /** Builds the href for a page number, e.g. (n) => n === 1 ? "/dispatches" : `/dispatches/page/${n}` */
  hrefFor: (page: number) => string;
};

/** Numbered pager, windowed to five numbers, gold for the current page. */
export function Pagination({ page, pages, hrefFor }: Props) {
  if (pages <= 1) return null;

  const from = Math.max(1, Math.min(page - 2, pages - (WINDOW - 1)));
  const numbers: number[] = [];
  for (let i = from; i < from + WINDOW && i <= pages; i++) numbers.push(i);

  const arrow = (target: number, disabled: boolean, label: string, glyph: string) =>
    disabled ? (
      <span key={label} className={`${styles.cell} ${styles.disabled}`} aria-hidden="true">
        {glyph}
      </span>
    ) : (
      <Link key={label} href={hrefFor(target)} className={styles.cell} aria-label={label}>
        {glyph}
      </Link>
    );

  return (
    <nav aria-label="Pagination" className={styles.nav}>
      {arrow(page - 1, page <= 1, "Previous page", "←")}

      {from > 1 && <span className={styles.ellipsis}>&hellip;</span>}

      {numbers.map((n) => (
        <Link
          key={n}
          href={hrefFor(n)}
          aria-label={`Page ${n}`}
          aria-current={n === page ? "page" : undefined}
          className={`${styles.cell} ${n === page ? styles.current : ""}`}
        >
          {n}
        </Link>
      ))}

      {from + WINDOW <= pages && <span className={styles.ellipsis}>&hellip;</span>}

      {arrow(page + 1, page >= pages, "Next page", "→")}
    </nav>
  );
}
