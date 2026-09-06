import React from "react";
import { Accordion } from "./Accordion.jsx";

/** FAQ list: Accordion chrome, but rows open independently and manage themselves. */
export function FaqAccordion({ items = [], allowMultiple = true, defaultOpen = [], style }) {
  const [openSet, setOpenSet] = React.useState(() => new Set(defaultOpen));
  if (!allowMultiple) {
    const first = openSet.size ? Math.min(...openSet) : -1;
    return (
      <Accordion items={items} openIndex={first} style={style}
        onToggle={(i) => setOpenSet(i === -1 ? new Set() : new Set([i]))} />
    );
  }
  const toggle = (i) => setOpenSet((prev) => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: "1px",
      border: "1px solid var(--border-card)", borderRadius: "var(--sf-radius-card)",
      overflow: "hidden", background: "rgba(162,156,196,.14)", ...style
    }}>
      {items.map((it, i) => {
        const open = openSet.has(i);
        return (
          <div key={i} style={{ background: "var(--surface-card)" }}>
            <button type="button" aria-expanded={open} onClick={() => toggle(i)} style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "1rem", padding: "1.1rem 1.3rem", border: 0, background: "transparent",
              cursor: "pointer", textAlign: "left",
              fontFamily: "var(--sf-font-heading)", fontSize: "1rem",
              letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase",
              color: open ? "var(--text-accent)" : "var(--text-heading)"
            }}>
              <span style={{ minWidth: 0 }}>{it.title}</span>
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" style={{
                flex: "none", color: "var(--text-meta)",
                transform: open ? "rotate(180deg)" : "none",
                transition: "transform var(--sf-dur-hover) var(--sf-ease)"
              }}><path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
            {open && (
              <div style={{ padding: "0 1.3rem 1.3rem", fontSize: ".98rem", lineHeight: 1.65, color: "var(--text-body)" }}>
                {it.body}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
