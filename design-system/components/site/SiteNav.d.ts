import * as React from "react";

/** Fixed transparent-to-solid nav. Seven links maximum before it needs a menu. */
export interface NavLink { label: string; href: string }
export interface SiteNavProps {
  /** true once window.scrollY > 40 */
  scrolled?: boolean;
  brand?: React.ReactNode;
  links?: NavLink[];
  /** trailing pill, usually the newsletter Button */
  cta?: React.ReactNode;
  style?: React.CSSProperties;
}
export function SiteNav(props: SiteNavProps): JSX.Element;
