import React from "react";

/** Wiki trail. Middot separators, small caps, current page in heading ink. */
export function Breadcrumbs({ items = [], style }) {
  return (
    <nav aria-label="Breadcrumb" style={{
      display: "flex", flexWrap: "wrap", alignItems: "center", gap: ".5rem",
      fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)",
      letterSpacing: "var(--sf-track-caps)", textTransform: "uppercase", ...style
    }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {last
              ? <span aria-current="page" style={{ color: "var(--text-heading)" }}>{it.label}</span>
              : <a href={it.href} style={{ color: "var(--text-label)", textDecoration: "none" }}>{it.label}</a>}
            {!last && <span aria-hidden="true" style={{ color: "var(--text-meta)" }}>&middot;</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
