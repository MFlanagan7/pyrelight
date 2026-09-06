import React from "react";

const tones = {
  lore: { border: "var(--sf-line-gold)", tint: "var(--tint-gold)", label: "var(--sf-gold-400)" },
  gm: { border: "rgba(107,43,43,.55)", tint: "rgba(107,43,43,.18)", label: "#D89A9A" },
  rule: { border: "var(--sf-line-sea)", tint: "var(--tint-teal)", label: "var(--sf-teal-300)" },
  note: { border: "var(--sf-line)", tint: "var(--tint-violet)", label: "var(--text-label)" }
};

/** Aside inside long-form: in-world lore, GM-only advice, a rules clarification, or a note. */
export function Callout({ tone = "note", label, children, style }) {
  const t = tones[tone];
  return (
    <aside style={{
      display: "flex", flexDirection: "column", gap: ".6rem",
      padding: "1.15rem 1.25rem", borderLeft: "2px solid " + t.border,
      borderRadius: "0 var(--sf-radius-card) var(--sf-radius-card) 0",
      background: t.tint, ...style
    }}>
      {label && <span style={{
        fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)",
        letterSpacing: "var(--sf-track-caps)", textTransform: "uppercase", color: t.label
      }}>{label}</span>}
      <div style={{ fontSize: ".98rem", lineHeight: 1.65, color: "var(--text-over-image)" }}>{children}</div>
    </aside>
  );
}
