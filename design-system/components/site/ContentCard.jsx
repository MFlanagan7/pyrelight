import React from "react";

/**
 * The workhorse card: art well, small-caps title, body, optional meta/tag.
 * Covers lore teasers, wiki categories, houses and factions.
 */
export function ContentCard({ image, title, body, tag, count, href, gradientBorder = false, style }) {
  const inner = (
    <>
      {image && (
        <div style={{ position: "relative", aspectRatio: "16 / 9", background: "var(--surface-well)" }}>
          {image}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "var(--sf-scrim-card)" }} />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: ".6rem", padding: "1.15rem 1.25rem 1.35rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--sf-space-4)" }}>
          <h3 style={{
            fontFamily: "var(--sf-font-heading)", fontWeight: "var(--sf-weight-heading)",
            fontSize: "1.05rem", letterSpacing: "var(--sf-track-caps)",
            textTransform: "uppercase", color: "var(--text-heading)", minWidth: 0
          }}>{title}</h3>
          {count && <span style={{ flex: "none", whiteSpace: "nowrap", fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase", color: "var(--text-meta)" }}>{count}</span>}
        </div>
        {body && <p style={{ fontSize: ".93rem", lineHeight: 1.55, color: "var(--text-body-card)" }}>{body}</p>}
        {tag && <span style={{ fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-caps)", textTransform: "uppercase", color: "var(--text-meta)" }}>{tag}</span>}
      </div>
    </>
  );

  const shell = {
    display: "flex", flexDirection: "column", overflow: "hidden",
    borderRadius: "var(--sf-radius-card)", background: "var(--surface-card)",
    border: gradientBorder ? "0" : "1px solid var(--border-card)",
    textDecoration: "none", color: "inherit",
    transition: "border-color var(--sf-dur-hover) var(--sf-ease), transform var(--sf-dur-lift) var(--sf-ease), box-shadow var(--sf-dur-lift) var(--sf-ease)",
    ...style
  };

  const Tag = href ? "a" : "article";
  if (!gradientBorder) return <Tag href={href} style={shell}>{inner}</Tag>;
  return (
    <div style={{ padding: "1px", borderRadius: "var(--sf-radius-panel)", background: "var(--sf-border-gradient-card)", ...style }}>
      <Tag href={href} style={{ ...shell, height: "100%", borderRadius: "var(--sf-radius-card)" }}>{inner}</Tag>
    </div>
  );
}
