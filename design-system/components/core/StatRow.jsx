import React from "react";

/** Cormorant numerals over small-caps labels. Four items reads best; never more than five. */
export function StatRow({ items = [], align = "left", style }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: "2.25rem",
      justifyContent: align === "center" ? "center" : "flex-start", ...style
    }}>
      {items.map((s, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: ".2rem", alignItems: align === "center" ? "center" : "flex-start" }}>
          <span style={{ fontFamily: "var(--sf-font-display)", fontSize: "var(--sf-text-xl)", lineHeight: 1, color: "var(--text-accent)" }}>{s.n}</span>
          <span style={{ fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-caps)", textTransform: "uppercase", color: "var(--text-body-card)" }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
