import * as React from "react";

/**
 * The wiki's left rail. Pair with TableOfContents on the right for article pages.
 *
 * @startingPoint section="Navigation" subtitle="Grouped wiki rail with counts" viewport="700x420"
 */
export interface WikiSidebarLink { label: string; href: string; count?: number }
export interface WikiSidebarGroup { title: string; links: WikiSidebarLink[] }
export interface WikiSidebarProps {
  groups: WikiSidebarGroup[];
  /** href of the article being read */
  currentHref?: string;
  /** optional slot under the groups, e.g. a SearchField or "Recently updated" */
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}
export function WikiSidebar(props: WikiSidebarProps): JSX.Element;
