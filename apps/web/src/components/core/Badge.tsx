import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Badge.module.css";

type Props = {
  tone?: "premium" | "free";
  children?: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

/** Free / Premium marker pinned to the corner of a product cover. */
export function Badge({ tone = "premium", children, className, ...rest }: Props) {
  return (
    <span
      className={[styles.badge, styles[tone], className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </span>
  );
}
