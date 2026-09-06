import React from "react";

/**
 * The only correct way to place art on a Starfall page: a 1px gradient border wrapping a
 * dark well, with an optional scrim so text can sit on top.
 */
export function ImageFrame({ ratio = "16 / 9", scrim = "none", radius = "var(--sf-radius-frame)", float = false, children, style }) {
  const scrims = {
    none: null,
    card: "var(--sf-scrim-card)",
    caption: "var(--sf-scrim-caption)",
    full: "linear-gradient(180deg, rgba(13,12,27,.2), rgba(13,12,27,.75))"
  };
  return (
    <div style={{
      padding: "1px", borderRadius: "calc(" + radius + " + 1px)",
      background: "var(--sf-border-gradient)",
      boxShadow: float ? "var(--sf-shadow-float)" : "none", ...style
    }}>
      <div style={{
        position: "relative", borderRadius: radius, overflow: "hidden",
        background: "var(--surface-well)", aspectRatio: ratio
      }}>
        {children}
        {scrims[scrim] && <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: scrims[scrim] }} />}
      </div>
    </div>
  );
}
