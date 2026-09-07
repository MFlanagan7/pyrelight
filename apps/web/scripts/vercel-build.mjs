/**
 * Vercel build entry point.
 *
 * Runs pending Payload migrations before building, but ONLY for production
 * deployments.
 *
 * Preview deployments share DATABASE_URI with production unless a separate
 * database is configured per environment. Migrating from a preview would apply
 * a feature branch's schema changes to the live database the moment someone
 * opened a pull request — before the code using them shipped, and with no
 * obvious connection between the two events. Previews therefore build against
 * whatever schema production currently has.
 *
 * The consequence to know: a preview whose code needs a new column will fail
 * until that migration reaches production. That is the correct trade — a
 * broken preview is visible and cheap, a silently mutated production schema is
 * neither.
 */
import { spawnSync } from "node:child_process";

const run = (command, args) => {
  const result = spawnSync(command, args, { stdio: "inherit", shell: true });
  if (result.status !== 0) process.exit(result.status ?? 1);
};

const env = process.env.VERCEL_ENV ?? "development";

if (env === "production") {
  console.log("[build] production deployment — applying migrations");
  run("pnpm", ["run", "migrate"]);
} else {
  console.log(
    `[build] ${env} deployment — skipping migrations; building against the existing schema`,
  );
}

run("pnpm", ["run", "build"]);
