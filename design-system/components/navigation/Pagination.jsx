import React from "react";

/** Numbered pager for wiki indexes and the shop. Pills, gold for the current page. */
export function Pagination({ page = 1, pages = 1, onChange, hrefFor, style }) {
  const nums = [];
  const from = Math.max(1, Math.min(page - 2, pages - 4));
  for (let i = from; i < from + 5 && i <= pages; i++) nums.push(i);

  const cell = (active) => ({
    display: "flex", alignItems: "center", justifyContent: "center",
    minWidth: "2.35rem", height: "2.35rem", padding: "0 .6rem",
    fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-sm)",
    letterSpacing: "var(--sf-track-nav)", textTransform: "uppercase",
    borderRadius: "var(--sf-radius-pill)", textDecoration: "none", cursor: "pointer",
    border: "1px solid " + (active ? "var(--sf-gold-400)" : "var(--sf-line)"),
    color: active ? "var(--action-primary-ink)" : "var(--sf-ink-300)",
    background: active ? "var(--sf-gold-400)" : "var(--tint-violet)",
    transition: "border-color var(--sf-dur-hover) var(--sf-ease), color var(--sf-dur-hover) var(--sf-ease)"
  });

  const Item = ({ n, children, disabled, label }) => {
    const props = {
      "aria-label": label, "aria-current": n === page ? "page" : undefined,
      style: { ...cell(n === page), ...(disabled ? { opacity: .4, pointerEvents: "none" } : null) }
    };
    return hrefFor
      ? <a href={hrefFor(n)} {...props}>{children ?? n}</a>
      : <button type="button" onClick={() => onChange && onChange(n)} {...props}>{children ?? n}</button>;
  };

  return (
    <nav aria-label="Pagination" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: ".5rem", ...style }}>
      <Item n={page - 1} disabled={page <= 1} label="Previous page">&larr;</Item>
      {from > 1 && <span style={{ color: "var(--text-meta)", padding: "0 .25rem" }}>&hellip;</span>}
      {nums.map((n) => <Item key={n} n={n} label={"Page " + n} />)}
      {from + 5 <= pages && <span style={{ color: "var(--text-meta)", padding: "0 .25rem" }}>&hellip;</span>}
      <Item n={page + 1} disabled={page >= pages} label="Next page">&rarr;</Item>
    </nav>
  );
}
