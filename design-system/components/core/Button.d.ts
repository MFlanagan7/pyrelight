import * as React from "react";

/**
 * Gold pill is the only primary action on a Starfall page — one per viewport.
 * Ghost sits beside it over imagery; quiet replaces a "see all" text link.
 *
 * @startingPoint section="Core" subtitle="Gold pill, ghost, quiet" viewport="700x160"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** primary = gold gradient pill w/ glow; ghost = translucent outline; quiet = inline caps link */
  variant?: "primary" | "ghost" | "quiet";
  size?: "sm" | "md" | "lg";
  /** renders an <a> instead of a <button> */
  href?: string;
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
