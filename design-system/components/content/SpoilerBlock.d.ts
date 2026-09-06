import * as React from "react";

/**
 * GM-only spoiler reveal: collapsed by default, oxblood chrome, optional
 * teaser note shown while closed. Independent of Accordion — a spoiler is a
 * single gated passage inside an article, not a row in a list.
 */
export interface SpoilerBlockProps {
  /** Caps label on the trigger. Defaults to "GM only". */
  title?: string;
  /** Italic teaser shown only while closed, e.g. "Spoilers for act two." */
  note?: string;
  /** The hidden passage. */
  children?: React.ReactNode;
  /** Controlled open state. Omit to let the block manage itself. */
  open?: boolean;
  onToggle?: (open: boolean) => void;
  /** Initial state when uncontrolled. Defaults to false. */
  defaultOpen?: boolean;
  style?: React.CSSProperties;
}
export function SpoilerBlock(props: SpoilerBlockProps): JSX.Element;
