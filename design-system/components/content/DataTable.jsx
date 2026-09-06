import React from "react";

/** Rules and price tables. Hairline rows, small-caps head, no vertical rules. */
export function DataTable({ caption, columns = [], rows = [], align = [], style }) {
  const cellPad = ".7rem .9rem";
  return (
    <div style={{ border: "1px solid var(--border-card)", borderRadius: "var(--sf-radius-card)", overflow: "hidden", background: "var(--surface-card)", ...style }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".95rem" }}>
        {caption && <caption style={{
          captionSide: "top", textAlign: "left", padding: cellPad,
          fontFamily: "var(--sf-font-heading)", fontSize: "var(--sf-text-xs)",
          letterSpacing: "var(--sf-track-label)", textTransform: "uppercase",
          color: "var(--text-accent)", borderBottom: "1px solid var(--border-card)"
        }}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} scope="col" style={{
                padding: cellPad, textAlign: align[i] || "left",
                fontFamily: "var(--sf-font-heading)", fontWeight: "var(--sf-weight-heading)",
                fontSize: "var(--sf-text-xs)", letterSpacing: "var(--sf-track-caps)",
                textTransform: "uppercase", color: "var(--text-meta)",
                borderBottom: "1px solid var(--sf-line-gold)", whiteSpace: "nowrap"
              }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 ? "rgba(58,46,92,.16)" : "transparent" }}>
              {r.map((cell, j) => (
                <td key={j} style={{
                  padding: cellPad, textAlign: align[j] || "left",
                  lineHeight: 1.5, color: j === 0 ? "var(--text-heading)" : "var(--text-body)",
                  borderBottom: i === rows.length - 1 ? "0" : "1px solid var(--border-section)"
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
