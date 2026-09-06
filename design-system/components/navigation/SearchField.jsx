import React from "react";

/** Wiki search. Pill input with a leading glyph and an optional scope label. */
export function SearchField({ value, onChange, onSubmit, placeholder = "Search the wiki", scope, size = "md", style }) {
  const pad = size === "lg" ? ".9rem 1.2rem" : ".7rem 1rem";
  return (
    <form role="search" onSubmit={onSubmit} style={{
      display: "flex", alignItems: "center", gap: ".7rem",
      padding: pad, border: "1px solid var(--sf-line-strong)",
      borderRadius: "var(--sf-radius-pill)", background: "rgba(239,236,246,.06)",
      transition: "border-color var(--sf-dur-hover) var(--sf-ease)", ...style
    }}>
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" style={{ flex: "none", color: "var(--text-meta)" }}>
        <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15.5 15.5 L21 21" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <input type="search" value={value} onChange={onChange} placeholder={placeholder} aria-label={placeholder} style={{
        flex: 1, minWidth: 0, border: 0, outline: "none", background: "transparent",
        color: "var(--text-heading)", fontFamily: "var(--sf-font-body)",
        fontSize: size === "lg" ? "1.05rem" : "var(--sf-text-base)"
      }} />
      {scope && <span style={{
        flex: "none", fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)",
        letterSpacing: "var(--sf-track-caps)", textTransform: "uppercase", color: "var(--text-meta)"
      }}>{scope}</span>}
    </form>
  );
}
