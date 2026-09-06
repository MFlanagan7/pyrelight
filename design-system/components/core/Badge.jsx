import React from "react";

/** Free / Premium marker pinned to the corner of a product cover. */
export function Badge({ tone = "premium", children, style, ...rest }) {
  const tones = {
    premium: { color: "var(--action-primary-ink)", background: "rgba(235,203,110,.92)", borderColor: "var(--sf-gold-400)" },
    free: { color: "var(--sf-status-free)", background: "rgba(13,12,27,.7)", borderColor: "rgba(155,211,168,.6)" }
  };
  const t = tones[tone];
  return (
    <span style={{
      fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-2xs)",
      letterSpacing: "var(--sf-track-caps)", textTransform: "uppercase",
      padding: ".25rem .6rem", borderRadius: "var(--sf-radius-pill)",
      border: "1px solid " + t.borderColor, color: t.color, background: t.background, ...style
    }} {...rest}>{children}</span>
  );
}
