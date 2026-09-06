import React from "react";
import { Button } from "../core/Button.jsx";

/** Right-hand cart panel: line items, totals, checkout. */
export function CartDrawer({ open = false, items = [], subtotal, note, onClose, children, style }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-label="Cart" aria-modal="true" style={{ position: "fixed", inset: 0, zIndex: 80, display: "flex", justifyContent: "flex-end" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(10,9,23,.72)", backdropFilter: "blur(4px)" }} />
      <aside style={{
        position: "relative", width: "min(26rem, 100%)", height: "100%", display: "flex",
        flexDirection: "column", background: "var(--surface-card)",
        borderLeft: "1px solid var(--sf-line)", boxShadow: "var(--sf-shadow-float)", ...style
      }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "1.35rem 1.5rem", borderBottom: "1px solid var(--border-card)" }}>
          <h2 style={{ fontFamily: "var(--sf-font-display)", fontSize: "var(--sf-text-lg)", color: "var(--text-heading)" }}>Your cart</h2>
          <button type="button" onClick={onClose} aria-label="Close cart" style={{
            display: "flex", alignItems: "center", justifyContent: "center", width: "2.1rem", height: "2.1rem",
            border: "1px solid var(--sf-line-strong)", borderRadius: "var(--sf-radius-pill)",
            background: "transparent", color: "var(--sf-ink-300)", cursor: "pointer"
          }}>
            <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
          </button>
        </header>

        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1px", background: "rgba(162,156,196,.14)" }}>
          {children}
        </div>

        <footer style={{ display: "flex", flexDirection: "column", gap: ".9rem", padding: "1.35rem 1.5rem", borderTop: "1px solid var(--border-card)", background: "var(--surface-raised)" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem" }}>
            <span style={{ fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-caps)", textTransform: "uppercase", color: "var(--text-meta)" }}>Subtotal</span>
            <span style={{ fontFamily: "var(--sf-font-display)", fontSize: "var(--sf-text-lg)", color: "var(--text-accent)" }}>{subtotal}</span>
          </div>
          {note && <p style={{ fontSize: "var(--sf-text-xs)", lineHeight: 1.5, color: "var(--text-meta)" }}>{note}</p>}
          <Button size="md" style={{ width: "100%" }}>Checkout</Button>
        </footer>
      </aside>
    </div>
  );
}

/** One row inside the drawer. */
export function CartLineItem({ cover, title, meta, price, qty, onRemove, style }) {
  return (
    <div style={{ display: "flex", gap: "1rem", padding: "1.1rem 1.5rem", background: "var(--surface-card)", ...style }}>
      <div style={{ position: "relative", flex: "none", width: "3.25rem", height: "4.4rem", borderRadius: "var(--sf-radius-chip)", overflow: "hidden", background: "var(--surface-well)", border: "1px solid rgba(235,203,110,.25)" }}>{cover}</div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: ".25rem" }}>
        <span style={{ fontFamily: "var(--sf-font-display)", fontSize: "1.2rem", lineHeight: 1.2, color: "var(--text-heading)" }}>{title}</span>
        {meta && <span style={{ fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase", color: "var(--text-meta)" }}>{meta}</span>}
        {onRemove && <button type="button" onClick={onRemove} style={{
          alignSelf: "flex-start", padding: 0, border: 0, background: "transparent", cursor: "pointer",
          fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)",
          letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase", color: "var(--text-label)"
        }}>Remove</button>}
      </div>
      <div style={{ flex: "none", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: ".25rem" }}>
        <span style={{ whiteSpace: "nowrap", fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-sm)", letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase", color: "var(--text-accent)" }}>{price}</span>
        {qty != null && <span style={{ fontSize: "var(--sf-text-xs)", color: "var(--text-meta)" }}>&times;{qty}</span>}
      </div>
    </div>
  );
}
