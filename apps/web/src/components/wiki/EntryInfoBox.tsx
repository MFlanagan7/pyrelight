import Image from "next/image";
import { InfoBox, type InfoBoxRow } from "@/components/content";
import type { Media } from "@/payload-types";

const asMedia = (v: unknown): Media | null =>
  typeof v === "object" && v !== null && "url" in (v as Media) ? (v as Media) : null;

const titleOf = (v: unknown): string | null =>
  typeof v === "object" && v !== null && "title" in (v as { title?: string })
    ? ((v as { title?: string }).title ?? null)
    : null;

const GOD_STATUS: Record<string, string> = {
  ascendant: "Ascendant",
  stranded: "Stranded",
  dead: "Dead",
  unknown: "Unknown",
};

const FACTION_KIND: Record<string, string> = {
  house: "Noble house",
  order: "Order",
  guild: "Guild",
  cult: "Cult",
  other: "Other",
};

/**
 * The summary rail beside a wiki entry.
 *
 * Rows differ by collection because the subjects do — a god has a status and
 * domains, a faction a seat and a motto, a region its terrain. Rendering one
 * generic shape for all four would either omit what matters or show empty rows
 * for fields that do not apply.
 *
 * Rows with no value are dropped rather than shown blank: an info box listing
 * "Motto: —" tells a reader nothing except that the page is unfinished.
 */
export function EntryInfoBox({
  collection,
  doc,
}: {
  collection: string;
  doc: Record<string, unknown>;
}) {
  const rows: InfoBoxRow[] = [];
  let image: Media | null = null;

  if (collection === "wiki-gods") {
    image = asMedia(doc.symbol);
    if (doc.epithet) rows.push({ label: "Known as", value: String(doc.epithet) });
    if (doc.divineStatus)
      rows.push({ label: "Status", value: GOD_STATUS[String(doc.divineStatus)] ?? String(doc.divineStatus) });
    const domains = (doc.domains as { domain?: string }[] | undefined)
      ?.map((d) => d.domain)
      .filter(Boolean);
    if (domains?.length) rows.push({ label: "Domains", value: domains.join(", ") });
    const worshipped = (doc.worshippedIn as unknown[] | undefined)
      ?.map(titleOf)
      .filter(Boolean);
    if (worshipped?.length) rows.push({ label: "Worshipped in", value: worshipped.join(", ") });
  }

  if (collection === "wiki-factions") {
    image = asMedia(doc.sigil);
    if (doc.kind)
      rows.push({ label: "Kind", value: FACTION_KIND[String(doc.kind)] ?? String(doc.kind) });
    if (doc.seat) rows.push({ label: "Seat", value: String(doc.seat) });
    if (doc.motto) rows.push({ label: "Motto", value: String(doc.motto) });
    const region = titleOf(doc.region);
    if (region) rows.push({ label: "Region", value: region });
  }

  if (collection === "wiki-regions") {
    image = asMedia(doc.map);
    if (doc.terrain) rows.push({ label: "Terrain", value: String(doc.terrain) });
    const locations = (doc.locations as unknown[] | undefined)?.length ?? 0;
    if (locations > 0)
      rows.push({ label: "Keyed locations", value: String(locations) });
    const factions = (doc.factions as unknown[] | undefined)?.map(titleOf).filter(Boolean);
    if (factions?.length) rows.push({ label: "Powers", value: factions.join(", ") });
  }

  // Nothing worth a rail — an empty box is worse than no box.
  if (rows.length === 0 && !image) return null;

  return (
    <InfoBox
      title={String(doc.title ?? "")}
      rows={rows}
      image={
        image?.url ? (
          <Image
            src={image.url}
            alt={image.alt ?? ""}
            fill
            sizes="(max-width: 60rem) 100vw, 20rem"
            style={{ objectFit: "cover" }}
          />
        ) : undefined
      }
    />
  );
}
