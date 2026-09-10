"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Tabs } from "@/components/navigation";
import { EmptyState } from "@/components/content";
import styles from "./ProductGrid.module.css";

export type ProductCardData = {
  id: number;
  tier: string;
  card: ReactNode;
};

/**
 * Filterable catalogue.
 *
 * Filtering happens in the browser over an already-rendered set rather than by
 * refetching: the catalogue is small, and a round trip per tab would be slower
 * than the work it saves. Cards are rendered on the server and passed through
 * as children, so no product data crosses to the client beyond the tier.
 *
 * Free and premium share one grid — the design system is explicit that the shop
 * never hides the free tier. The filter narrows; it does not segregate.
 */
export function ProductGrid({ items }: { items: ProductCardData[] }) {
  const [tier, setTier] = useState("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length };
    for (const i of items) c[i.tier] = (c[i.tier] ?? 0) + 1;
    return c;
  }, [items]);

  // Only offer a tab for a tier that has something in it.
  const tabs = useMemo(
    () =>
      [
        { value: "all", label: "Everything" },
        { value: "free", label: "Free" },
        { value: "pwyw", label: "Pay what you want" },
        { value: "premium", label: "Premium" },
      ]
        .filter((t) => t.value === "all" || (counts[t.value] ?? 0) > 0)
        .map((t) => ({ ...t, count: counts[t.value] ?? 0 })),
    [counts],
  );

  const visible = tier === "all" ? items : items.filter((i) => i.tier === tier);

  return (
    <div className={styles.wrap}>
      {tabs.length > 2 && (
        <Tabs items={tabs} value={tier} onChange={setTier} label="Filter by tier" panelId="catalogue" />
      )}

      <div id="catalogue">
        {visible.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            body="No products in this tier. Try another, or come back once more has shipped."
          />
        ) : (
          <div className={styles.grid}>{visible.map((i) => i.card)}</div>
        )}
      </div>
    </div>
  );
}
