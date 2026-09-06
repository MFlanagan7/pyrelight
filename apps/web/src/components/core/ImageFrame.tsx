import type { CSSProperties, ReactNode } from "react";
import styles from "./ImageFrame.module.css";

type Props = {
  /** CSS aspect-ratio value, e.g. "16 / 9" or "3 / 4". */
  ratio?: string;
  scrim?: "none" | "card" | "caption" | "full";
  /** CSS length or token for the corner radius. */
  radius?: string;
  float?: boolean;
  children?: ReactNode;
  className?: string;
};

/**
 * The only correct way to place art on a Starfall page: a 1px gradient border
 * wrapping a dark well, with an optional scrim so text can sit on top.
 *
 * `ratio` and `radius` are per-instance values rather than a fixed set, so they
 * pass through as custom properties the stylesheet reads.
 */
export function ImageFrame({
  ratio = "16 / 9",
  scrim = "none",
  radius,
  float = false,
  children,
  className,
}: Props) {
  const vars = {
    "--ratio": ratio,
    ...(radius ? { "--radius": radius } : {}),
  } as CSSProperties;

  return (
    <div
      className={[styles.frame, float ? styles.float : null, className]
        .filter(Boolean)
        .join(" ")}
      style={vars}
    >
      <div className={styles.well}>
        {children}
        {scrim !== "none" && (
          <div aria-hidden="true" className={`${styles.scrim} ${styles[scrim]}`} />
        )}
      </div>
    </div>
  );
}
