import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge, Button, ImageFrame } from "@/components/core";
import { RichText } from "@/components/RichText";
import { attributionFor } from "@/lib/legal";
import { findProductBySlug, findProducts, STORE_LABEL, TIER_LABEL, storeHref } from "@/lib/products";
import type { Media } from "@/payload-types";
import styles from "./page.module.css";

const asMedia = (v: number | Media | null | undefined): Media | null =>
  typeof v === "object" && v !== null ? v : null;

export async function generateStaticParams() {
  const { docs } = await findProducts();
  return docs.map((p) => ({ slug: String(p.slug) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await findProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.blurb,
    robots: product.seo?.noIndex ? { index: false } : undefined,
    alternates: { canonical: `/products/${product.slug}` },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await findProductBySlug(slug);

  if (!product) notFound();

  const cover = asMedia(product.cover);
  const gallery = (product.gallery ?? [])
    .map((row) => asMedia(row.image))
    .filter((m): m is Media => m !== null);

  // Only the notice matching what this product actually used — attributing an
  // SRD a work did not draw from is misleading. See docs/legal-and-licensing.md.
  const attribution = attributionFor(product.licence);

  const links = product.storeLinks ?? [];
  const hasAffiliate = links.some((l) => l.affiliateUrl?.trim());

  return (
    <main className={styles.main}>
      <div className={styles.layout}>
        <div>
          {cover?.url && (
            <div className={styles.cover}>
              <Image
                src={cover.url}
                alt={cover.alt ?? ""}
                fill
                sizes="(max-width: 60rem) 100vw, 22rem"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}
          <p className={styles.tier}>{TIER_LABEL[product.tier]}</p>
        </div>

        <div>
          <h1 className={styles.title}>{product.title}</h1>
          {product.tier === "free" && <Badge tone="free">Free</Badge>}
          <p className={styles.blurb}>{product.blurb}</p>

          {links.length > 0 && (
            <>
              <div className={styles.buy}>
                {links.map((link, i) => (
                  <Button
                    key={link.id ?? i}
                    href={storeHref(link)}
                    variant={i === 0 ? "primary" : "ghost"}
                    // Leaving our origin for a storefront: noopener is a
                    // security measure, not a preference.
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {product.tier === "free" ? "Download on" : "Buy on"}{" "}
                    {STORE_LABEL[link.platform] ?? link.platform}
                  </Button>
                ))}
              </div>
              {/* Disclosed because affiliate links pay us, and saying so is both
                  the FTC's position and the decent thing to do. */}
              {hasAffiliate && (
                <p className={styles.buyNote}>
                  Some links are affiliate links — they cost you nothing extra.
                </p>
              )}
            </>
          )}

          {product.description && (
            <div className={styles.description}>
              <RichText data={product.description} />
            </div>
          )}
        </div>
      </div>

      {gallery.length > 0 && (
        <div className={styles.gallery}>
          {gallery.map((img) => (
            <ImageFrame key={img.id} ratio="4 / 3" scrim="caption">
              {img.url && (
                <Image
                  src={img.url}
                  alt={img.alt ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  style={{ objectFit: "cover" }}
                />
              )}
            </ImageFrame>
          ))}
        </div>
      )}

      {attribution && (
        <section className={styles.licence}>
          <p className={styles.licenceLabel}>Licence</p>
          <p className={styles.licenceText}>{attribution}</p>
        </section>
      )}
    </main>
  );
}
