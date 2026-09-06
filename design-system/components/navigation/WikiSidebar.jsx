import React from "react";

/** Left-rail wiki navigation: grouped sections with counts and a current entry. */
export function WikiSidebar({ groups = [], currentHref, footer, style }) {
  return (
    <nav aria-label="Wiki sections" style={{
      display: "flex", flexDirection: "column", gap: "1.5rem",
      padding: "1.5rem 1.25rem", border: "1px solid var(--border-card)",
      borderRadius: "var(--sf-radius-card)", background: "var(--surface-card)", ...style
    }}>
      {groups.map((g, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: ".55rem" }}>
          <span style={{
            fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)",
            letterSpacing: "var(--sf-track-label)", textTransform: "uppercase", color: "var(--text-accent)"
          }}>{g.title}</span>
          {g.links.map((l, j) => {
            const active = l.href === currentHref;
            return (
              <a key={j} href={l.href} aria-current={active ? "page" : undefined} style={{
                display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: ".75rem",
                padding: ".3rem .5rem", marginLeft: "-.5rem",
                borderRadius: "var(--sf-radius-thumb)", textDecoration: "none",
                fontSize: ".95rem", lineHeight: 1.4,
                color: active ? "var(--text-heading)" : "var(--text-body-card)",
                background: active ? "var(--tint-violet-strong)" : "transparent",
                transition: "background var(--sf-dur-hover) var(--sf-ease), color var(--sf-dur-hover) var(--sf-ease)"
              }}>
                <span style={{ minWidth: 0 }}>{l.label}</span>
                {l.count != null && <span style={{
                  flex: "none", whiteSpace: "nowrap", fontFamily: "var(--sf-font-heading)",
                  fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-nav)",
                  textTransform: "uppercase", color: "var(--text-meta)"
                }}>{l.count}</span>}
              </a>
            );
          })}
        </div>
      ))}
      {footer}
    </nav>
  );
}
