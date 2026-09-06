import * as React from "react";

/**
 * Single-open accordion. Uses the same hairline list chrome as ListGroup.
 *
 * @startingPoint section="Content" subtitle="Collapsible FAQ rows" viewport="700x300"
 */
export interface AccordionItem { title: string; body: React.ReactNode }
export interface AccordionProps {
  items: AccordionItem[];
  /** index of the open row; -1 for none */
  openIndex?: number;
  onToggle?: (index: number) => void;
  style?: React.CSSProperties;
}
export function Accordion(props: AccordionProps): JSX.Element;
