import type { Resource } from "@/payload-types";
import { getPayloadClient, publishedOnly } from "./payload";

/** Library sections, in the order the IA lists them. Also the URL segments. */
export const RESOURCE_SECTIONS = [
  { slug: "maps", title: "Maps", note: "Battlemaps, region maps, VTT-ready files." },
  { slug: "adventures", title: "Adventures", note: "One-shots, encounters, full modules." },
  { slug: "tools", title: "Tools & generators", note: "Interactive generators, built for the table." },
  { slug: "guides", title: "Guides", note: "How to run Primvok, seafaring, intrigue, nobility." },
  { slug: "templates", title: "Templates & handouts", note: "Sheets, session templates, printable aids." },
] as const;

export type ResourceSection = (typeof RESOURCE_SECTIONS)[number]["slug"];

export const isResourceSection = (value: string): value is ResourceSection =>
  RESOURCE_SECTIONS.some((s) => s.slug === value);

export const findResources = async (section?: string) => {
  const payload = await getPayloadClient();
  return payload.find({
    collection: "resources",
    where: section ? { ...publishedOnly, section: { equals: section } } : publishedOnly,
    sort: "-createdAt",
    limit: 200,
    depth: 1,
  });
};

export const findResource = async (
  section: string,
  slug: string,
): Promise<Resource | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "resources",
    // Section is matched as well as slug so a resource cannot be reached from
    // the wrong section's URL, which would be two URLs for one page.
    where: { ...publishedOnly, section: { equals: section }, slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  return docs[0] ?? null;
};

export const countBySection = async (): Promise<Record<string, number>> => {
  const payload = await getPayloadClient();
  const entries = await Promise.all(
    RESOURCE_SECTIONS.map(async (s) => {
      const { totalDocs } = await payload.count({
        collection: "resources",
        where: { ...publishedOnly, section: { equals: s.slug } },
      });
      return [s.slug, totalDocs] as const;
    }),
  );
  return Object.fromEntries(entries);
};
