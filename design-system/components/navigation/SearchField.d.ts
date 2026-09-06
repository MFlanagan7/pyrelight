import * as React from "react";

/**
 * Search for the wiki (and, at `size="lg"`, the wiki landing page's primary control).
 *
 * @startingPoint section="Navigation" subtitle="Pill search with scope label" viewport="700x110"
 */
export interface SearchFieldProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  placeholder?: string;
  /** trailing scope hint, e.g. "Regions" or "412 articles" */
  scope?: string;
  size?: "md" | "lg";
  style?: React.CSSProperties;
}
export function SearchField(props: SearchFieldProps): JSX.Element;
