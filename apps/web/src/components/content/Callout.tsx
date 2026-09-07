import type { ReactNode } from "react";
import styles from "./Callout.module.css";

export type CalloutTone = "lore" | "gm" | "rule" | "note";

type Props = {
  tone?: CalloutTone;
  label?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/** Aside inside long-form: in-world lore, GM-only advice, a rules clarification, or a note. */
export function Callout({ tone = "note", label, children, className }: Props) {
  return (
    <aside className={[styles.callout, styles[tone], className].filter(Boolean).join(" ")}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.body}>{children}</div>
    </aside>
  );
}
