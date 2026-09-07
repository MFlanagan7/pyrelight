import {
  SRD_5_1_ATTRIBUTION,
  SRD_5_2_ATTRIBUTION,
  TRADEMARK_NOTICE,
} from "@/lib/legal";
import styles from "./LegalNotices.module.css";

export type NoticeKey = "trademark" | "srd-5.1" | "srd-5.2" | "orc";

const NOTICES: Record<NoticeKey, { label: string; text: string }> = {
  trademark: { label: "Trademark", text: TRADEMARK_NOTICE },
  "srd-5.1": { label: "SRD 5.1 — D&D 5e, 2014 rules", text: SRD_5_1_ATTRIBUTION },
  "srd-5.2": { label: "SRD 5.2 — D&D 5e, 2024 rules", text: SRD_5_2_ATTRIBUTION },
  orc: {
    label: "ORC — Pathfinder and Starfinder",
    text: "This work includes material licensed under the ORC License, held by Azora Law and available at https://paizo.com/orclicense.",
  },
};

/**
 * Renders licence notices verbatim from lib/legal.ts.
 *
 * Deliberately not editable in the CMS. These strings are mandated by the
 * licences themselves, and altering one is a breach rather than a copy change.
 */
export function LegalNotices({ notices }: { notices: NoticeKey[] }) {
  if (notices.length === 0) return null;

  return (
    <section className={styles.notices} aria-labelledby="licence-notices">
      <h2 id="licence-notices" className={styles.heading}>
        Licence notices
      </h2>
      <p className={styles.lede}>
        Reproduced verbatim as the licences require. Individual products carry
        only the notices matching the material they actually used.
      </p>
      {notices.map((key) => (
        <div key={key} className={styles.notice}>
          <p className={styles.label}>{NOTICES[key].label}</p>
          <p className={styles.text}>{NOTICES[key].text}</p>
        </div>
      ))}
    </section>
  );
}
