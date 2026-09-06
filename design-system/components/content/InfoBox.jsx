import React from "react";

/** Wiki summary box: art, then label/value rows. The right rail of an article. */
export function InfoBox({ title, image, rows = [], footer, style }) {
  return (
    <aside style={{
      display: "flex", flexDirection: "column",
      border: "1px solid var(--border-card)", borderRadius: "var(--sf-radius-card)",
      overflow: "hidden", background: "var(--surface-card)", ...style
    }}>
      {image && <div style={{ position: "relative", aspectRatio: "4 / 3", background: "var(--surface-well)" }}>{image}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: ".9rem", padding: "1.15rem 1.25rem 1.35rem" }}>
        {title && <h3 style={{
          fontFamily: "var(--sf-font-display)", fontSize: "var(--sf-text-lg)",
          lineHeight: 1.2, color: "var(--text-heading)"
        }}>{title}</h3>}
        <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: ".55rem" }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: ".75rem", justifyContent: "space-between", alignItems: "baseline", paddingBottom: ".55rem", borderBottom: i === rows.length - 1 ? "0" : "1px solid var(--border-section)" }}>
              <dt style={{
                flex: "none", fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)",
                letterSpacing: "var(--sf-track-caps)", textTransform: "uppercase", color: "var(--text-meta)"
              }}>{r.label}</dt>
              <dd style={{ margin: 0, minWidth: 0, textAlign: "right", fontSize: ".95rem", lineHeight: 1.45, color: "var(--text-body)" }}>{r.value}</dd>
            </div>
          ))}
        </dl>
        {footer}
      </div>
    </aside>
  );
}
