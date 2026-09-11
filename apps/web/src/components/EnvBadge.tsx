import styles from "./EnvBadge.module.css";

/**
 * Which environment and branch you are looking at.
 *
 * Shown on local, staging and preview builds; never in production. The values
 * are inlined at build time by next.config.ts, since VERCEL_GIT_* exists only
 * on the build machine and a serverless runtime cannot shell out to git.
 *
 * aria-hidden because it is an affordance for whoever is building the site, not
 * content. A screen reader announcing the branch name on every page would be
 * noise, and the information is meaningless to a visitor.
 */
export function EnvBadge() {
  const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

  // Production carries no badge. Anything unrecognised is treated as production
  // too — failing closed, so a misconfigured build cannot brand the live site.
  if (environment !== "local" && environment !== "staging" && environment !== "preview") {
    return null;
  }

  const branch = process.env.NEXT_PUBLIC_GIT_BRANCH || "unknown";
  const sha = process.env.NEXT_PUBLIC_GIT_SHA;

  return (
    <div
      aria-hidden="true"
      className={`${styles.badge} ${styles[environment]}`}
      data-environment={environment}
    >
      <span className={styles.label}>
        {environment} · {branch}
        {sha ? ` · ${sha}` : ""}
      </span>
    </div>
  );
}
