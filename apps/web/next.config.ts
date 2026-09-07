import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

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
   * Bound the prerender worker pool.
   *
   * Next defaults to one worker per core — eleven on this machine — and each
   * builds its own Payload instance with its own database pool. Against
   * Supabase's 15-client session limit that exhausts connections partway
   * through prerendering and fails the build with a FATAL XX000, worse when a
   * dev server is running and holding its own pool.
   *
   * Four workers is still comfortably parallel for a site this size, and
   * leaves headroom for a dev server alongside a build. Payload's own pool
   * drops to one connection per process during the build phase; both limits
   * are needed, since either alone still exceeds the cap.
   */
  experimental: { cpus: 4 },

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
