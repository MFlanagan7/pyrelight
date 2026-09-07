import { RichText } from "@/components/RichText";
import { LegalNotices, type NoticeKey } from "./LegalNotices";
import type { LegalDocument as LegalDoc } from "@/payload-types";
import styles from "./LegalDocument.module.css";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Shared shell for the three legal routes: CMS prose on top, mandated notices
 * beneath. The notices render whether or not a document has been authored — a
 * missing page must never mean a missing attribution.
 */
export function LegalDocument({
  doc,
  fallbackTitle,
  notices,
}: {
  doc: LegalDoc | null;
  fallbackTitle: string;
  notices: NoticeKey[];
}) {
  return (
    <main className={styles.main}>
      <p className={styles.eyebrow}>Pyrelight Press</p>
      <h1 className={styles.title}>{doc?.title ?? fallbackTitle}</h1>

      {doc?.intro && <p className={styles.intro}>{doc.intro}</p>}

      {doc?.lastReviewed && (
        <p className={styles.reviewed}>
          Last reviewed {dateFormat.format(new Date(doc.lastReviewed))}
        </p>
      )}

      {doc?.body ? (
        <div className={styles.body}>
          <RichText data={doc.body} />
        </div>
      ) : (
        <p className={styles.placeholder}>
          No text has been written for this page yet. Add a Legal document in the
          admin with the matching slug. The licence notices below are rendered
          from code and appear regardless.
        </p>
      )}

      <LegalNotices notices={notices} />
    </main>
  );
}
