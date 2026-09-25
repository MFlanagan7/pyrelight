import type { CollectionConfig } from "payload";

/**
 * Draft versioning, shared by every collection that has drafts.
 *
 * AUTOSAVE IS WHAT MAKES LIVE PREVIEW LIVE. Payload's preview refreshes on a
 * document event, which is a save — not a keystroke. Without autosave an editor
 * has to press Save and reload to see anything, which is barely preview at all.
 * With it, Payload writes a draft version shortly after typing stops, the
 * document event fires, and the preview pane refreshes on its own.
 *
 * THE INTERVAL IS A DEBOUNCE, NOT A TIMER. Payload's own words: "document
 * updates are debounced at this interval". It fires once, 800ms after typing
 * STOPS — not every 800ms while typing. A paragraph written without pausing
 * produces one save, at the end.
 *
 * That is why this reads as aggressive and is not. Read as a timer it looks
 * like a write per keystroke; read correctly it is a write per pause, which is
 * roughly a write per field as an editor moves through a form.
 *
 * It is also not a data-loss safety net, where a minute would be sensible. It
 * is the lag between finishing a sentence and seeing it in the preview pane, so
 * a minute would mean typing, waiting a minute, then looking. 800ms is Payload's
 * default and the right order of magnitude; raise it to 2000 if the write
 * traffic to a database two thousand miles away ever becomes noticeable.
 *
 * `maxPerDoc` bounds what that costs. Autosave writes a version row every time
 * it fires, so a long editing session would otherwise leave hundreds of rows
 * behind permanently. Fifty keeps a real undo history — Payload prunes the
 * oldest beyond it — while keeping the versions table proportional to the
 * content rather than to the hours spent typing. Payload's default is 100; half
 * that is plenty for a site one person writes.
 */
export const draftsWithAutosave: CollectionConfig["versions"] = {
  drafts: {
    autosave: { interval: 800 },
  },
  maxPerDoc: 50,
};
