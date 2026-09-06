import React from "react";

/**
 * Long-form on a dark ground. Replaces the parchment reading theme, which is now reserved
 * for print and PDF. Lifted surface, 72ch measure, 1.75 line-height.
 */
export function ReadingPanel({ meta, title, children, action, style }) {
  return (
    <article style={{
      maxWidth: "var(--sf-measure-reading)", display: "flex", flexDirection: "column",
      gap: "1.1rem", padding: "var(--sf-panel-pad)", border: "1px solid var(--sf-line-strong)",
      borderRadius: "var(--sf-radius-panel)", background: "var(--surface-raised)",
      boxShadow: "var(--sf-shadow-panel)", ...style
    }}>
      {meta && <p style={{ fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-caps)", textTransform: "uppercase", color: "var(--text-meta)" }}>{meta}</p>}
      <h3 style={{ fontFamily: "var(--sf-font-display)", fontSize: "var(--sf-text-xl)", lineHeight: "var(--sf-leading-heading)", color: "var(--text-heading)" }}>{title}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", fontSize: "1.05rem", lineHeight: "var(--sf-leading-reading)", color: "var(--text-over-image)" }}>{children}</div>
      {action}
    </article>
  );
}
