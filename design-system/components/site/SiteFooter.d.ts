import * as React from "react";
import { SocialLink } from "./SocialLinks";

/**
 * Site footer. On Starfall the brand cell also credits "a Pyrelight Press project".
 *
 * @startingPoint section="Site" subtitle="Sitemap, socials, legal, copyright" viewport="700x400"
 */
export interface FooterLink { label: string; href: string }
export interface FooterColumn { title: string; links: FooterLink[] }
export interface SiteFooterProps {
  /** first grid cell: wordmark + studio credit */
  brand?: React.ReactNode;
  columns?: FooterColumn[];
  socials?: SocialLink[];
  /** Privacy, Terms, Cookies, Content licence, Accessibility */
  legal?: FooterLink[];
  copyright?: string;
  style?: React.CSSProperties;
}
export function SiteFooter(props: SiteFooterProps): JSX.Element;
