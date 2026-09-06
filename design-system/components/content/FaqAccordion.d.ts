import * as React from "react";

/**
 * Self-managing FAQ list. Same chrome as Accordion, but rows open
 * independently so a reader can compare two answers, and no parent has to
 * hold state. Use Accordion directly when you need controlled single-open.
 *
 * @startingPoint section="Content" subtitle="Multi-open FAQ list" viewport="700x320"
 */
export interface FaqAccordionItem { title: string; body: React.ReactNode }
export interface FaqAccordionProps {
  items: FaqAccordionItem[];
  /** false collapses to single-open behaviour. Defaults to true. */
  allowMultiple?: boolean;
  /** Indices open on mount, e.g. [0]. */
  defaultOpen?: number[];
  style?: React.CSSProperties;
}
export function FaqAccordion(props: FaqAccordionProps): JSX.Element;
