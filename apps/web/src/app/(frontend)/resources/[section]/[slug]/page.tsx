import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button, ImageFrame, Pill } from "@/components/core";
import { Callout } from "@/components/content";
import { Breadcrumbs } from "@/components/navigation";
import { DownloadForm } from "@/components/resources/DownloadForm";
import { TOOL_COMPONENTS } from "@/components/tools/registry";
import { RichText } from "@/components/RichText";
import { directDownloadUrl } from "@/actions/download";
import { attributionFor } from "@/lib/legal";
import { RESOURCE_SECTIONS, findResource, findResources } from "@/lib/resources";
import type { Media, Tag } from "@/payload-types";
import styles from "./page.module.css";

const asMedia = (v: number | Media | null | undefined): Media | null =>
  typeof v === "object" && v !== null ? v : null;

export async function generateStaticParams() {
  const { docs } = await findResources();
  return docs.map((r) => ({ section: String(r.section), slug: String(r.slug) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/[section]/[slug]">): Promise<Metadata> {
  const { section, slug } = await params;
  const resource = await findResource(section, slug);
  if (!resource) return {};

  return {
    title: resource.seo?.title || resource.title,
    description: resource.seo?.description || resource.summary,
    robots: resource.seo?.noIndex ? { index: false } : undefined,
    alternates: { canonical: `/resources/${resource.section}/${resource.slug}` },
  };
}

export default async function ResourcePage({
  params,
}: PageProps<"/resources/[section]/[slug]">) {
  const { section, slug } = await params;
  const resource = await findResource(section, slug);

  if (!resource) notFound();

  const meta = RESOURCE_SECTIONS.find((s) => s.slug === resource.section);
  const cover = asMedia(resource.cover);
  const tags = (resource.tags ?? []).filter(
    (t): t is Tag => typeof t === "object" && t !== null,
  );
  const attribution = attributionFor(resource.licence);

  // An ungated file still travels by signed link; only the form is skipped.
  const directUrl =
    resource.delivery === "file" && !resource.requireEmail
      ? await directDownloadUrl(resource.id)
      : null;

  const Tool =
    resource.delivery === "tool" && resource.toolKey
      ? TOOL_COMPONENTS[resource.toolKey]
      : undefined;

  return (
    <main className={styles.main}>
      <Breadcrumbs
        items={[
          { label: "Resources", href: "/resources" },
          { label: meta?.title ?? resource.section, href: `/resources/${resource.section}` },
          { label: resource.title },
        ]}
      />

      <h1 className={styles.title}>{resource.title}</h1>
      <p className={styles.summary}>{resource.summary}</p>

      {cover?.url && (
        <div className={styles.cover}>
          <ImageFrame ratio="16 / 9" scrim="caption">
            <Image
              src={cover.url}
              alt={cover.alt ?? ""}
              fill
              sizes="(max-width: 1180px) 100vw, 1180px"
              style={{ objectFit: "cover" }}
              priority
            />
          </ImageFrame>
        </div>
      )}

      <div className={styles.delivery}>
        {resource.delivery === "file" && resource.requireEmail && (
          <DownloadForm resourceId={resource.id} />
        )}

        {directUrl && (
          <Button href={directUrl} rel="noopener">
            Download
          </Button>
        )}

        {resource.delivery === "link" && resource.url && (
          <Button href={resource.url} rel="noopener noreferrer" target="_blank">
            Open on its home page
          </Button>
        )}

        {resource.delivery === "tool" &&
          (Tool ? (
            <div className={styles.tool}>
              <Tool />
            </div>
          ) : (
            /* A key with no component is a half-finished tool. Saying so beats
               rendering an empty panel that looks like a styling bug. */
            <Callout tone="note" label="Not ready yet">
              This generator is still being built. The page exists so it can be
              written about and linked; the tool itself lands shortly.
            </Callout>
          ))}
      </div>

      {resource.body && (
        <div className={styles.body}>
          <RichText data={resource.body} />
        </div>
      )}

      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Pill key={tag.id} href={`/tags/${tag.slug}`}>
              {tag.title}
            </Pill>
          ))}
        </div>
      )}

      {attribution && <p className={styles.licence}>{attribution}</p>}
    </main>
  );
}
