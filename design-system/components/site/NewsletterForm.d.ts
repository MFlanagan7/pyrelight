import * as React from "react";

/** Pill input + gold Join button, with a reserved line for the confirmation note. */
export interface NewsletterFormProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  /** confirmation copy, e.g. "The map is on its way." */
  note?: string;
  align?: "center" | "start";
  style?: React.CSSProperties;
}
export function NewsletterForm(props: NewsletterFormProps): JSX.Element;
