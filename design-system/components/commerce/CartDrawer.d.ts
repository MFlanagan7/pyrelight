import * as React from "react";

/**
 * Cart panel. Slides from the right over a blurred scrim; ESC and scrim click close it.
 *
 * @startingPoint section="Commerce" subtitle="Cart drawer with line items" viewport="700x460"
 */
export interface CartDrawerProps {
  open?: boolean;
  /** kept for consumers that want item-count logic; rendering is via children */
  items?: unknown[];
  /** formatted total, e.g. "$36" */
  subtotal?: string;
  /** fine print, e.g. "PDFs are delivered immediately. Print ships in 3–5 days." */
  note?: string;
  onClose?: () => void;
  /** CartLineItem children */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function CartDrawer(props: CartDrawerProps): JSX.Element | null;

/** A single cart row: cover thumb, title, format meta, price, quantity. */
export interface CartLineItemProps {
  cover?: React.ReactNode;
  title: string;
  meta?: string;
  price: string;
  qty?: number;
  onRemove?: () => void;
  style?: React.CSSProperties;
}
export function CartLineItem(props: CartLineItemProps): JSX.Element;
