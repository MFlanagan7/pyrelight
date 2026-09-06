import * as React from "react";

/**
 * Shop card. Meta line carries format, price and storefront, separated by middots.
 *
 * @startingPoint section="Site" subtitle="2:3 cover, price line, Free/Premium badge" viewport="700x420"
 */
export interface ProductCardProps {
  /** an <img> or image slot at 2:3 */
  cover?: React.ReactNode;
  title: string;
  /** "Hardcover + PDF · $24 · itch" */
  meta: string;
  tone?: "premium" | "free";
  /** badge copy; omit for no badge */
  badge?: string;
  href?: string;
  style?: React.CSSProperties;
}
export function ProductCard(props: ProductCardProps): JSX.Element;
