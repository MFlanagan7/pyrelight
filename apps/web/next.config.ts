import { execSync } from "node:child_process";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

/**
 * Which environment this build is for, and which branch it came from.
 *
 * Resolved at build time and inlined, because the browser has no other way to
 * know: VERCEL_GIT_* exist only on the build machine, and a serverless runtime
 * cannot shell out to git.
 *
 * Vercel calls every non-production deploy "preview". The staging branch is
 * singled out so it reads as staging rather than sharing a label with every
 * pull-request deploy.
 */
const localGit = (command: string): string | undefined => {
  try {
    return execSync(command, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    // Absent in CI, and a missing git must never fail the build.
    return undefined;
  }
};

const vercelEnv = process.env.VERCEL_ENV;
const branch =
  process.env.VERCEL_GIT_COMMIT_REF ?? localGit("git rev-parse --abbrev-ref HEAD") ?? "unknown";
const sha = (process.env.VERCEL_GIT_COMMIT_SHA ?? localGit("git rev-parse HEAD") ?? "").slice(0, 7);

const environment = !vercelEnv
  ? "local"
  : vercelEnv === "production"
    ? "production"
    : branch === "staging"
      ? "staging"
      : "preview";

/**
 * Supabase Storage hostname, derived from the S3 endpoint so there is one
 * source of truth. Public object URLs are served from <ref>.supabase.co, while
 * the S3 API lives on <ref>.storage.supabase.co — the same project, different
 * hosts, so the host cannot simply be reused.
 */
const supabaseHost = (): string | null => {
  const endpoint = process.env.S3_ENDPOINT;
  if (!endpoint) return null;
  try {
    const ref = new URL(endpoint).hostname.split(".")[0];
    return `${ref}.supabase.co`;
  } catch {
    return null;
  }
};

const host = supabaseHost();

const nextConfig: NextConfig = {
  /**
   * Inlined into the browser bundle, so only what the browser needs.
   *
   * The badge is the only consumer and it never renders in production, yet the
   * branch name and commit hash were being compiled into the production bundle
   * regardless — readable by anyone, useful to nobody. It is minor as
   * disclosures go, and it is also free to not do.
   *
   * The environment name stays in every build: the badge has to know it is
   * production in order to render nothing, and "production" is not a secret.
   */
  env: {
    NEXT_PUBLIC_ENVIRONMENT: environment,
    ...(environment === "production"
      ? {}
      : { NEXT_PUBLIC_GIT_BRANCH: branch, NEXT_PUBLIC_GIT_SHA: sha }),
  },

  /**
   * Bound the prerender worker pool.
   *
   * Next defaults to one worker per core — eleven on this machine — and each
   * builds its own Payload instance with its own database pool. Against
   * Supabase's 15-client session limit that exhausts connections partway
   * through prerendering and fails the build with a FATAL XX000, worse when a
   * dev server is running and holding its own pool.
   *
   * Four workers is still comfortably parallel for a site this size, and
   * leaves headroom for a dev server alongside a build. Each holds a pool of
   * five (see poolMax in payload.config.ts), so a build peaks around twenty
   * clients — fine for the transaction pooler, which allows far more, and over
   * the session pooler's cap, which is one more reason to stay on 6543.
   */
  experimental: { cpus: 4 },

  /**
   * Keep every non-production deployment out of search results.
   *
   * Stronger than the robots.txt rule beside it: a Disallow stops a crawl but
   * does not prevent a URL that something links to from being listed anyway,
   * whereas noindex removes it outright. Vercel sends this header on its own
   * *.vercel.app preview URLs, but not on a custom domain pointed at a branch —
   * which is exactly what staging will be.
   */
  async headers() {
    if (environment === "production") return [];
    return [
      {
        source: "/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  images: {
    // next/image refuses remote sources that are not explicitly allowed.
    // Without this, every CMS image 400s the moment the bucket serves public
    // URLs instead of streaming through Payload's own route.
    remotePatterns: host
      ? [{ protocol: "https", hostname: host, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
};

// withPayload wires Payload's admin bundle and server-only externals into the
// Next build. Payload must wrap the config, not the other way round.
export default withPayload(nextConfig, { devBundleServerPackages: false });
