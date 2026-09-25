/**
 * Wraps a site path so the admin's Preview button goes through /preview.
 *
 * Pointing live preview straight at the real URL looks right and is useless:
 * the page filters on `_status: published`, so a draft 404s and an edited
 * published entry shows its last published state rather than the edit. The
 * detour sets the draft cookie first, and everything after it reads drafts.
 *
 * Kept in lib rather than inlined per collection so the query-string contract
 * lives beside the route that parses it — the two have to agree, and six
 * hand-written copies would eventually not.
 */
export const previewUrl = (path: string): string =>
  `/preview?path=${encodeURIComponent(path)}`;

/**
 * Resources are the one collection whose URL is not slug alone, so its preview
 * path needs the section too. A missing section yields /resources//<slug>,
 * which is a 404 rather than a redirect — deliberate, since silently previewing
 * the wrong page is worse than visibly previewing none.
 */
export const resourcePreviewUrl = (section?: string, slug?: string): string =>
  previewUrl(`/resources/${section ?? ""}/${slug ?? ""}`);
