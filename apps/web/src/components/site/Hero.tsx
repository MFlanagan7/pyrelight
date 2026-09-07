import type { ReactNode } from "react";
import styles from "./Hero.module.css";

type Props = {
  eyebrow?: string | null;
  title: string;
  lede?: string | null;
  /** Full-bleed art. Needs a quiet centre — nothing focal where the title lands. */
  art?: ReactNode;
  actions?: ReactNode;
};

/** Full-bleed opener. One per page, always first. */
export function Hero({ eyebrow, title, lede, art, actions }: Props) {
  return (
    <section className={styles.hero}>
      {art && <div className={styles.art}>{art}</div>}
      <div aria-hidden="true" className={styles.scrim} />
      <div className={styles.inner}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {lede && <p className={styles.lede}>{lede}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </section>
  );
}
