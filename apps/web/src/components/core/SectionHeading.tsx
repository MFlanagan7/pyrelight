import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  /** Trailing "see all" link, usually a quiet Button. */
  action?: ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "gold" | "sea";
  className?: string;
};

/** Eyebrow label + display heading, optionally with a trailing "see all" link. */
export function SectionHeading({
  eyebrow,
  title,
  body,
  action,
  align = "left",
  tone = "ink",
  className,
}: Props) {
  const wrap = [
    styles.wrap,
    align === "center" ? styles.center : null,
    action ? styles.withAction : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={wrap}>
      <div className={styles.group}>
        {eyebrow && (
          <p
            className={[styles.eyebrow, tone === "sea" ? styles.eyebrowSea : null]
              .filter(Boolean)
              .join(" ")}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={[styles.title, tone === "gold" ? styles.titleGold : null]
            .filter(Boolean)
            .join(" ")}
        >
          {title}
        </h2>
        {body && <p className={styles.body}>{body}</p>}
      </div>
      {action}
    </div>
  );
}
