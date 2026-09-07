import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Categories } from "./collections/Categories";
import { Dispatches } from "./collections/Dispatches";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Products } from "./collections/Products";
import { Subscribers } from "./collections/Subscribers";
import { Users } from "./collections/Users";
import { WikiArticles } from "./collections/wiki/Articles";
import { WikiFactions } from "./collections/wiki/Factions";
import { WikiGods } from "./collections/wiki/Gods";
import { WikiRegions } from "./collections/wiki/Regions";
import { SiteSettings } from "./globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: "· Pyrelight Press",
    },
  },

  collections: [
    // v1
    Pages,
    Dispatches,
    Products,
    Categories,
    Media,
    Subscribers,
    Users,
    // v2 — the wiki cluster
    WikiArticles,
    WikiRegions,
    WikiFactions,
    WikiGods,
  ],

  globals: [SiteSettings],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
      /**
       * Supabase's session pooler caps a tenant at 15 concurrent clients.
       * Drizzle's schema introspection opens connections aggressively and will
       * exhaust that, failing mid-run and leaving the schema half-applied.
       * Cap our own pool well under the ceiling.
       *
       * On Vercel's serverless runtime use the transaction pooler (6543) and
       * max: 1 instead — each invocation is its own short-lived process.
       */
      max: 5,
      idleTimeoutMillis: 10_000,
    },

    /**
     * Schema changes go through migrations, not dev push.
     *
     * Push introspects the whole database on boot, cannot survive the
     * connection limit above, and prompts interactively on stdin whenever a
     * field is renamed — which blocks the dev server with no visible cause.
     * Migrations are deterministic, reviewable in git, and identical in dev and
     * production. Run `pnpm cms migrate:create` after changing a collection.
     */
    push: false,
    // Keep Payload's ~30 tables out of `public`. Supabase auto-exposes `public`
    // through PostgREST, so putting CMS tables there would publish the entire
    // content model — drafts and all — on the project's REST API.
    schemaName: "payload",
  }),

  sharp,

  /**
   * Transactional email — admin password resets, and editor invites later.
   *
   * Only configured when RESEND_API_KEY is present. Without it Payload logs
   * mail to the console, which is fine locally but a lockout risk in
   * production: a forgotten admin password would send its reset link to a
   * serverless log nobody reads.
   *
   * Resend's HTTP API rather than SMTP, because serverless runtimes handle
   * outbound SMTP poorly and some hosts block the ports outright.
   */
  ...(process.env.RESEND_API_KEY
    ? {
        email: resendAdapter({
          apiKey: process.env.RESEND_API_KEY,
          defaultFromAddress:
            process.env.EMAIL_FROM_ADDRESS || "noreply@pyrelightpress.com",
          defaultFromName: process.env.EMAIL_FROM_NAME || "Pyrelight Press",
        }),
      }
    : {}),

  secret: process.env.PAYLOAD_SECRET || "",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  // Blocks are referenced by several collections; naming them here keeps a
  // single generated interface per block instead of one per usage.
  telemetry: false,
});
