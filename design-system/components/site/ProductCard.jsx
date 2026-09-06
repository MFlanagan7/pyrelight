import React from "react";
import { Badge } from "../core/Badge.jsx";

/** 2:3 cover in a gradient frame, Cormorant title, small-caps price line. */
export function ProductCard({ cover, title, meta, tone = "premium", badge, href = "#", style }) {
  return (
    <a href={href} style={{
      display: "flex", flexDirection: "column", gap: "var(--sf-space-4)",
      textDecoration: "none", color: "inherit",
      transition: "transform var(--sf-dur-lift) var(--sf-ease)", ...style
    }}>
      <div style={{ padding: "1px", borderRadius: "var(--sf-radius-cover)", background: "linear-gradient(160deg, rgba(235,203,110,.5), rgba(162,156,196,.14))", boxShadow: "var(--sf-shadow-cover)" }}>
        <div style={{ position: "relative", aspectRatio: "2 / 3", borderRadius: "9px", overflow: "hidden", background: "var(--sf-navy-550)" }}>
          {cover}
          {badge && <span style={{ position: "absolute", top: ".65rem", left: ".65rem" }}><Badge tone={tone}>{badge}</Badge></span>}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
        <h3 style={{ fontFamily: "var(--sf-font-display)", fontSize: "var(--sf-text-lg)", lineHeight: 1.2, color: "var(--text-heading)" }}>{title}</h3>
        <p style={{ fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase", color: "var(--text-label)" }}>{meta}</p>
      </div>
    </a>
  );
}
