import React from "react";

/** GM-only reveal. Closed by default; oxblood chrome borrowed from Callout tone="gm". */
export function SpoilerBlock({
  title = "GM only",
  note,
  children,
  open: openProp,
  onToggle,
  defaultOpen = false,
  style
}) {
  const [selfOpen, setSelfOpen] = React.useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : selfOpen;
  const toggle = () => {
    if (!controlled) setSelfOpen(!open);
    if (onToggle) onToggle(!open);
  };
  return (
    <section style={{
      borderLeft: "2px solid rgba(107,43,43,.55)",
      borderRadius: "0 var(--sf-radius-card) var(--sf-radius-card) 0",
      background: "rgba(107,43,43,.18)", overflow: "hidden", ...style
    }}>
      <button type="button" aria-expanded={open} onClick={toggle} style={{
        width: "100%", display: "flex", alignItems: "center", gap: ".85rem",
        padding: "1.15rem 1.25rem", border: 0, background: "transparent",
        cursor: "pointer", textAlign: "left"
      }}>
        <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" style={{
          flex: "none", color: "#D89A9A",
          transform: open ? "rotate(90deg)" : "none",
          transition: "transform var(--sf-dur-hover) var(--sf-ease)"
        }}><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        <span style={{
          flex: 1, minWidth: 0, fontFamily: "var(--sf-font-heading)",
          fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-caps)",
          textTransform: "uppercase", color: "#D89A9A"
        }}>{title}</span>
        <span style={{
          flex: "none", fontFamily: "var(--sf-font-heading)",
          fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-label)",
          textTransform: "uppercase", color: "var(--text-meta)"
        }}>{open ? "Hide" : "Reveal"}</span>
      </button>
      {!open && note && (
        <p style={{
          padding: "0 1.25rem 1.25rem 3.1rem", fontStyle: "italic",
          fontSize: ".92rem", lineHeight: 1.6, color: "var(--text-meta)"
        }}>{note}</p>
      )}
      {open && (
        <div style={{
          padding: "0 1.25rem 1.35rem 3.1rem", fontSize: ".98rem",
          lineHeight: 1.65, color: "var(--text-over-image)"
        }}>{children}</div>
      )}
    </section>
  );
}
