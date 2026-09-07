import Image from "next/image";
import { Button, ImageFrame, QuoteBlock, ReadingPanel, SectionHeading, StatRow } from "@/components/core";
import { Callout, FaqAccordion } from "@/components/content";
import {
  ContentCard,
  Hero,
  NewsletterForm,
  ProductCard,
  StartHereStrip,
} from "@/components/site";
import { RichText } from "@/components/RichText";
import type { Media, Page, Product } from "@/payload-types";
import styles from "./RenderBlocks.module.css";

type Block = NonNullable<Page["sections"]>[number];

/**
 * Upload and relationship fields come back as an id when the query depth is too
 * shallow to populate them. Narrow to the object form, or nothing.
 */
const asMedia = (v: number | Media | null | undefined): Media | null =>
  typeof v === "object" && v !== null ? v : null;

const asProduct = (v: number | Product): Product | null =>
  typeof v === "object" && v !== null ? v : null;

const TIER_LABEL: Record<string, string> = {
  free: "Free",
  pwyw: "Pay what you want",
  premium: "Premium",
};

function MediaImage({ media, sizes, priority }: { media: Media; sizes: string; priority?: boolean }) {
  if (!media.url) return null;
  return (
    <Image
      src={media.url}
      alt={media.alt ?? ""}
      fill
      sizes={sizes}
      style={{ objectFit: "cover" }}
      priority={priority}
    />
  );
}

/** One section. Split out so the switch stays readable. */
function RenderBlock({ block }: { block: Block }) {
  switch (block.blockType) {
    case "hero": {
      const art = asMedia(block.background);
      return (
        <Hero
          eyebrow={block.eyebrow}
          title={block.title}
          lede={block.lede}
          art={art ? <MediaImage media={art} sizes="100vw" priority /> : null}
          actions={block.actions?.map((a) => (
            <Button key={a.href} href={a.href} variant={a.variant ?? "primary"}>
              {a.label}
            </Button>
          ))}
        />
      );
    }

    case "sectionIntro":
      return (
        <section className={styles.section}>
          <div className={styles.inner}>
            <SectionHeading
              eyebrow={block.eyebrow}
              title={block.title}
              body={block.body}
              align={block.align ?? "left"}
              action={
                block.actionLabel && block.actionHref ? (
                  <Button variant="quiet" href={block.actionHref}>
                    {block.actionLabel}
                  </Button>
                ) : undefined
              }
            />
          </div>
        </section>
      );

    case "statRow":
      return (
        <section className={`${styles.section} ${styles.tight}`}>
          <div className={styles.inner}>
            <StatRow items={(block.items ?? []).map((i) => ({ n: i.n, label: i.label }))} />
          </div>
        </section>
      );

    case "cardGrid":
      return (
        <section className={styles.section}>
          <div className={styles.inner}>
            {block.title && <SectionHeading eyebrow={block.eyebrow} title={block.title} />}
            <div className={`${styles.grid} ${block.title ? styles.afterHeading : ""}`}>
              {block.cards?.map((c) => {
                const img = asMedia(c.image);
                return (
                  <ContentCard
                    key={c.title}
                    href={c.href ?? undefined}
                    title={c.title}
                    body={c.body}
                    image={
                      img ? (
                        <MediaImage
                          media={img}
                          sizes="(max-width: 768px) 100vw, 380px"
                        />
                      ) : null
                    }
                  />
                );
              })}
            </div>
          </div>
        </section>
      );

    case "productGrid": {
      const products = (block.products ?? [])
        .map(asProduct)
        .filter((p): p is Product => p !== null);

      return (
        <section className={styles.section}>
          <div className={styles.inner}>
            {block.title && <SectionHeading eyebrow={block.eyebrow} title={block.title} />}
            <div className={`${styles.coverGrid} ${block.title ? styles.afterHeading : ""}`}>
              {products.map((p) => {
                const cover = asMedia(p.cover);
                return (
                  <ProductCard
                    key={p.id}
                    href={`/shop/${p.slug}`}
                    title={p.title}
                    meta={TIER_LABEL[p.tier] ?? undefined}
                    tone={p.tier === "free" ? "free" : "premium"}
                    badge={p.tier === "free" ? "Free" : undefined}
                    cover={
                      cover ? (
                        <MediaImage media={cover} sizes="(max-width: 768px) 50vw, 260px" />
                      ) : null
                    }
                  />
                );
              })}
            </div>
          </div>
        </section>
      );
    }

    case "startHere":
      return (
        <section className={`${styles.section} ${styles.overlap}`}>
          <StartHereStrip
            items={(block.items ?? []).map((i) => ({
              kicker: i.kicker,
              title: i.title,
              body: i.body,
              href: i.href,
            }))}
          />
        </section>
      );

    case "readingPanel":
      return (
        <section className={styles.section}>
          <div className={styles.inner}>
            <ReadingPanel meta={block.meta} title={block.title}>
              {block.body && <RichText data={block.body} />}
            </ReadingPanel>
          </div>
        </section>
      );

    case "quote":
      return (
        <section className={`${styles.section} ${styles.tight}`}>
          <div className={styles.inner}>
            <QuoteBlock quote={block.quote} attribution={block.attribution} />
          </div>
        </section>
      );

    case "callout":
      return (
        <section className={`${styles.section} ${styles.tight}`}>
          <div className={styles.inner}>
            <Callout tone={block.tone ?? "note"} label={block.label}>
              <RichText data={block.body} />
            </Callout>
          </div>
        </section>
      );

    case "faq":
      return (
        <section className={styles.section}>
          <div className={styles.inner}>
            {block.title && <SectionHeading title={block.title} />}
            <div className={block.title ? styles.afterHeading : undefined}>
              <FaqAccordion
                items={(block.items ?? []).map((i) => ({
                  question: i.question,
                  answer: <RichText data={i.answer} />,
                }))}
              />
            </div>
          </div>
        </section>
      );

    case "gallery":
      return (
        <section className={styles.section}>
          <div className={styles.inner}>
            {block.title && <SectionHeading eyebrow={block.eyebrow} title={block.title} />}
            <div className={`${styles.grid} ${block.title ? styles.afterHeading : ""}`}>
              {block.images?.map((row, i) => {
                const img = asMedia(row.image);
                if (!img) return null;
                return (
                  <figure key={img.id ?? i}>
                    <ImageFrame ratio="4 / 3" scrim="caption">
                      <MediaImage media={img} sizes="(max-width: 768px) 100vw, 380px" />
                    </ImageFrame>
                    {row.caption && <figcaption className={styles.caption}>{row.caption}</figcaption>}
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      );

    case "newsletter":
      return (
        <section className={styles.section}>
          <div className={`${styles.inner} ${styles.newsletter}`}>
            {block.title && <h2 className={styles.newsletterTitle}>{block.title}</h2>}
            {block.body && <p className={styles.newsletterBody}>{block.body}</p>}
            <NewsletterForm confirmation={block.confirmation} source="page" />
          </div>
        </section>
      );

    default: {
      // Exhaustiveness guard: adding a block without a case here fails the build
      // rather than silently rendering nothing.
      const _never: never = block;
      void _never;
      return null;
    }
  }
}

export function RenderBlocks({ blocks }: { blocks?: Page["sections"] }) {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((block) => (
        <RenderBlock key={block.id ?? `${block.blockType}`} block={block} />
      ))}
    </>
  );
}
