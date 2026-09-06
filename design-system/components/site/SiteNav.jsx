import React from "react";

/**
 * Fixed nav, transparent over the hero, solidifying on scroll past 40px.
 * Wire `scrolled` from a passive scroll listener.
 */
export function SiteNav({ scrolled = false, brand, links = [], cta, style }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: "var(--sf-space-8)", padding: ".8rem 1.75rem",
      background: scrolled ? "rgba(13,12,27,.9)" : "rgba(13,12,27,0)",
      borderBottom: "1px solid " + (scrolled ? "var(--sf-line)" : "rgba(162,156,196,0)"),
      backdropFilter: "blur(16px) saturate(140%)",
      transition: "background var(--sf-dur-chrome) var(--sf-ease), border-color var(--sf-dur-chrome) var(--sf-ease)",
      ...style
    }}>
      {brand}
      <div style={{ display: "flex", alignItems: "center", gap: "1.35rem", fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-sm)", letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase" }}>
        {links.map((l, i) => <a key={i} href={l.href} style={{ color: "var(--sf-ink-300)", textDecoration: "none" }}>{l.label}</a>)}
        {cta}
      </div>
    </nav>
  );
}
