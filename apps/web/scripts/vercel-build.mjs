/**
 * Vercel build entry point.
 *
 * Runs pending Payload migrations before building, for production and for the
 * staging branch only.
 *
 * Staging has to migrate, or it cannot do the one job it exists for: proving a
 * release before it goes live, schema changes included. That is only safe if
 * staging points at its OWN database — scope DATABASE_URI to the staging
 * environment in Vercel. Without that, a staging deploy would migrate
 * production, which is the failure this whole arrangement is meant to prevent.
 *
 * Pull-request previews deliberately do NOT migrate. They share whatever
 * database their environment points at, and a branch that is still being
 * reviewed must not reshape it. The consequence is that a preview needing a new
 * column fails until that migration reaches staging or production — a visible,
 * cheap failure, where a silently mutated schema is neither.
 *
 * The database host is printed before migrating. It is the one line in the
 * build log that answers "which database did this deploy just change?", and
 * credentials are stripped so the log stays safe to share.
 */
import { spawnSync } from "node:child_process";

const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: "inherit", shell: true });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

/** Host and database only — never the user or password. */
const describeDatabase = () => {
  const uri = process.env.DATABASE_URI;
  if (!uri) return "DATABASE_URI is not set";
  try {
    const url = new URL(uri);
    return `${url.hostname}:${url.port || "5432"}${url.pathname}`;
  } catch {
    return "unparseable";
  }
};

const env = process.env.VERCEL_ENV ?? "development";
const branch = process.env.VERCEL_GIT_COMMIT_REF ?? "unknown";

const isProduction = env === "production";
const isStaging = env !== "production" && branch === "staging";

console.log(`[build] environment=${env} branch=${branch}`);

if (isProduction || isStaging) {
  console.log(`[build] database: ${describeDatabase()}`);
  console.log(
    `[build] ${isProduction ? "production" : "staging"} deployment — applying migrations`,
  );
  run("pnpm", ["run", "migrate"]);
} else {
  console.log(
    `[build] ${env} deployment on "${branch}" — skipping migrations; building against the existing schema`,
  );
}

run("pnpm", ["run", "build"]);
