import * as React from "react";

/**
 * Long-form aside. `lore` for in-world voice, `gm` for spoilers and advice, `rule` for
 * mechanics, `note` for editorial asides.
 *
 * @startingPoint section="Content" subtitle="Lore, GM, rule and note asides" viewport="700x300"
 */
export interface CalloutProps {
  tone?: "lore" | "gm" | "rule" | "note";
  /** small-caps kicker, e.g. "From the Ledger" or "GM only" */
  label?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function Callout(props: CalloutProps): JSX.Element;
