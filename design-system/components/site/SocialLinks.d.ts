/** Icon row for the footer. Hover fills gold with navy glyphs. */
export interface SocialLink {
  /** key into assets/social-paths.js */
  key: "instagram" | "facebook" | "reddit" | "discord" | "youtube" | "tiktok" | "bluesky" | "itch" | "drivethru" | "patreon" | "kofi";
  label: string;
  href: string;
}
export interface SocialLinksProps { links: SocialLink[]; style?: React.CSSProperties }
export function SocialLinks(props: SocialLinksProps): JSX.Element;
