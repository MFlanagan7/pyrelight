import * as React from "react";

/** Small-caps chip. Interactive when `href` is set; otherwise a static tag. */
export interface PillProps extends React.HTMLAttributes<HTMLElement> {
  tone?: "neutral" | "outline" | "gold";
  href?: string;
  children?: React.ReactNode;
}
export function Pill(props: PillProps): JSX.Element;
