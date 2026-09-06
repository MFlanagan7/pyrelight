import React from "react";

/** Pill tab row for switching a panel's content (Free / Premium, article sections). */
export function Tabs({ items = [], value, onChange, style }) {
  return (
    <div role="tablist" style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", ...style }}>
      {items.map((t) => {
        const active = t.value === value;
        return (
          <button key={t.value} type="button" role="tab" aria-selected={active}
            onClick={() => onChange && onChange(t.value)}
            style={{
              display: "inline-flex", alignItems: "center", gap: ".5rem",
              fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-sm)",
              letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase",
              padding: ".5rem 1.1rem", borderRadius: "var(--sf-radius-pill)", cursor: "pointer",
              border: "1px solid " + (active ? "var(--sf-line-gold)" : "var(--sf-line)"),
              color: active ? "var(--text-accent)" : "var(--sf-ink-300)",
              background: active ? "var(--tint-gold)" : "var(--tint-violet)",
              transition: "border-color var(--sf-dur-hover) var(--sf-ease), color var(--sf-dur-hover) var(--sf-ease)"
            }}>
            {t.label}
            {t.count != null && <span style={{ color: "var(--text-meta)", fontSize: "var(--sf-text-xs)" }}>{t.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
