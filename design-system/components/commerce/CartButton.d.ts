import * as React from "react";

/**
 * Cart entry point in the nav, beside the newsletter CTA.
 *
 * @startingPoint section="Commerce" subtitle="Cart pill with count bubble" viewport="700x90"
 */
export interface CartButtonProps {
  count?: number;
  onClick?: React.MouseEventHandler;
  href?: string;
  label?: string;
  style?: React.CSSProperties;
}
export function CartButton(props: CartButtonProps): JSX.Element;
