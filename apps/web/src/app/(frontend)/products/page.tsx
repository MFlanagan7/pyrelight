import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/core";
import { EmptyState } from "@/components/content";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductCard } from "@/components/site";
import { findProducts, TIER_LABEL } from "@/lib/products";
import type { Media } from "@/payload-types";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Products",
  description: "Free and premium material for Starfall, on itch.io and DriveThruRPG.",
  alternates: { canonical: "/products" },
};

const asMedia = (v: number | Media | null | undefined): Media | null =>
  typeof v === "object" && v !== null ? v : null;

export default async function ProductsPage() {
  const { docs } = await findProducts();

  // Cards render here, on the server, and cross to the filter as elements.
  // Only the tier travels as data, so the client never receives the catalogue.
  const items = docs.map((p) => {
    const cover = asMedia(p.cover);
    return {
      id: p.id,
      tier: p.tier,
      card: (
        <ProductCard
          key={p.id}
          href={`/products/${p.slug}`}
          title={p.title}
          meta={TIER_LABEL[p.tier]}
          tone={p.tier === "free" ? "free" : "premium"}
          badge={p.tier === "free" ? "Free" : undefined}
          cover={
            cover?.url ? (
              <Image
                src={cover.url}
                alt={cover.alt ?? ""}
                fill
                sizes="(max-width: 768px) 50vw, 260px"
                style={{ objectFit: "cover" }}
              />
            ) : null
          }
        />
      ),
    };
  });

  return (
    <main className={styles.main}>
      <SectionHeading
        eyebrow="Pyrelight Press"
        title="Products"
        body="Everything published for Starfall. Free and premium sit together — buying happens on itch.io or DriveThruRPG."
      />

      <div className={styles.grid}>
        {items.length === 0 ? (
          <EmptyState
            title="Nothing published yet"
            body="The first Starfall release is being made. Join the newsletter and it will find you."
          />
        ) : (
          <ProductGrid items={items} />
        )}
      </div>
    </main>
  );
}
