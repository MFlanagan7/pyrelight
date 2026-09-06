import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import styles from "./Pill.module.css";

type Props = {
  href?: string;
  tone?: "neutral" | "outline" | "gold";
  children?: ReactNode;
  className?: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement> & HTMLAttributes<HTMLSpanElement>,
  "className"
>;

/** Small-caps chip: nav-adjacent tags, race names, feature chips, and eyebrow badges. */
export function Pill({ href, tone = "neutral", children, className, ...rest }: Props) {
  const cx = [styles.pill, styles[tone], className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a href={href} className={cx} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <span className={cx} {...rest}>
      {children}
    </span>
  );
}
