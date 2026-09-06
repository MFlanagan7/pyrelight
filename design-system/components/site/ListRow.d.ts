import * as React from "react";

/** One row inside a ListGroup. Provide a thumb (cover) or a swatch (god/faction tint), not both. */
export interface ListRowProps {
  thumb?: React.ReactNode;
  /** CSS background for the round tint chip */
  swatch?: string;
  title: string;
  body?: string;
  /** left-of-trailing meta, e.g. "Levels 1–4" */
  meta?: string;
  /** gold trailing value, e.g. a price or status */
  trailing?: string;
  href?: string;
  /** true = Cormorant title (adventures); false = small-caps title (pantheon) */
  display?: boolean;
  style?: React.CSSProperties;
}
export function ListRow(props: ListRowProps): JSX.Element;

/**
 * Hairline-divided container for ListRow children.
 *
 * @startingPoint section="Site" subtitle="Hairline list of adventures or entries" viewport="700x300"
 */
export interface ListGroupProps { children?: React.ReactNode; style?: React.CSSProperties }
export function ListGroup(props: ListGroupProps): JSX.Element;
