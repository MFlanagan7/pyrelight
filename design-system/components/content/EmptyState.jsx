import React from "react";

/** Nothing-here state for search, filtered grids and an empty cart. */
export function EmptyState({ title, body, action, style }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: ".9rem",
      padding: "3.5rem 1.5rem", textAlign: "center",
      border: "1px dashed var(--sf-line-strong)", borderRadius: "var(--sf-radius-card)",
      background: "var(--tint-violet)", ...style
    }}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" style={{ color: "var(--sf-lilac-400)", opacity: .7 }}>
        <path d="M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z" fill="currentColor" />
      </svg>
      <h3 style={{ fontFamily: "var(--sf-font-display)", fontSize: "var(--sf-text-lg)", lineHeight: 1.2, color: "var(--text-heading)" }}>{title}</h3>
      {body && <p style={{ maxWidth: "44ch", fontSize: ".98rem", lineHeight: 1.6, color: "var(--text-body-card)" }}>{body}</p>}
      {action}
    </div>
  );
}
