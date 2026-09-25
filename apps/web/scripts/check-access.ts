/**
 * Fails the build if a collection with drafts would serve them to the public.
 *
 * This guards a mistake already made once. Every collection was written with
 * `read: () => true`, which is correct for published content and also opens
 * REST and GraphQL to anonymous readers asking `?draft=true`. Unpublished work
 * was downloadable in full by anyone who guessed the query string, and nothing
 * about the site showed it: our own routes filter drafts, so every page looked
 * right.
 *
 * A comment would not have prevented the next occurrence. The natural way to
 * add a collection is to copy an existing one, so the safe default has to be
 * enforced somewhere that refuses to build rather than somewhere that hopes to
 * be read.
 *
 * It calls the access function rather than grepping for a pattern, so it judges
 * what the rule DOES. A rule written any number of ways passes if it withholds
 * drafts from an anonymous caller, and none passes if it does not.
 */
import configPromise from "../src/payload.config";

type AccessFn = (args: { req: { user: unknown } }) => unknown;

const anonymous = { req: { user: null } };
const problems: string[] = [];

const config = await configPromise;

for (const collection of config.collections) {
  const hasDrafts = Boolean(
    collection.versions && typeof collection.versions === "object" && collection.versions.drafts,
  );

  const read = collection.access?.read as AccessFn | undefined;

  if (hasDrafts) {
    if (!read) {
      problems.push(
        `${collection.slug}: has drafts but no read access rule, so Payload's default applies. ` +
          `Use publishedOrEditor from src/access.`,
      );
      continue;
    }

    // `true` means "everything, to anyone". For a drafts collection that is the
    // bug: it includes unpublished versions over REST and GraphQL.
    const result = await read(anonymous);
    if (result === true) {
      problems.push(
        `${collection.slug}: read access returns true for an anonymous caller, which serves ` +
          `DRAFTS over /api and GraphQL. Use publishedOrEditor from src/access.`,
      );
    }
  }

  // Writes should never be open to the public, drafts or not.
  for (const operation of ["create", "update", "delete"] as const) {
    const rule = collection.access?.[operation] as AccessFn | undefined;
    if (!rule) continue;
    if ((await rule(anonymous)) === true) {
      problems.push(
        `${collection.slug}: ${operation} access returns true for an anonymous caller.`,
      );
    }
  }
}

if (problems.length) {
  console.error("\n[access] REFUSING TO BUILD — public access is too broad:\n");
  for (const p of problems) console.error(`  • ${p}`);
  console.error(
    "\n  Anonymous read on a drafts collection exposes unpublished content through\n" +
      "  /api and /api/graphql, regardless of what the site's own pages filter.\n",
  );
  process.exit(1);
}

console.log(`[access] OK — ${config.collections.length} collections checked, none leak drafts`);
process.exit(0);
