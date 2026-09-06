import React from "react";

/** Eyebrow label + display heading, optionally with a trailing "see all" link. */
export function SectionHeading({ eyebrow, title, body, action, align = "left", tone = "ink", style }) {
  const titleColor = tone === "gold" ? "var(--text-accent)" : "var(--text-heading)";
  const eyebrowColor = tone === "sea" ? "var(--sf-teal-300)" : "var(--text-accent)";
  return (
    <div style={{
      display: "flex", alignItems: align === "center" ? "center" : "flex-end",
      justifyContent: action ? "space-between" : "flex-start", gap: "var(--sf-space-8)",
      flexWrap: "wrap", textAlign: align, ...style
    }}>
      <div style={{
        display: "flex", flexDirection: "column", gap: ".55rem",
        alignItems: align === "center" ? "center" : "flex-start"
      }}>
        {eyebrow && <p style={{
          fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)",
          letterSpacing: "var(--sf-track-label)", textTransform: "uppercase", color: eyebrowColor
        }}>{eyebrow}</p>}
        <h2 style={{
          fontFamily: "var(--sf-font-display)", fontSize: "var(--sf-text-2xl)",
          lineHeight: "var(--sf-leading-heading)", color: titleColor, maxWidth: "30ch"
        }}>{title}</h2>
        {body && <p style={{
          maxWidth: "var(--sf-measure-body)", color: "var(--text-body)",
          lineHeight: "var(--sf-leading-body)"
        }}>{body}</p>}
      </div>
      {action}
    </div>
  );
}
