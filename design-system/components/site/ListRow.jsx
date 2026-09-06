import React from "react";

/**
 * Hairline-divided list row: adventures, pantheon entries, product ledgers.
 * Compose several inside a ListGroup.
 */
export function ListRow({ thumb, swatch, title, body, meta, trailing, href = "#", display = true, style }) {
  return (
    <a href={href} style={{
      display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.25rem",
      padding: "1.2rem 1.4rem", background: "var(--surface-card)",
      textDecoration: "none", color: "inherit",
      transition: "background var(--sf-dur-hover) var(--sf-ease)", ...style
    }}>
      {thumb && <div style={{ position: "relative", flex: "none", width: "4.75rem", height: "6.35rem", borderRadius: "var(--sf-radius-chip)", overflow: "hidden", background: "var(--surface-well)", border: "1px solid rgba(235,203,110,.25)" }}>{thumb}</div>}
      {swatch && <span style={{ flex: "none", width: "2.5rem", height: "2.5rem", borderRadius: "var(--sf-radius-pill)", background: swatch, border: "1px solid rgba(239,236,246,.16)" }} />}
      <span style={{ display: "flex", flexDirection: "column", gap: ".25rem", flex: "1 1 14rem", minWidth: 0 }}>
        <span style={display
          ? { fontFamily: "var(--sf-font-display)", fontSize: "var(--sf-text-lg)", lineHeight: 1.2, color: "var(--text-heading)" }
          : { fontFamily: "var(--sf-font-heading)", fontSize: ".95rem", letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase", color: "var(--text-heading)" }}>{title}</span>
        {body && <span style={{ fontSize: ".92rem", lineHeight: 1.5, color: "var(--text-body-card)" }}>{body}</span>}
      </span>
      {meta && <span style={{ flex: "none", fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-caps)", textTransform: "uppercase", color: "var(--text-meta)" }}>{meta}</span>}
      {trailing && <span style={{ flex: "none", fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase", color: "var(--text-accent)" }}>{trailing}</span>}
    </a>
  );
}

/** Wraps ListRows so the 1px gaps become hairline dividers. */
export function ListGroup({ children, style }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: "1px",
      border: "1px solid var(--border-card)", borderRadius: "var(--sf-radius-card)",
      overflow: "hidden", background: "rgba(162,156,196,.14)", ...style
    }}>{children}</div>
  );
}
