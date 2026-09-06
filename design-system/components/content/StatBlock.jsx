import React from "react";

/** 5e-style stat block for NPCs, creatures and ships. Reads as a printed sidebar. */
export function StatBlock({ name, kind, abilities = [], rows = [], traits = [], style }) {
  return (
    <section style={{
      display: "flex", flexDirection: "column", gap: ".9rem",
      padding: "1.4rem 1.5rem", borderTop: "2px solid var(--sf-gold-400)",
      borderRadius: "0 0 var(--sf-radius-card) var(--sf-radius-card)",
      background: "var(--surface-raised)", boxShadow: "var(--sf-shadow-card)", ...style
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: ".2rem" }}>
        <h3 style={{ fontFamily: "var(--sf-font-display)", fontSize: "var(--sf-text-xl)", lineHeight: 1.15, color: "var(--text-accent)" }}>{name}</h3>
        {kind && <p style={{ fontStyle: "italic", fontSize: ".95rem", color: "var(--text-body-card)" }}>{kind}</p>}
      </div>

      {abilities.length > 0 && (
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(3.5rem, 1fr))", gap: ".6rem",
          padding: ".85rem 0", borderTop: "1px solid var(--sf-line-gold)", borderBottom: "1px solid var(--sf-line-gold)"
        }}>
          {abilities.map((a, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".15rem" }}>
              <span style={{ fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-caps)", textTransform: "uppercase", color: "var(--text-meta)" }}>{a.label}</span>
              <span style={{ fontFamily: "var(--sf-font-display)", fontSize: "var(--sf-text-md)", color: "var(--text-heading)" }}>{a.value}</span>
            </div>
          ))}
        </div>
      )}

      {rows.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
          {rows.map((r, i) => (
            <p key={i} style={{ fontSize: ".95rem", lineHeight: 1.55, color: "var(--text-body)" }}>
              <strong style={{ fontFamily: "var(--sf-font-heading)", fontWeight: "var(--sf-weight-heading)", letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase", fontSize: ".85rem", color: "var(--text-heading)" }}>{r.label} </strong>
              {r.value}
            </p>
          ))}
        </div>
      )}

      {traits.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: ".6rem", paddingTop: ".3rem", borderTop: "1px solid var(--border-section)" }}>
          {traits.map((t, i) => (
            <p key={i} style={{ fontSize: ".95rem", lineHeight: 1.6, color: "var(--text-body)" }}>
              <em style={{ fontFamily: "var(--sf-font-display)", fontStyle: "italic", fontSize: "1.05rem", color: "var(--text-heading)" }}>{t.name}. </em>
              {t.text}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
