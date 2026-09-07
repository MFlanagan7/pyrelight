import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/core";
import styles from "./ProductCard.module.css";

type Props = {
  cover?: ReactNode;
  title: ReactNode;
  /** Small-caps line beneath the title. Format, platform — never a price. */
  meta?: ReactNode;
  tone?: "premium" | "free";
  badge?: ReactNode;
  href: string;
  className?: string;
};

/** 2:3 cover in a gradient frame, Cormorant title, small-caps meta line. */
export function ProductCard({ cover, title, meta, tone = "premium", badge, href, className }: Props) {
  return (
    <Link href={href} className={[styles.card, className].filter(Boolean).join(" ")}>
      <div className={styles.frame}>
        <div className={styles.well}>
          {cover}
          {badge && (
            <span className={styles.badge}>
              <Badge tone={tone}>{badge}</Badge>
            </span>
          )}
        </div>
      </div>
      <div className={styles.text}>
        <h3 className={styles.title}>{title}</h3>
        {meta && <p className={styles.meta}>{meta}</p>}
      </div>
    </Link>
  );
}
