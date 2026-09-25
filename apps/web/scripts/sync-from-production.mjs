/**
 * Replaces staging's content with production's, so staging tests real data.
 *
 * Copies in ONE direction only, production to staging, and refuses to run any
 * other way. There is no legitimate reason to push staging's content at
 * production, and every reason to make that impossible rather than careful.
 *
 * Replacing rather than merging is deliberate. The point of staging is to be
 * indistinguishable from production, and a half-copied database is a third
 * environment that resembles neither. So yes, this overwrites staging's admin
 * user and its Site Settings — that is the feature. Afterwards you sign in to
 * staging with your PRODUCTION credentials, because password hashes travel with
 * the row and do not depend on PAYLOAD_SECRET.
 *
 *   pnpm sync:from-production              # dry run, changes nothing
 *   pnpm sync:from-production --yes        # do it
 *   pnpm sync:from-production --db --yes   # database only
 *
 * SCHEMA DOES NOT TRAVEL. Only rows do. Structure moves in one direction only,
 * forward through migrations, local to staging to production, so that every
 * change to it is a reviewable file in git. An earlier version of this script
 * copied the whole schema and would have quietly reverted whatever staging was
 * testing; `payload_migrations` is now excluded outright, because copying it is
 * worse still — the target would report production's migration state while its
 * tables were actually ahead, and the next migrate would find nothing to do.
 *
 * It refuses to run when the target is BEHIND production, since rows cannot be
 * written into a schema that predates them. Ahead is normal and expected.
 *
 * Requires pg_dump and psql on PATH (PostgreSQL client tools). `npx supabase db
 * dump` bundles the same binaries if you would rather not install them.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import pg from "pg";

import {
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const args = new Set(process.argv.slice(2));
const commit = args.has("--yes");
const doDb = args.has("--db") || !(args.has("--storage") || args.has("--db"));
const doStorage = args.has("--storage") || !(args.has("--storage") || args.has("--db"));

const fail = (message) => {
  console.error(`\n[sync] ABORTED: ${message}\n`);
  process.exit(1);
};

/** Supabase puts the project reference in the pooler username, not the host. */
const projectRef = (uri) => {
  const user = decodeURIComponent(new URL(uri).username);
  return user.includes(".") ? user.split(".")[1] : user;
};

/**
 * pg_dump needs a real session. The transaction pooler on 6543 multiplexes
 * statements across backends and cannot hold one, so dumps fail there in ways
 * that look like corruption rather than configuration.
 */
const toSessionPooler = (uri) => {
  const url = new URL(uri);
  if (url.port === "6543") url.port = "5432";
  return url.toString();
};

const source = process.env.PRODUCTION_DATABASE_URI;
const target = process.env.DATABASE_URI;

if (!source) fail("PRODUCTION_DATABASE_URI is not set. See .env.example.");
if (!target) fail("DATABASE_URI is not set.");

const sourceRef = projectRef(source);
const targetRef = projectRef(target);

// The guard that matters. Everything else here is convenience.
if (sourceRef === targetRef) {
  fail(
    `source and target are the same project (${sourceRef}). ` +
      "This would restore production over itself.",
  );
}

console.log(`[sync] from ${sourceRef} (production)`);
console.log(`[sync]   to ${targetRef} (target)`);
console.log(`[sync] mode: ${commit ? "COMMIT — this will overwrite" : "dry run"}`);

/**
 * Finds pg_dump and psql, whether or not anyone put them on PATH.
 *
 * Windows installers routinely do not, and the resulting "not found" sends
 * people off editing environment variables to fix a thing that is already
 * installed and sitting in a predictable place. So look there before giving up.
 *
 * Highest version wins, because pg_dump must be at least as new as the server
 * it dumps. Older refuses outright; newer is fine.
 *
 * PG_BIN overrides all of it, for an install somewhere unusual.
 */
const resolveTool = (tool) => {
  const onPath = spawnSync(tool, ["--version"], { shell: true, stdio: "pipe" });
  if (onPath.status === 0) return tool;

  const roots = [
    process.env.PG_BIN,
    ...["C:/Program Files/PostgreSQL", "C:/Program Files (x86)/PostgreSQL"].flatMap((base) => {
      try {
        return readdirSync(base)
          .filter((name) => /^\d+$/.test(name))
          .sort((a, b) => Number(b) - Number(a))
          .map((version) => path.join(base, version, "bin"));
      } catch {
        return [];
      }
    }),
    "/usr/local/bin",
    "/opt/homebrew/bin",
  ].filter(Boolean);

  for (const dir of roots) {
    for (const name of [`${tool}.exe`, tool]) {
      const candidate = path.join(dir, name);
      if (existsSync(candidate)) {
        console.log(`[sync] using ${candidate}`);
        return candidate;
      }
    }
  }

  fail(
    `${tool} could not be found, on PATH or in the usual install locations. ` +
      "Install the PostgreSQL client tools — on Windows the EDB installer can install " +
      "Command Line Tools alone, without a server — or set PG_BIN to the folder holding them.",
  );
};

/**
 * Schema only ever moves forward, through migrations. This copies DATA.
 *
 * Copying schema backwards would undo the thing migrations exist to guarantee.
 * Staging is frequently AHEAD of production — that is what staging is for — and
 * restoring production's structure over it silently reverts whatever was being
 * tested, including the payload_migrations rows that would otherwise reveal it.
 *
 * So `payload_migrations` is excluded outright. Copying it is worse than
 * copying schema: staging would report itself at production's migration state
 * while its tables were still ahead, and the next `pnpm migrate` would believe
 * there was nothing to do.
 */
const migrationNames = async (uri) => {
  const client = new pg.Client({
    connectionString: uri,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15_000,
  });
  await client.connect();
  try {
    const { rows } = await client.query(`select name from "payload"."payload_migrations"`);
    return new Set(rows.map((r) => r.name));
  } finally {
    await client.end();
  }
};

/**
 * Refuses to copy production's rows into a schema too old to hold them.
 *
 * Staging ahead of production is normal and fine. Staging BEHIND production
 * means a column exists in the data that does not exist in the target, and the
 * restore fails partway, leaving a half-populated database that looks merely
 * odd rather than broken.
 */
const checkSchemaOrder = async () => {
  const [ahead, behind] = await Promise.all([migrationNames(source), migrationNames(target)]);

  const missing = [...ahead].filter((name) => !behind.has(name));
  const extra = [...behind].filter((name) => !ahead.has(name));

  if (missing.length) {
    fail(
      `the target is BEHIND production by ${missing.length} migration(s):\n` +
        missing.map((n) => `    ${n}`).join("\n") +
        "\n  Deploy or run `pnpm migrate` against the target first. Data cannot be " +
        "copied into a schema that predates it.",
    );
  }

  console.log(
    extra.length
      ? `[sync] target is ahead by ${extra.length} migration(s) — fine, its schema is kept`
      : "[sync] schemas match",
  );
};

const syncDatabase = async () => {
  console.log("\n[sync] === database ===");
  const pgDump = resolveTool("pg_dump");
  const psql = resolveTool("psql");

  await checkSchemaOrder();

  if (!commit) {
    console.log("[sync] would copy DATA only — every table's rows, schema untouched");
    console.log("[sync] would exclude payload_migrations, so the target keeps its own state");
    console.log("[sync] would first empty the target's tables, including its admin user");
    return;
  }

  const dir = mkdtempSync(path.join(tmpdir(), "pyrelight-sync-"));
  const dump = path.join(dir, "payload-data.sql");

  try {
    console.log("[sync] dumping data...");
    const dumped = spawnSync(
      `"${pgDump}"`,
      [
        `"${toSessionPooler(source)}"`,
        "--schema=payload",
        "--data-only",
        // The one table that must not travel. See above.
        "--exclude-table-data=payload.payload_migrations",
        // The target's roles differ from production's, and restoring ownership
        // it cannot grant turns a working copy into a pile of permission errors.
        "--no-owner",
        "--no-privileges",
        "-f",
        `"${dump}"`,
      ],
      { shell: true, stdio: "inherit" },
    );
    if (dumped.status !== 0) fail("pg_dump failed");

    /**
     * --data-only appends, so the target has to be emptied first or every row
     * collides on its primary key. One TRUNCATE across all tables at once,
     * because doing them individually would fail on foreign keys no matter what
     * order they were attempted in.
     */
    console.log("[sync] emptying the target...");
    const truncate = `
      DO $$
      DECLARE tables text;
      BEGIN
        SELECT string_agg(format('%I.%I', schemaname, tablename), ', ')
          INTO tables
          FROM pg_tables
         WHERE schemaname = 'payload'
           AND tablename <> 'payload_migrations';
        IF tables IS NOT NULL THEN
          EXECUTE 'TRUNCATE TABLE ' || tables || ' RESTART IDENTITY CASCADE';
        END IF;
      END $$;`;

    const emptied = spawnSync(
      `"${psql}"`,
      [`"${toSessionPooler(target)}"`, "-v", "ON_ERROR_STOP=1", "-c", `"${truncate.replace(/\s+/g, " ").trim()}"`],
      { shell: true, stdio: "inherit" },
    );
    if (emptied.status !== 0) fail("could not empty the target");

    console.log("[sync] restoring data...");
    const restored = spawnSync(
      `"${psql}"`,
      [`"${toSessionPooler(target)}"`, "-v", "ON_ERROR_STOP=1", "-f", `"${dump}"`],
      { shell: true, stdio: "inherit" },
    );
    if (restored.status !== 0) fail("psql restore failed — the target may be half-written");

    console.log("[sync] data replaced; the target keeps its own schema and migration state");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
};

const clientFor = (endpoint, region, keyId, secret) =>
  new S3Client({
    endpoint,
    region,
    forcePathStyle: true,
    credentials: { accessKeyId: keyId, secretAccessKey: secret },
  });

const syncBucket = async (from, to, bucket) => {
  console.log(`\n[sync] bucket ${bucket}`);

  let token;
  let copied = 0;
  let skipped = 0;
  let total = 0;

  do {
    const listed = await from.send(
      new ListObjectsV2Command({ Bucket: bucket, ContinuationToken: token }),
    );
    token = listed.IsTruncated ? listed.NextContinuationToken : undefined;

    for (const object of listed.Contents ?? []) {
      total += 1;

      // Same key and same size is treated as already copied. Cheap, and wrong
      // only if a file was replaced by one of identical length.
      try {
        const existing = await to.send(
          new HeadObjectCommand({ Bucket: bucket, Key: object.Key }),
        );
        // Coerced, because a zero-byte object comes back with ContentLength
        // absent rather than 0, and `undefined === 0` is false — which quietly
        // re-copied Supabase's folder placeholder on every run.
        if ((existing.ContentLength ?? 0) === (object.Size ?? 0)) {
          skipped += 1;
          continue;
        }
      } catch {
        // Not there. Copy it.
      }

      if (!commit) {
        copied += 1;
        continue;
      }

      const body = await from.send(new GetObjectCommand({ Bucket: bucket, Key: object.Key }));
      await to.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: object.Key,
          Body: Buffer.from(await body.Body.transformToByteArray()),
          ContentType: body.ContentType,
        }),
      );
      copied += 1;
    }
  } while (token);

  console.log(
    `[sync] ${bucket}: ${total} objects, ${copied} ${commit ? "copied" : "would copy"}, ${skipped} already present`,
  );
};

const syncStorage = async () => {
  console.log("\n[sync] === storage ===");

  const required = [
    "PRODUCTION_S3_ENDPOINT",
    "PRODUCTION_S3_REGION",
    "PRODUCTION_S3_ACCESS_KEY_ID",
    "PRODUCTION_S3_SECRET_ACCESS_KEY",
    "S3_ENDPOINT",
    "S3_REGION",
    "S3_ACCESS_KEY_ID",
    "S3_SECRET_ACCESS_KEY",
  ].filter((name) => !process.env[name]);

  if (required.length) fail(`missing ${required.join(", ")}`);

  if (process.env.PRODUCTION_S3_ENDPOINT === process.env.S3_ENDPOINT) {
    fail("production and target storage endpoints are identical");
  }

  const from = clientFor(
    process.env.PRODUCTION_S3_ENDPOINT,
    process.env.PRODUCTION_S3_REGION,
    process.env.PRODUCTION_S3_ACCESS_KEY_ID,
    process.env.PRODUCTION_S3_SECRET_ACCESS_KEY,
  );
  const to = clientFor(
    process.env.S3_ENDPOINT,
    process.env.S3_REGION,
    process.env.S3_ACCESS_KEY_ID,
    process.env.S3_SECRET_ACCESS_KEY,
  );

  // Objects must be copied through this machine: the two buckets live in
  // different Supabase projects, so there is no server-side copy between them.
  for (const bucket of [process.env.S3_BUCKET, process.env.S3_DOWNLOADS_BUCKET].filter(Boolean)) {
    await syncBucket(from, to, bucket);
  }
};

if (doDb) await syncDatabase();
if (doStorage) await syncStorage();

if (!commit) {
  console.log("\n[sync] dry run only. Re-run with --yes to apply.\n");
} else {
  /**
   * The deployed site will not show any of this until it is rebuilt, and the
   * reason is worth stating rather than leaving to be rediscovered.
   *
   * Cache invalidation on this site runs through Payload's afterChange hooks,
   * which call revalidatePath in-process — see src/hooks/revalidate.ts. That
   * works precisely because Payload runs inside the Next app. This script does
   * not: it writes to Postgres directly, so no hook fires and nothing purges.
   *
   * The symptom is convincing and misleading. The target's /admin shows the new
   * content immediately, because the admin always queries live, while its public
   * pages keep serving renders from before the sync. That looks like a broken
   * deployment and is only a warm cache.
   *
   * Triggering a purge from here would mean reaching the deployment over HTTP,
   * past the Vercel Authentication in front of it, with a bypass token to
   * maintain. A rebuild is one click and needs none of that.
   */
  console.log("\n[sync] done.");
  console.log("[sync] NOW REDEPLOY THE TARGET. Its public pages still serve cached renders");
  console.log("[sync]   from before this ran — /admin will look right while they do not.");
  console.log("[sync]   Nothing purged the cache because this wrote to Postgres directly,");
  console.log("[sync]   bypassing the Payload hooks that normally do it.");
  console.log("[sync] Run `pnpm migrate` too, if the target had migrations production lacks.\n");
}
