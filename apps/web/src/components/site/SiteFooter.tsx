import Link from "next/link";
import { TRADEMARK_NOTICE } from "@/lib/legal";
import { SocialLinks, type SocialLink } from "./SocialLinks";
import styles from "./SiteFooter.module.css";

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

const LEGAL_LINKS = [
  { label: "Legal", href: "/legal" },
  { label: "Privacy", href: "/privacy" },
  { label: "Content license", href: "/content-license" },
];

/**
 * Sitemap columns, then the legal row. The copyright line is rendered from
 * lib/legal.ts rather than the CMS — it is mandated verbatim, so it must not be
 * casually editable.
 */
export function SiteFooter({
  columns = [],
  socials = [],
  note,
}: {
  columns?: FooterColumn[];
  socials?: SocialLink[];
  /** Optional line above the legal block, from SiteSettings. */
  note?: string;
}) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <span className={styles.brand}>Starfall</span>
          {columns.map((col) => (
            <div key={col.title} className={styles.column}>
              <span className={styles.columnTitle}>{col.title}</span>
              {col.links.map((l) => (
                <Link key={l.href} href={l.href} className={styles.columnLink}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {socials.length > 0 && <SocialLinks links={socials} />}

        {note && <p className={styles.note}>{note}</p>}

        <div className={styles.legalRow}>
          <p className={styles.copyright}>{TRADEMARK_NOTICE}</p>
          <div className={styles.legalLinks}>
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
