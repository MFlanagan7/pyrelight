import * as React from "react";

/**
 * Fact box beside a wiki article — region, house, god, race.
 *
 * @startingPoint section="Content" subtitle="Wiki fact box with art" viewport="700x420"
 */
export interface InfoRow { label: string; value: React.ReactNode }
export interface InfoBoxProps {
  title?: string;
  /** 4:3 art element */
  image?: React.ReactNode;
  rows: InfoRow[];
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}
export function InfoBox(props: InfoBoxProps): JSX.Element;
