import React from "react";
import { SocialLinks } from "./SocialLinks.jsx";

/** Four-column sitemap, social row, legal row, copyright with the 5e disclaimer. */
export function SiteFooter({ brand, columns = [], socials = [], legal = [], copyright, style }) {
  return (
    <footer style={{ padding: "4rem var(--sf-section-pad-x) 2rem", background: "var(--surface-footer)", borderTop: "1px solid var(--sf-line)", ...style }}>
      <div style={{ maxWidth: "var(--sf-container)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--sf-space-10)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(11rem, 1fr))", gap: "var(--sf-space-8)" }}>
          {brand}
          {columns.map((col, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: ".7rem" }}>
              <span style={{ fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-label)", textTransform: "uppercase", color: "var(--text-heading)" }}>{col.title}</span>
              {col.links.map((l, j) => (
                <a key={j} href={l.href} style={{ fontFamily: "var(--sf-font-body)", fontSize: ".92rem", color: "var(--text-label)", textDecoration: "none" }}>{l.label}</a>
              ))}
            </div>
          ))}
        </div>
        <SocialLinks links={socials} style={{ paddingTop: ".5rem", borderTop: "1px solid var(--border-section)" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem 1.5rem", alignItems: "center", justifyContent: "space-between", paddingTop: "1.25rem", borderTop: "1px solid var(--border-section)" }}>
          <p style={{ fontSize: "var(--sf-text-xs)", lineHeight: 1.6, color: "var(--text-legal)", maxWidth: "60ch" }}>{copyright}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase" }}>
            {legal.map((l, i) => <a key={i} href={l.href} style={{ color: "var(--text-label)" }}>{l.label}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
