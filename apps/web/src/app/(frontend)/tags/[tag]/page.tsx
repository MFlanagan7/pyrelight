import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/core";
import { EmptyState } from "@/components/content";
import { ListGroup, ListRow } from "@/components/site";
import { findAllTags, findTagBySlug, findTaggedContent } from "@/lib/tags";
import styles from "./page.module.css";

const GROUP_LABEL: Record<string, string> = {
  subject: "Subject",
  type: "Type",
  system: "System",
};

export async function generateStaticParams() {
  const tags = await findAllTags();
  return tags.map((t) => ({ tag: String(t.slug) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tags/[tag]">): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = await findTagBySlug(slug);
  if (!tag) return {};

  return {
    title: tag.title,
    description: tag.description || `Everything across Starfall tagged ${tag.title}.`,
    alternates: { canonical: `/tags/${tag.slug}` },
  };
}

export default async function TagPage({ params }: PageProps<"/tags/[tag]">) {
  const { tag: slug } = await params;
  const tag = await findTagBySlug(slug);

  if (!tag) notFound();

  const results = await findTaggedContent(tag.id);
  const aliases = (tag.aliases ?? []).map((a) => a.alias).filter(Boolean);

  return (
    <main className={styles.main}>
      <SectionHeading
        eyebrow={GROUP_LABEL[tag.group] ?? "Tag"}
        title={tag.title}
        body={tag.description || undefined}
      />

      {/* Shown because a reader who searched an alias should see why they
          landed here, and because it tells an author the alias exists. */}
      {aliases.length > 0 && (
        <p className={styles.aliases}>Also known as {aliases.join(", ")}.</p>
      )}

      <div className={styles.results}>
        {results.length === 0 ? (
          <EmptyState
            title="Nothing carries this tag yet"
            body="The tag exists, but no published entry uses it. It will fill as the writing does."
          />
        ) : (
          <ListGroup>
            {results.map((r) => (
              <ListRow
                key={r.id}
                href={r.href}
                title={r.title}
                body={r.summary ?? undefined}
                meta={r.label}
              />
            ))}
          </ListGroup>
        )}
      </div>
    </main>
  );
}
