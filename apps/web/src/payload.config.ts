import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { s3Storage } from "@payloadcms/storage-s3";

import { databaseSsl } from "./lib/db-ssl";
import { tlsAwareRetryStrategy } from "./lib/s3-retry";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Categories } from "./collections/Categories";
import { Dispatches } from "./collections/Dispatches";
import { Downloads } from "./collections/Downloads";
import { LegalDocuments } from "./collections/LegalDocuments";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Products } from "./collections/Products";
import { Resources } from "./collections/Resources";
import { Subscribers } from "./collections/Subscribers";
import { Tags } from "./collections/Tags";
import { Users } from "./collections/Users";
import { WikiArticles } from "./collections/wiki/Articles";
import { WikiFactions } from "./collections/wiki/Factions";
import { WikiGods } from "./collections/wiki/Gods";
import { WikiRegions } from "./collections/wiki/Regions";
import { SiteSettings } from "./globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * How many database connections this process may hold.
 *
 * Exactly ONE case wants a pool of one: a serverless request handler. Each
 * invocation is its own short-lived process, so a pool of N there becomes
 * N x concurrent invocations, and the pooler starts refusing connections.
 *
 * Every other case needs more than one, and for a reason that is easy to miss:
 * a pool of one cannot hold a transaction and run a query at the same time. It
 * deadlocks against itself, waits out connectionTimeoutMillis, and fails with
 * "timeout exceeded when trying to connect" — an error that names the network
 * for something the network had no part in.
 *
 * That is what broke production deploys. `payload migrate` runs as its own CLI
 * process where NEXT_PHASE is unset and VERCEL is set, so the old rule handed
 * it a pool of one; the migration runner holds a client for its transaction and
 * queries the migrations table beside it, and every deploy died at 15 seconds
 * with the network looking perfectly healthy in the preflight above it.
 *
 * So the test is "am I inside the Next server runtime", not "am I on Vercel".
 * NEXT_RUNTIME is set only in the bundled server, which is precisely the
 * distinction — a build worker or a CLI task never sees it.
 *
 * Point DATABASE_URI at Supabase's TRANSACTION pooler (6543) rather than the
 * session pooler (5432). The session pooler caps a tenant at 15 clients, which
 * a build's workers plus a dev server exceed; transaction mode is built for
 * many short-lived clients and handles migrations and transactions fine.
 */
const poolMax = (): number => {
  // Escape hatch, and what vercel-build.mjs sets for the migrate step so that
  // deploys never depend on the inference below being right.
  const override = Number(process.env.DATABASE_POOL_MAX);
  if (Number.isInteger(override) && override > 0) return override;

  // Checked first, and separately from NEXT_RUNTIME. A build's prerender
  // workers render many pages at once in one process and all queue on the
  // pool, so starving them reproduces the same self-inflicted timeout from the
  // other direction — and Next may well define NEXT_RUNTIME while bundling.
  if (process.env.NEXT_PHASE === "phase-production-build") return 5;

  return process.env.VERCEL && process.env.NEXT_RUNTIME ? 1 : 5;
};

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
    Resources,
    Categories,
    Tags,
    LegalDocuments,
    Media,
    Downloads,
    Subscribers,
    Users,
    // v2 — the wiki cluster
    WikiArticles,
    WikiRegions,
    WikiFactions,
    WikiGods,
  ],

  globals: [SiteSettings],

  /**
   * Media storage.
   *
   * Enabled only when the S3 credentials are present, so a fresh clone still
   * runs against local disk. In production it is mandatory: Vercel's serverless
   * runtime has no persistent filesystem, and uploads written to disk vanish
   * between invocations.
   *
   * Supabase Storage speaks the S3 protocol, so this uses Payload's official
   * S3 adapter rather than a community Supabase provider. forcePathStyle is
   * required — Supabase addresses buckets by path, not by virtual host.
   */
  plugins: process.env.S3_BUCKET
    ? [
        s3Storage({
          collections: {
            media: {
              /**
               * When the bucket is public, serve objects straight from
               * Supabase's CDN instead of streaming every image through a
               * serverless function.
               *
               * disablePayloadAccessControl is what actually stops the
               * proxying — without it Payload keeps serving files through its
               * own access-controlled route and generateFileURL is ignored. It
               * also means Payload no longer gates file reads, which is fine
               * for public site imagery and precisely why paid downloads must
               * live in a separate private bucket.
               */
              ...(process.env.S3_PUBLIC_BUCKET === "true"
                ? {
                    disablePayloadAccessControl: true as const,
                    generateFileURL: ({ filename, prefix }: { filename: string; prefix?: string }) => {
                      const ref = new URL(process.env.S3_ENDPOINT!).hostname.split(".")[0];
                      const key = [prefix, filename].filter(Boolean).join("/");
                      return `https://${ref}.supabase.co/storage/v1/object/public/${process.env.S3_BUCKET}/${key}`;
                    },
                  }
                : {}),
            },
          },
          bucket: process.env.S3_BUCKET,
          config: {
            endpoint: process.env.S3_ENDPOINT,
            region: process.env.S3_REGION,
            forcePathStyle: true,
            /**
             * maxAttempts alone was not enough. The SDK never classifies a TLS
             * integrity failure as retryable, so uploads died after one attempt
             * regardless of the value — the logs said "attempts": 1 while this
             * was set to 8. See lib/s3-retry.ts.
             *
             * Supplying a strategy replaces the SDK's retry behaviour outright,
             * so this one re-implements the default retryable conditions
             * alongside the TLS cases.
             */
            retryStrategy: tlsAwareRetryStrategy(8),
            credentials: {
              accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
              secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
            },
          },
        }),

        /**
         * Second instance for the private bucket. s3Storage handles one bucket
         * per call, and downloads need the opposite policy to media: no public
         * URL, no CDN, access only through a signed link that expires.
         *
         * Deliberately no generateFileURL and no disablePayloadAccessControl —
         * the two options that make media public are exactly what must not
         * apply here.
         */
        ...(process.env.S3_DOWNLOADS_BUCKET
          ? [
              s3Storage({
                collections: { downloads: true },
                bucket: process.env.S3_DOWNLOADS_BUCKET,
                config: {
                  endpoint: process.env.S3_ENDPOINT,
                  region: process.env.S3_REGION,
                  forcePathStyle: true,
                  retryStrategy: tlsAwareRetryStrategy(8),
                  credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
                  },
                },
              }),
            ]
          : []),
      ]
    : [],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,

      /**
       * Always encrypted; see lib/db-ssl.ts for why, and for how to turn on
       * verification with DATABASE_CA_CERT.
       */
      ssl: databaseSsl(),
      /**
       * Pool size — see poolMax below. Only a serverless request handler wants
       * a pool of one; everything else needs room to hold a transaction and
       * query at the same time.
       */
      max: poolMax(),
      idleTimeoutMillis: process.env.VERCEL ? 5_000 : 10_000,

      /**
       * Fail fast on a dead connection instead of hanging on one.
       *
       * Without these, a socket that dies without a clean close — which this
       * network does — stays in the pool looking healthy. The next query sent
       * over it blocks until the OS gives up on the TCP connection, which is
       * where the 31s list and 94s bulk delete came from. The same queries run
       * in well under a second from a fresh process.
       *
       * keepAlive makes the OS probe idle sockets so a dead one is detected and
       * discarded rather than handed out. The timeouts bound the damage when
       * one slips through: a request fails in seconds with a real error instead
       * of appearing to hang forever.
       */
      keepAlive: true,
      keepAliveInitialDelayMillis: 10_000,
      connectionTimeoutMillis: 15_000,
      // Client-side ceiling, and its server-side counterpart so an abandoned
      // query does not keep holding locks after the client has given up.
      query_timeout: 30_000,
      statement_timeout: 30_000,
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
            process.env.EMAIL_FROM_ADDRESS || "noreply@mail.pyrelightpress.com",
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
