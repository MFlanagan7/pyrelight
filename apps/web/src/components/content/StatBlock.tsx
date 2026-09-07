import type { ReactNode } from "react";
import styles from "./StatBlock.module.css";

export type StatAbility = { label: string; value: string };
export type StatRow = { label: string; value: ReactNode };
export type StatTrait = { name: string; text: ReactNode };

type Props = {
  name: string;
  /** "Medium humanoid (drowned), neutral evil" */
  kind?: string;
  abilities?: StatAbility[];
  rows?: StatRow[];
  traits?: StatTrait[];
  className?: string;
};

/**
 * Fifth-edition style stat block for NPCs, creatures and ships.
 *
 * Anything rendered here is mechanical content — see
 * docs/legal-and-licensing.md. It is locked to the system it was written from
 * and must not be carried between SRD and ORC products.
 */
export function StatBlock({ name, kind, abilities = [], rows = [], traits = [], className }: Props) {
  return (
    <section className={[styles.block, className].filter(Boolean).join(" ")}>
      <div className={styles.head}>
        <h3 className={styles.name}>{name}</h3>
        {kind && <p className={styles.kind}>{kind}</p>}
      </div>

      {abilities.length > 0 && (
        <div className={styles.abilities}>
          {abilities.map((a) => (
            <div key={a.label} className={styles.ability}>
              <span className={styles.abilityLabel}>{a.label}</span>
              <span className={styles.abilityValue}>{a.value}</span>
            </div>
          ))}
        </div>
      )}

      {rows.length > 0 && (
        <div className={styles.rows}>
          {rows.map((r) => (
            <p key={r.label} className={styles.row}>
              <strong className={styles.rowLabel}>{r.label} </strong>
              {r.value}
            </p>
          ))}
        </div>
      )}

      {traits.length > 0 && (
        <div className={styles.traits}>
          {traits.map((t) => (
            <p key={t.name} className={styles.trait}>
              <em className={styles.traitName}>{t.name}. </em>
              {t.text}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
