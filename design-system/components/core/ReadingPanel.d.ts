import * as React from "react";

/**
 * Article body for field notes and wiki entries.
 *
 * @startingPoint section="Core" subtitle="Dark long-form reading surface" viewport="700x380"
 */
export interface ReadingPanelProps {
  /** "Design · 6 min read" */
  meta?: string;
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}
export function ReadingPanel(props: ReadingPanelProps): JSX.Element;
