import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageFrame } from "@/components/core";
import { RichText } from "@/components/RichText";
import { getPayloadClient, publishedOnly } from "@/lib/payload";
import styles from "./page.module.css";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const findBySlug = async (slug: string) => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "dispatches",
    where: { ...publishedOnly, slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
};

export async function generateStaticParams() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "dispatches",
    where: publishedOnly,
    limit: 100,
    depth: 0,
    select: { slug: true },
  });
  return docs.map((d) => ({ slug: String(d.slug) }));
}

export async function generateMetadata({ params }: PageProps<"/dispatches/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = await findBySlug(slug);
  if (!doc) return {};

  return {
    title: doc.seo?.title || doc.title,
    description: doc.seo?.description || doc.excerpt || undefined,
    robots: doc.seo?.noIndex ? { index: false } : undefined,
  };
}

export default async function DispatchPage({ params }: PageProps<"/dispatches/[slug]">) {
  const { slug } = await params;
  const doc = await findBySlug(slug);

  if (!doc) notFound();

  const cover = typeof doc.cover === "object" && doc.cover !== null ? doc.cover : null;

  return (
    <main className={styles.main}>
      <article>
        {doc.publishedAt && (
          <p className={styles.meta}>{dateFormat.format(new Date(doc.publishedAt))}</p>
        )}
        <h1 className={styles.title}>{doc.title}</h1>
        {doc.excerpt && <p className={styles.excerpt}>{doc.excerpt}</p>}

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

        <div className={styles.body}>
          <RichText data={doc.body} />
        </div>
      </article>

      <Link href="/dispatches" className={styles.back}>
        ← All dispatches
      </Link>
    </main>
  );
}
