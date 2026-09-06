import React from "react";

/** Playtester quote: gold left rule, Cormorant italic, violet wash. */
export function QuoteBlock({ quote, attribution, style }) {
  return (
    <blockquote style={{
      margin: 0, display: "flex", flexDirection: "column", gap: "var(--sf-space-4)",
      padding: "1.75rem", borderLeft: "2px solid rgba(235,203,110,.5)",
      background: "linear-gradient(120deg, rgba(58,46,92,.34), rgba(20,19,40,.1))",
      borderRadius: "0 var(--sf-radius-card) var(--sf-radius-card) 0", ...style
    }}>
      <p style={{ fontFamily: "var(--sf-font-display)", fontSize: "1.4rem", lineHeight: 1.45, fontStyle: "italic", color: "var(--text-heading)" }}>{quote}</p>
      <footer style={{ fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-caps)", textTransform: "uppercase", color: "var(--text-body-card)" }}>{attribution}</footer>
    </blockquote>
  );
}
