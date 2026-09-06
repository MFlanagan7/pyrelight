import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg";

type Props = {
  /** primary = gold gradient pill w/ glow; ghost = translucent outline; quiet = inline caps link */
  variant?: Variant;
  size?: Size;
  /** renders an <a> instead of a <button> */
  href?: string;
  children?: ReactNode;
  className?: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
>;

/**
 * Gold pill is the only primary action on a Starfall page — one per viewport.
 * Ghost sits beside it over imagery; quiet replaces a "see all" text link.
 */
export function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className,
  ...rest
}: Props) {
  // `quiet` is an inline link-button and takes no padding, so it skips the size class.
  const cx = [
    styles.button,
    styles[variant],
    variant === "quiet" ? null : styles[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={cx} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={cx} {...rest}>
      {children}
    </button>
  );
}
