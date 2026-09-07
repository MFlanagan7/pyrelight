import Link from "next/link";
import styles from "./StartHereStrip.module.css";

export type StartHereItem = {
  kicker?: string | null;
  title: string;
  body?: string | null;
  href: string;
};

/** Entry strip overlapping the hero. Sets the site's two audiences. */
export function StartHereStrip({ items = [] }: { items?: StartHereItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className={styles.strip}>
      {items.map((s) => (
        <Link key={s.href} href={s.href} className={styles.cell}>
          {s.kicker && <span className={styles.kicker}>{s.kicker}</span>}
          <span className={styles.title}>{s.title}</span>
          {s.body && <span className={styles.body}>{s.body}</span>}
        </Link>
      ))}
    </div>
  );
}
