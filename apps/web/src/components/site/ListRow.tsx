import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import styles from "./ListRow.module.css";

/** Wraps ListRows so the 1px gaps become hairline dividers. */
export function ListGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={[styles.group, className].filter(Boolean).join(" ")}>{children}</div>;
}

type Props = {
  thumb?: ReactNode;
  /** CSS colour for the round swatch, e.g. a faction's heraldic colour. */
  swatch?: string;
  title: ReactNode;
  body?: ReactNode;
  meta?: ReactNode;
  trailing?: ReactNode;
  href?: string;
  /** Cormorant title for a feature row; small caps for a dense index. */
  display?: boolean;
  className?: string;
};

/** Hairline-divided list row: adventures, pantheon entries, product ledgers. */
export function ListRow({
  thumb,
  swatch,
  title,
  body,
  meta,
  trailing,
  href,
  display = true,
  className,
}: Props) {
  const inner = (
    <>
      {thumb && <div className={styles.thumb}>{thumb}</div>}
      {/* Per-instance colour, so it passes through as a custom property rather
          than reintroducing an inline style rule. */}
      {swatch && (
        <span
          className={styles.swatch}
          style={{ "--swatch": swatch } as CSSProperties}
          aria-hidden="true"
        />
      )}
      <span className={styles.text}>
        <span className={display ? styles.titleDisplay : styles.titleCaps}>{title}</span>
        {body && <span className={styles.body}>{body}</span>}
      </span>
      {meta && <span className={styles.meta}>{meta}</span>}
      {trailing && <span className={styles.trailing}>{trailing}</span>}
    </>
  );

  const cx = [styles.row, className].filter(Boolean).join(" ");

  // Not every row links somewhere; a non-link row must not be focusable.
  return href ? (
    <Link href={href} className={cx}>
      {inner}
    </Link>
  ) : (
    <div className={cx}>{inner}</div>
  );
}
