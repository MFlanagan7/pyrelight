import React from "react";

/** Sticky in-article TOC. Gold left rule marks the active heading. */
export function TableOfContents({ items = [], activeId, title = "On this page", style }) {
  return (
    <nav aria-label={title} style={{
      position: "sticky", top: "5.5rem", display: "flex", flexDirection: "column",
      gap: ".7rem", paddingLeft: "1rem", borderLeft: "1px solid var(--sf-line)", ...style
    }}>
      <span style={{
        fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)",
        letterSpacing: "var(--sf-track-label)", textTransform: "uppercase", color: "var(--text-meta)"
      }}>{title}</span>
      {items.map((it) => {
        const active = it.id === activeId;
        return (
          <a key={it.id} href={"#" + it.id} style={{
            marginLeft: it.depth === 2 ? ".85rem" : 0,
            paddingLeft: ".6rem",
            borderLeft: "2px solid " + (active ? "var(--sf-gold-400)" : "transparent"),
            fontSize: it.depth === 2 ? ".88rem" : ".95rem",
            lineHeight: 1.4, textDecoration: "none",
            color: active ? "var(--text-heading)" : "var(--text-body-card)",
            transition: "color var(--sf-dur-hover) var(--sf-ease), border-color var(--sf-dur-hover) var(--sf-ease)"
          }}>{it.label}</a>
        );
      })}
    </nav>
  );
}
