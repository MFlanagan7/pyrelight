import React from "react";
import { Button } from "../core/Button.jsx";

/** Email capture. Same copy on both sites: "Join for a free map + new releases". */
export function NewsletterForm({ onSubmit, note = "", align = "center", style }) {
  return (
    <form onSubmit={onSubmit} style={{
      display: "flex", flexDirection: "column", gap: ".625rem",
      alignItems: align === "center" ? "center" : "stretch", width: "100%", ...style
    }}>
      <div style={{ display: "flex", gap: ".625rem", flexWrap: "wrap", width: "100%", maxWidth: "27rem" }}>
        <input type="email" required placeholder="you@example.com" aria-label="Email address" style={{
          flex: "1 1 12rem", minWidth: 0, padding: ".85rem 1.1rem",
          border: "1px solid rgba(162,156,196,.4)", borderRadius: "var(--sf-radius-pill)",
          background: "rgba(239,236,246,.06)", color: "var(--text-heading)",
          fontFamily: "var(--sf-font-body)", fontSize: "var(--sf-text-base)"
        }} />
        <Button type="submit" size="md" style={{ flex: "none" }}>Join</Button>
      </div>
      <p style={{
        minHeight: "1.2rem", fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)",
        letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase", color: "var(--text-label)"
      }}>{note}</p>
    </form>
  );
}
