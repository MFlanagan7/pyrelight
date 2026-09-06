import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// withPayload wires Payload's admin bundle and server-only externals into the
// Next build. Payload must wrap the config, not the other way round.
export default withPayload(nextConfig, { devBundleServerPackages: false });
