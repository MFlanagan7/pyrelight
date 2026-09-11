import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

/**
 * Purge the Next cache when content changes.
 *
 * Because Payload runs inside the Next app, this is a direct function call —
 * no outbound webhook, no shared secret, no race between the CMS saving and the
 * site hearing about it. That is the main practical payoff of not running the
 * CMS as a separate server.
 *
 * next/cache is imported lazily: Payload's CLI (migrations, type generation)
 * runs outside the Next runtime, where importing it would throw.
 */
const purge = async (paths: string[]) => {
  try {
    const { revalidatePath } = await import("next/cache");
    for (const p of paths) revalidatePath(p);
  } catch {
    // Outside the Next runtime — nothing to revalidate.
  }
};

/**
 * @param indexPath  listing page, e.g. "/dispatches"
 * @param detailBase detail route prefix, e.g. "/dispatches" -> "/dispatches/<slug>"
 */
export const revalidateCollection = (
  indexPath: string,
  detailBase?: string,
): {
  afterChange: CollectionAfterChangeHook[];
  afterDelete: CollectionAfterDeleteHook[];
} => ({
  afterChange: [
    async ({ doc, previousDoc }) => {
      const paths = [indexPath];
      if (detailBase) {
        if (doc?.slug) paths.push(`${detailBase}/${doc.slug}`);
        // A renamed slug leaves the old URL cached, so purge that too.
        if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
          paths.push(`${detailBase}/${previousDoc.slug}`);
        }
      }
      await purge(paths);
      return doc;
    },
  ],
  afterDelete: [
    async ({ doc }) => {
      const paths = [indexPath];
      if (detailBase && doc?.slug) paths.push(`${detailBase}/${doc.slug}`);
      await purge(paths);
      return doc;
    },
  ],
});

/**
 * Pages are addressed by slug at the site root, with "home" mapping to "/".
 * A renamed slug purges its old path too.
 */
export const revalidatePages = (): {
  afterChange: CollectionAfterChangeHook[];
  afterDelete: CollectionAfterDeleteHook[];
} => {
  const pathFor = (slug?: string) =>
    !slug || slug === "home" ? "/" : `/${slug}`;

  return {
    afterChange: [
      async ({ doc, previousDoc }) => {
        const paths = [pathFor(doc?.slug)];
        if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
          paths.push(pathFor(previousDoc.slug));
        }
        await purge(paths);
        return doc;
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await purge([pathFor(doc?.slug)]);
        return doc;
      },
    ],
  };
};

/** Legal documents live at fixed routes named by their slug. */
export const revalidateLegal = (): {
  afterChange: CollectionAfterChangeHook[];
  afterDelete: CollectionAfterDeleteHook[];
} => ({
  afterChange: [
    async ({ doc, previousDoc }) => {
      const paths = [`/${doc?.slug}`];
      if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
        paths.push(`/${previousDoc.slug}`);
      }
      await purge(paths);
      return doc;
    },
  ],
  afterDelete: [
    async ({ doc }) => {
      await purge([`/${doc?.slug}`]);
      return doc;
    },
  ],
});

/**
 * Nav, footer and social links render on every page, so a change to site
 * settings invalidates the whole tree rather than any one path. The "layout"
 * type is what makes revalidatePath cascade to everything beneath it.
 */
export const revalidateSiteSettings = (): { afterChange: GlobalAfterChangeHook[] } => ({
  afterChange: [
    async ({ doc }) => {
      try {
        const { revalidatePath } = await import("next/cache");
        revalidatePath("/", "layout");
      } catch {
        // Outside the Next runtime — nothing to revalidate.
      }
      return doc;
    },
  ],
});

/**
 * Tag pages aggregate content from other collections, so they go stale when
 * that content changes rather than when the tag itself does.
 *
 * Purges the whole /tags subtree rather than the specific tags on the entry:
 * the document carries tag IDs, not slugs, so targeting would need a lookup per
 * save, and a removed tag's page needs purging too — which the new document no
 * longer names. Coarse and correct beats precise and wrong.
 */
export const revalidateTagPages = (): {
  afterChange: CollectionAfterChangeHook[];
  afterDelete: CollectionAfterDeleteHook[];
} => {
  const purgeTags = async () => {
    try {
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/tags", "layout");
    } catch {
      // Outside the Next runtime.
    }
  };

  return {
    afterChange: [async ({ doc }) => { await purgeTags(); return doc; }],
    afterDelete: [async ({ doc }) => { await purgeTags(); return doc; }],
  };
};
