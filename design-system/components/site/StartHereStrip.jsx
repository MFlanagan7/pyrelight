import React from "react";

/**
 * Four-cell entry strip that overlaps the hero by -3.25rem. Sets the site's two audiences.
 * MUST be wrapped in a section with `position: relative; z-index: 1` — otherwise the hero's
 * absolutely-positioned scrim layers paint over the overlapping 52px and clip the cards' tops.
 */
export function StartHereStrip({ items = [], style }) {
  return (
    <div style={{
      position: "relative", zIndex: 1,
      maxWidth: "var(--sf-container)", margin: "-3.25rem auto 0",
      display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(13rem, 1fr))",
      gap: "1px", background: "var(--sf-line)", border: "1px solid var(--sf-line)",
      borderRadius: "var(--sf-radius-card)", overflow: "hidden",
      boxShadow: "var(--sf-shadow-strip)", ...style
    }}>
      {items.map((s, i) => (
        <a key={i} href={s.href} style={{
          display: "flex", flexDirection: "column", gap: ".4rem", padding: "1.35rem 1.4rem",
          background: "var(--surface-card)", textDecoration: "none", color: "inherit",
          transition: "background var(--sf-dur-hover) var(--sf-ease)"
        }}>
          <span style={{ fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-label)", textTransform: "uppercase", color: "var(--text-accent)" }}>{s.kicker}</span>
          <span style={{ fontFamily: "var(--sf-font-display)", fontSize: "1.35rem", lineHeight: 1.2, color: "var(--text-heading)" }}>{s.title}</span>
          <span style={{ fontSize: "var(--sf-text-sm)", lineHeight: 1.5, color: "var(--text-body-card)" }}>{s.body}</span>
        </a>
      ))}
    </div>
  );
}
