/**
 * In-article contents for long wiki entries. Two levels only.
 *
 * @startingPoint section="Navigation" subtitle="Sticky article contents" viewport="700x300"
 */
export interface TocItem { id: string; label: string; depth?: 1 | 2 }
export interface TableOfContentsProps {
  items: TocItem[];
  /** id of the heading currently in view */
  activeId?: string;
  title?: string;
  style?: React.CSSProperties;
}
export function TableOfContents(props: TableOfContentsProps): JSX.Element;
