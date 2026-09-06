import React from "react";

const base = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: ".5rem",
  fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-base)",
  letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase",
  borderRadius: "var(--sf-radius-pill)", cursor: "pointer", textDecoration: "none",
  transition: "box-shadow var(--sf-dur-lift) var(--sf-ease), background var(--sf-dur-hover) var(--sf-ease), border-color var(--sf-dur-hover) var(--sf-ease), transform var(--sf-dur-press) var(--sf-ease)"
};

const sizes = {
  sm: { padding: ".45rem 1.1rem", fontSize: "var(--sf-text-sm)" },
  md: { padding: ".7rem 1.6rem" },
  lg: { padding: ".9rem 2.3rem" }
};

const variants = {
  primary: {
    color: "var(--action-primary-ink)", background: "var(--action-primary-bg)",
    border: "0", boxShadow: "var(--sf-glow-button)"
  },
  ghost: {
    color: "var(--sf-ink-100)", background: "var(--action-ghost-bg)",
    border: "1px solid var(--action-ghost-border)", backdropFilter: "blur(6px)"
  },
  quiet: {
    color: "var(--text-link)", background: "transparent", border: "0",
    padding: "0", letterSpacing: "var(--sf-track-nav)", fontSize: "var(--sf-text-sm)"
  }
};

/** Primary gold pill, ghost outline, or a quiet inline link-button. */
export function Button({ variant = "primary", size = "md", href, children, style, ...rest }) {
  const Tag = href ? "a" : "button";
  const s = { ...base, ...(variant === "quiet" ? {} : sizes[size]), ...variants[variant], ...style };
  return <Tag href={href} style={s} {...rest}>{children}</Tag>;
}
