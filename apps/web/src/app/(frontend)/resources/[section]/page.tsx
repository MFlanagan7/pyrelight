import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation";
import { EmptyState } from "@/components/content";
import { SectionHeading } from "@/components/core";
import { ListGroup, ListRow } from "@/components/site";
import { RESOURCE_SECTIONS, findResources, isResourceSection } from "@/lib/resources";
import styles from "../page.module.css";

const DELIVERY_LABEL: Record<string, string> = {
  file: "Download",
  link: "External",
  tool: "Tool",
};

export async function generateStaticParams() {
  return RESOURCE_SECTIONS.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/[section]">): Promise<Metadata> {
  const { section } = await params;
  const meta = RESOURCE_SECTIONS.find((s) => s.slug === section);
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.note,
    alternates: { canonical: `/resources/${meta.slug}` },
  };
}

export default async function ResourceSectionPage({
  params,
}: PageProps<"/resources/[section]">) {
  const { section } = await params;

  // Sections are a fixed list, so an unknown one is a 404 rather than an
  // empty listing that would crawl as a valid page.
  if (!isResourceSection(section)) notFound();

  const meta = RESOURCE_SECTIONS.find((s) => s.slug === section)!;
  const { docs } = await findResources(section);

  return (
    <main className={styles.main}>
      <Breadcrumbs
        items={[
          { label: "Resources", href: "/resources" },
          { label: meta.title },
        ]}
      />

      <SectionHeading eyebrow="Resources" title={meta.title} body={meta.note} />

      <div className={styles.list}>
        {docs.length === 0 ? (
          <EmptyState
            title="Nothing here yet"
            body={
              section === "tools"
                ? "Generators are being built. They will appear here as they land."
                : "This section is empty for now. New material lands alongside each release."
            }
          />
        ) : (
          <ListGroup>
            {docs.map((r) => (
              <ListRow
                key={r.id}
                href={`/resources/${r.section}/${r.slug}`}
                title={r.title}
                body={r.summary}
                meta={DELIVERY_LABEL[r.delivery]}
                trailing={r.delivery === "file" && !r.requireEmail ? "Free" : undefined}
              />
            ))}
          </ListGroup>
        )}
      </div>
    </main>
  );
}
