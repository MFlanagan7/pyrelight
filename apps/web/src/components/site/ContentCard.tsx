import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./ContentCard.module.css";

type Props = {
  image?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  tag?: ReactNode;
  count?: ReactNode;
  href?: string;
  className?: string;
};

/**
 * The workhorse card: art well, small-caps title, body, optional meta.
 * Covers lore teasers, wiki categories, houses and factions.
 */
export function ContentCard({ image, title, body, tag, count, href, className }: Props) {
  const cx = [styles.card, className].filter(Boolean).join(" ");

  const inner = (
    <>
      {image && (
        <div className={styles.well}>
          {image}
          <div aria-hidden="true" className={styles.scrim} />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.title}>{title}</h3>
          {count && <span className={styles.count}>{count}</span>}
        </div>
        {body && <p className={styles.text}>{body}</p>}
        {tag && <span className={styles.tag}>{tag}</span>}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cx}>
        {inner}
      </Link>
    );
  }

  return <article className={cx}>{inner}</article>;
}
