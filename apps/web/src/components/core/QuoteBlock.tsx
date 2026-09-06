import type { ReactNode } from "react";
import styles from "./QuoteBlock.module.css";

type Props = {
  quote: ReactNode;
  /** Names a role, never a person: "Playtest GM · six sessions in". */
  attribution?: ReactNode;
  className?: string;
};

/** Playtester quote: gold left rule, Cormorant italic, violet wash. */
export function QuoteBlock({ quote, attribution, className }: Props) {
  return (
    <blockquote className={[styles.quote, className].filter(Boolean).join(" ")}>
      <p className={styles.text}>{quote}</p>
      {attribution && <footer className={styles.attribution}>{attribution}</footer>}
    </blockquote>
  );
}
