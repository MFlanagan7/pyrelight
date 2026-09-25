import { draftMode } from "next/headers";
import { RefreshOnSave } from "./RefreshOnSave";
import styles from "./DraftBanner.module.css";

/**
 * Says, on every page, that you are reading drafts.
 *
 * The danger of draft mode is not seeing a draft — that is the point — it is
 * forgetting. The cookie lasts the whole browser session and follows you across
 * the entire site, so without this an editor checks one entry, wanders off, and
 * spends an afternoon reviewing a version of the site nobody else can see.
 * Worse, they conclude something is published when it is not.
 *
 * A form rather than a link, because leaving draft mode changes what later
 * requests return, and a GET that does that can be fired by a prefetch or a
 * crawler. Server-rendered with no client JavaScript: an exit route that only
 * works once hydration completes is one that fails exactly when the page is
 * broken enough to need it.
 */
export async function DraftBanner() {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;

  return (
    <>
      {/* Only mounted here, so the listener never reaches a visitor. */}
      <RefreshOnSave />
      <div className={styles.banner} role="status">
        <span className={styles.text}>
          <strong>Draft preview.</strong> You are seeing unpublished content. Visitors are not.
        </span>
        <form action="/preview/exit" method="POST">
          <button type="submit" className={styles.exit}>
            Exit preview
          </button>
        </form>
      </div>
    </>
  );
}
