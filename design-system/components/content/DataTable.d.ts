import * as React from "react";

/**
 * Rules, random and price tables. Zebra striping in violet at 16%.
 *
 * @startingPoint section="Content" subtitle="Rules table with small-caps head" viewport="700x300"
 */
export interface DataTableProps {
  /** small-caps caption above the head, e.g. "d20 · What the tide left" */
  caption?: string;
  columns: string[];
  /** array of rows, each an array of cells */
  rows: React.ReactNode[][];
  /** per-column alignment, e.g. ["left","right"] */
  align?: ("left" | "right" | "center")[];
  style?: React.CSSProperties;
}
export function DataTable(props: DataTableProps): JSX.Element;
