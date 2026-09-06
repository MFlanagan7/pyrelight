import React from "react";

/** Nav cart affordance. Gold count bubble appears only when the cart has items. */
export function CartButton({ count = 0, onClick, href, label = "Cart", style }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} aria-label={count ? label + ", " + count + " items" : label + ", empty"} style={{
      position: "relative", display: "inline-flex", alignItems: "center", gap: ".5rem",
      fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-sm)",
      letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase",
      padding: ".45rem 1rem", borderRadius: "var(--sf-radius-pill)",
      border: "1px solid var(--sf-line-strong)", background: "var(--action-ghost-bg)",
      color: "var(--sf-ink-100)", textDecoration: "none", cursor: "pointer",
      transition: "border-color var(--sf-dur-hover) var(--sf-ease), background var(--sf-dur-hover) var(--sf-ease)", ...style
    }}>
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" style={{ flex: "none" }}>
        <path d="M4 6h3l2.2 9.4A2 2 0 0 0 11.1 17h6.6a2 2 0 0 0 1.95-1.55L21 9H8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11.5" cy="20" r="1.3" fill="currentColor" />
        <circle cx="17.5" cy="20" r="1.3" fill="currentColor" />
      </svg>
      {label}
      {count > 0 && <span aria-hidden="true" style={{
        minWidth: "1.35rem", height: "1.35rem", display: "inline-flex", alignItems: "center",
        justifyContent: "center", borderRadius: "var(--sf-radius-pill)",
        background: "var(--sf-gold-400)", color: "var(--action-primary-ink)",
        fontSize: "var(--sf-text-2xs)", letterSpacing: 0
      }}>{count}</span>}
    </Tag>
  );
}
