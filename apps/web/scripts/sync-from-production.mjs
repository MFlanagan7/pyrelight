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
 * AFTERWARDS: staging is now at production's schema version, including its
 * payload_migrations table. If staging was testing a migration production does
 * not have yet, that migration is gone. Run `pnpm migrate` to put it back.
 *
 * Requires pg_dump and psql on PATH (PostgreSQL client tools). They are the
 * right tool for this and a bespoke row copier would be a worse one.
 */
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

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

const requireTool = (tool) => {
  const probe = spawnSync(tool, ["--version"], { shell: true, stdio: "pipe" });
  if (probe.status !== 0) {
    fail(
      `${tool} is not on PATH. Install the PostgreSQL client tools — on Windows, ` +
        "the EDB installer can install Command Line Tools alone, without a server.",
    );
  }
};

const syncDatabase = () => {
  console.log("\n[sync] === database ===");
  requireTool("pg_dump");
  requireTool("psql");

  if (!commit) {
    console.log("[sync] would dump schema \"payload\" from production and restore it over the target");
    console.log("[sync] would DROP and recreate every table, replacing all content, users and settings");
    return;
  }

  const dir = mkdtempSync(path.join(tmpdir(), "pyrelight-sync-"));
  const dump = path.join(dir, "payload.sql");

  try {
    console.log("[sync] dumping...");
    const dumped = spawnSync(
      "pg_dump",
      [
        `"${toSessionPooler(source)}"`,
        "--schema=payload",
        // The target's roles differ from production's, and restoring ownership
        // it cannot grant turns a working copy into a pile of permission errors.
        "--no-owner",
        "--no-privileges",
        // Drop what is there first, so this is a replacement and not a merge
        // that silently keeps rows production deleted.
        "--clean",
        "--if-exists",
        "-f",
        `"${dump}"`,
      ],
      { shell: true, stdio: "inherit" },
    );
    if (dumped.status !== 0) fail("pg_dump failed");

    console.log("[sync] restoring...");
    const restored = spawnSync(
      "psql",
      [`"${toSessionPooler(target)}"`, "-v", "ON_ERROR_STOP=1", "-f", `"${dump}"`],
      { shell: true, stdio: "inherit" },
    );
    if (restored.status !== 0) fail("psql restore failed — the target may be half-written");

    console.log("[sync] database replaced");
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
        if (existing.ContentLength === object.Size) {
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

if (doDb) syncDatabase();
if (doStorage) await syncStorage();

console.log(
  commit
    ? "\n[sync] done. Run `pnpm migrate` if staging had migrations production does not.\n"
    : "\n[sync] dry run only. Re-run with --yes to apply.\n",
);
