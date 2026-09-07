import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";
import { getPayloadClient, publishedOnly } from "@/lib/payload";

/** "/" maps to the page with slug "home". */
const slugFrom = (segments?: string[]) =>
  !segments || segments.length === 0 ? "home" : segments.join("/");

const findPage = async (slug: string) => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "pages",
    where: { ...publishedOnly, slug: { equals: slug } },
    limit: 1,
    // Deep enough to populate uploads inside blocks and products in a grid.
    depth: 2,
  });
  return docs[0] ?? null;
};

export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "pages",
    where: publishedOnly,
    limit: 200,
    depth: 0,
    select: { slug: true },
  });

  return docs.map((d) => ({
    slug: d.slug === "home" ? [] : String(d.slug).split("/"),
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[[...slug]]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await findPage(slugFrom(slug));
  if (!page) return {};

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || undefined,
    robots: page.seo?.noIndex ? { index: false } : undefined,
  };
}

export default async function CatchAllPage({ params }: PageProps<"/[[...slug]]">) {
  const { slug } = await params;
  const page = await findPage(slugFrom(slug));

  if (!page) notFound();

  return <RenderBlocks blocks={page.sections} />;
}
