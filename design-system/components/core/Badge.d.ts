import * as React from "react";

/** Commerce badge. `premium` is solid gold; `free` is a translucent green outline. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "premium" | "free";
  children?: React.ReactNode;
}
export function Badge(props: BadgeProps): JSX.Element;
