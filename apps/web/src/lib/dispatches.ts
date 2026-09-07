import { getPayloadClient, publishedOnly } from "./payload";

/** Entries per page on the Dispatches index. */
export const DISPATCHES_PER_PAGE = 12;

/** Page 1 lives at /dispatches; later pages at /dispatches/page/N. Keeping one
 *  canonical URL for page 1 avoids duplicate content at /dispatches/page/1. */
export const dispatchPageHref = (page: number) =>
  page <= 1 ? "/dispatches" : `/dispatches/page/${page}`;

export const findDispatchPage = async (page: number) => {
  const payload = await getPayloadClient();
  return payload.find({
    collection: "dispatches",
    where: publishedOnly,
    sort: "-publishedAt",
    limit: DISPATCHES_PER_PAGE,
    page,
    depth: 1,
  });
};

/** Total pages, for generateStaticParams and out-of-range checks. */
export const countDispatchPages = async (): Promise<number> => {
  const payload = await getPayloadClient();
  const { totalDocs } = await payload.count({
    collection: "dispatches",
    where: publishedOnly,
  });
  return Math.max(1, Math.ceil(totalDocs / DISPATCHES_PER_PAGE));
};
