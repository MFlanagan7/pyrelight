import React from "react";
import { SOCIAL_PATHS } from "../../assets/social-paths.js";

/**
 * Round icon buttons. Glyphs in assets/social-paths.js are SIMPLIFIED STAND-INS —
 * replace with each platform's official brand asset before launch.
 */
export function SocialLinks({ links = [], style }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", ...style }}>
      {links.map((s) => (
        <a key={s.key} href={s.href} aria-label={s.label} title={s.label} style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "2.35rem", height: "2.35rem", border: "1px solid var(--sf-line-strong)",
          borderRadius: "var(--sf-radius-pill)", color: "var(--sf-ink-300)",
          background: "var(--tint-violet)",
          transition: "color var(--sf-dur-hover) var(--sf-ease), background var(--sf-dur-hover) var(--sf-ease), border-color var(--sf-dur-hover) var(--sf-ease)"
        }}>
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d={SOCIAL_PATHS[s.key]} fill="currentColor" fillRule="evenodd" />
          </svg>
        </a>
      ))}
    </div>
  );
}
