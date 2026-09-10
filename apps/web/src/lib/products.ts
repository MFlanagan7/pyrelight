import type { Product } from "@/payload-types";
import { getPayloadClient, publishedOnly } from "./payload";

/** Tier labels. No prices on this site — they go stale during sales. */
export const TIER_LABEL: Record<string, string> = {
  free: "Free",
  pwyw: "Pay what you want",
  premium: "Premium",
};

export const STORE_LABEL: Record<string, string> = {
  itch: "itch.io",
  drivethrurpg: "DriveThruRPG",
  other: "Store",
};

/**
 * The URL a buy button should use.
 *
 * An affiliate-tagged link takes precedence, which is the whole reason that
 * field exists — a plain link earns nothing on traffic this site sent.
 */
export const storeHref = (link: { url: string; affiliateUrl?: string | null }): string =>
  link.affiliateUrl?.trim() || link.url;

export const findProducts = async () => {
  const payload = await getPayloadClient();
  return payload.find({
    collection: "products",
    where: publishedOnly,
    // Featured first, then newest. Products have no manual ordering field.
    sort: ["-featured", "-createdAt"],
    limit: 200,
    depth: 1,
  });
};

export const findProductBySlug = async (slug: string): Promise<Product | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "products",
    where: { ...publishedOnly, slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
};
