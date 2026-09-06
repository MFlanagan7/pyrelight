import React from "react";

/** Small-caps chip: nav-adjacent tags, race names, feature chips, and eyebrow badges. */
export function Pill({ href, tone = "neutral", children, style, ...rest }) {
  const tones = {
    neutral: { color: "var(--sf-ink-300)", border: "1px solid var(--sf-line-strong)", background: "var(--tint-violet)" },
    outline: { color: "var(--text-label)", border: "1px solid var(--sf-line-strong)", background: "rgba(13,12,27,.55)" },
    gold: { color: "var(--action-primary-ink)", border: "1px solid var(--sf-gold-400)", background: "var(--sf-gold-400)" }
  };
  const Tag = href ? "a" : "span";
  return (
    <Tag href={href} style={{
      display: "inline-flex", alignItems: "center", gap: ".5rem",
      fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)", textTransform: "uppercase",
      padding: ".35rem .9rem", borderRadius: "var(--sf-radius-pill)",
      textDecoration: "none", transition: "border-color var(--sf-dur-hover) var(--sf-ease), color var(--sf-dur-hover) var(--sf-ease)",
      ...tones[tone], ...style
    }} {...rest}>{children}</Tag>
  );
}
