import * as React from "react";

/**
 * Every Starfall section starts with one of these. Eyebrow is always small-caps gold
 * (teal inside the sea band); the title is always Cormorant at --sf-text-2xl.
 *
 * @startingPoint section="Core" subtitle="Eyebrow + display heading + action" viewport="700x200"
 */
export interface SectionHeadingProps {
  /** small-caps kicker, e.g. "The wiki" */
  eyebrow?: string;
  title: string;
  /** optional one-line intro under the title */
  body?: string;
  /** trailing element, usually <Button variant="quiet"> */
  action?: React.ReactNode;
  align?: "left" | "center";
  /** gold title for commerce/newsletter bands; sea recolors the eyebrow */
  tone?: "ink" | "gold" | "sea";
  style?: React.CSSProperties;
}
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
