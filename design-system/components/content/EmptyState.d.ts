import * as React from "react";

/**
 * Empty result set. Dashed border marks it as a state, not content.
 *
 * @startingPoint section="Content" subtitle="No-results state" viewport="700x260"
 */
export interface EmptyStateProps {
  title: string;
  body?: string;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}
export function EmptyState(props: EmptyStateProps): JSX.Element;
