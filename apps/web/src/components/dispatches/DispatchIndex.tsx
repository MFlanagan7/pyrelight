import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/core";
import { Pagination } from "@/components/navigation";
import { ContentCard } from "@/components/site";
import { dispatchPageHref, findDispatchPage } from "@/lib/dispatches";
import styles from "./DispatchIndex.module.css";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Shared by /dispatches and /dispatches/page/[page] so the two cannot drift.
 */
export async function DispatchIndex({ page }: { page: number }) {
  const result = await findDispatchPage(page);

  // A page number past the end is a 404, not an empty list — otherwise every
  // number crawls as a valid thin page.
  if (page > 1 && result.docs.length === 0) notFound();

  return (
    <main className={styles.main}>
      <SectionHeading
        eyebrow="Built in public"
        title="Dispatches"
        body="Notes from the work and from the world — what is being written, what is being cut, and why."
      />

      {result.docs.length === 0 ? (
        <p className={styles.empty}>
          Nothing published yet. The first dispatch is being written.
        </p>
      ) : (
        <>
          <div className={styles.grid}>
            {result.docs.map((d) => (
              <ContentCard
                key={d.id}
                href={`/dispatches/${d.slug}`}
                title={d.title}
                body={d.excerpt}
                tag={
                  d.publishedAt
                    ? dateFormat.format(new Date(d.publishedAt))
                    : undefined
                }
              />
            ))}
          </div>

          <div className={styles.pager}>
            <Pagination
              page={result.page ?? page}
              pages={result.totalPages}
              hrefFor={dispatchPageHref}
            />
          </div>
        </>
      )}
    </main>
  );
}
