import * as React from "react";

/**
 * Art-topped card used across lore teasers, wiki categories and factions.
 *
 * @startingPoint section="Site" subtitle="Art card with small-caps title" viewport="700x330"
 */
export interface ContentCardProps {
  /** an <img> or image slot; omit for a text-only card */
  image?: React.ReactNode;
  title: string;
  body?: string;
  /** small-caps footer tag, e.g. "Cosmology" */
  tag?: string;
  /** right-aligned count beside the title, e.g. "11 articles" */
  count?: string;
  href?: string;
  /** wrap in a 1px gradient hairline instead of a flat border — for feature rows */
  gradientBorder?: boolean;
  style?: React.CSSProperties;
}
export function ContentCard(props: ContentCardProps): JSX.Element;
