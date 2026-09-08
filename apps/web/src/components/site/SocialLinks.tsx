import { SOCIAL_PATHS } from "@/assets/social-paths";
import styles from "./SocialLinks.module.css";

export type SocialLink = {
  /** Key into SOCIAL_PATHS, e.g. "bluesky", "itch". */
  key: string;
  href: string;
  label: string;
};

/**
 * Round icon buttons.
 *
 * The glyphs are placeholders — see assets/social-paths.ts. An unknown key
 * renders nothing rather than an empty circle, so a typo is visibly absent
 * instead of quietly shipping a blank button.
 */
export function SocialLinks({ links, className }: { links: SocialLink[]; className?: string }) {
  if (links.length === 0) return null;

  return (
    <div className={[styles.row, className].filter(Boolean).join(" ")}>
      {links.map((s) => {
        const path = SOCIAL_PATHS[s.key];
        if (!path) return null;
        return (
          <a
            key={s.key}
            href={s.href}
            aria-label={s.label}
            title={s.label}
            className={styles.link}
            rel="me noopener"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d={path} fill="currentColor" fillRule="evenodd" />
            </svg>
          </a>
        );
      })}
    </div>
  );
}
