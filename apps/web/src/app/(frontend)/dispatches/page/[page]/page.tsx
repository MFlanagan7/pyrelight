import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { DispatchIndex } from "@/components/dispatches/DispatchIndex";
import { countDispatchPages, dispatchPageHref } from "@/lib/dispatches";

/**
 * Pages 2 and beyond. Page 1 stays at /dispatches so there is one canonical URL
 * for it — /dispatches/page/1 permanently redirects rather than serving a
 * duplicate.
 */
export async function generateStaticParams() {
  const pages = await countDispatchPages();
  return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

const parse = (value: string): number | null => {
  // Reject "01", "1.5", "-2" and similar so each page has exactly one URL.
  if (!/^[1-9]\d*$/.test(value)) return null;
  return Number(value);
};

export async function generateMetadata({
  params,
}: PageProps<"/dispatches/page/[page]">): Promise<Metadata> {
  const { page } = await params;
  const n = parse(page);
  if (!n) return {};

  return {
    title: `Dispatches — page ${n}`,
    description: "Notes from the work and from the world. Starfall, built in public.",
    alternates: { canonical: dispatchPageHref(n) },
  };
}

export default async function DispatchesPage({
  params,
}: PageProps<"/dispatches/page/[page]">) {
  const { page } = await params;
  const n = parse(page);

  if (!n) notFound();
  if (n === 1) permanentRedirect("/dispatches");

  return <DispatchIndex page={n} />;
}
