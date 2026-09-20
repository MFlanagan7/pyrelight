/**
 * Reports which layer of the database connection works, and which does not.
 *
 * A pg pool timeout says only "could not connect", which is equally true of a
 * DNS failure, a blocked port, a TLS problem and a wrong password. This
 * separates them, so a failed deploy names its own cause instead of costing
 * another round trip to guess again.
 *
 * Never fails the build. It prints what it found and lets the real error
 * surface behind it.
 */
import dns from "node:dns/promises";
import net from "node:net";
import pg from "pg";

const TIMEOUT = 8000;

const tcpProbe = (host, port) =>
  new Promise((resolve) => {
    const started = Date.now();
    const socket = net.connect({ host, port });
    socket.setTimeout(TIMEOUT);

    const finish = (result) => {
      socket.destroy();
      resolve({ ...result, ms: Date.now() - started });
    };

    socket.once("connect", () => finish({ ok: true }));
    socket.once("timeout", () =>
      finish({ ok: false, reason: "timed out — packets dropped, which is what a firewall looks like" }),
    );
    socket.once("error", (err) => finish({ ok: false, reason: err.code ?? err.message }));
  });

/**
 * Postgres does not speak TLS on connect; it asks first. This sends the
 * SSLRequest packet by hand and reads the one-byte reply, proving the port is
 * really Postgres and willing to negotiate — distinct from a port that merely
 * accepts connections.
 */
const postgresProbe = (host, port) =>
  new Promise((resolve) => {
    const started = Date.now();
    const socket = net.connect({ host, port });
    socket.setTimeout(TIMEOUT);

    const finish = (result) => {
      socket.destroy();
      resolve({ ...result, ms: Date.now() - started });
    };

    socket.once("connect", () => {
      const packet = Buffer.alloc(8);
      packet.writeInt32BE(8, 0);
      packet.writeInt32BE(80877103, 4); // SSLRequest
      socket.write(packet);
    });

    socket.once("data", (data) => {
      const reply = data.toString("utf8", 0, 1);
      finish({
        ok: reply === "S" || reply === "N",
        reason:
          reply === "S" ? "offers TLS" : reply === "N" ? "plaintext only" : `unexpected reply ${reply}`,
      });
    });

    socket.once("timeout", () =>
      finish({ ok: false, reason: "connected but never answered — something is intercepting the port" }),
    );
    socket.once("error", (err) => finish({ ok: false, reason: err.code ?? err.message }));
  });

/** Mirrors lib/db-ssl.ts, which is TypeScript and cannot be imported here. */
const sslFromRaw = (raw) => {
  const value = raw.trim();
  let ca = null;

  if (value.includes("-----BEGIN")) {
    ca = value.includes("\\n") ? value.replace(/\\n/g, "\n") : value;
  } else {
    try {
      const decoded = Buffer.from(value, "base64").toString("utf8");
      ca = decoded.includes("-----BEGIN") ? decoded : null;
    } catch {
      ca = null;
    }
  }

  return ca ? { ca, rejectUnauthorized: true } : { rejectUnauthorized: false };
};

/**
 * A paused or restoring Supabase project, named as such.
 *
 * Free-tier projects pause after seven days without activity, and nothing says
 * so in words. The pooler reports the tenant as not existing, which reads like a
 * typo in the username. Storage returns an HTML error page, which the AWS SDK
 * reports as an XML parse failure, which reads like a bug in the SDK. Neither
 * mentions pausing, and both are fixed by one click in a dashboard.
 *
 * Restoring is worth separating from paused, because the remedy is the opposite:
 * wait rather than act. A restore takes minutes, and the two halves come back at
 * different times — storage starts answering with real API errors while the
 * pooler still has not re-registered the tenant. Seeing DatabaseTimeout from
 * storage while Postgres still says "not found" means it is on its way up, and
 * redeploying now just fails again a little differently.
 */
const supabaseStateHint = (message) => {
  // Storage answering properly but its database is not ready: mid-restore.
  if (/DatabaseTimeout/i.test(message) || /connection to the database timed out/i.test(message)) {
    return (
      "\n           ^ the project is RESTORING, not paused. Wait for the Supabase " +
      "dashboard to show it active, then redeploy. Restores take a few minutes."
    );
  }

  if (
    /tenant.*not found/i.test(message) ||
    /XML parse error/i.test(message) ||
    /Deserialization error/i.test(message)
  ) {
    return (
      "\n           ^ this usually means the Supabase project is PAUSED. Free-tier " +
      "projects pause after 7 days idle. Restore it from the dashboard, wait for it " +
      "to report active, then redeploy."
    );
  }

  return "";
};

/** A real Postgres connection, with the error reported rather than swallowed. */
const connectProbe = async (label, connectionString, ssl) => {
  const client = new pg.Client({ connectionString, ssl, connectionTimeoutMillis: TIMEOUT });
  const started = Date.now();
  try {
    await client.connect();
    const { rows } = await client.query("select current_user as who");
    console.log(`[preflight] connect (${label}): OK in ${Date.now() - started}ms as ${rows[0].who}`);
    await client.end();
  } catch (err) {
    console.log(
      `[preflight] connect (${label}): FAILED in ${Date.now() - started}ms — ${err.code ?? err.name ?? ""} ${err.message}` +
        supabaseStateHint(err.message),
    );
    try {
      await client.end();
    } catch {
      // Already broken; nothing to close.
    }
  }
};

const describeCertificate = (raw) => {
  const value = raw.trim();
  const isPem = value.includes("-----BEGIN");
  let shape = "UNRECOGNISED";

  if (isPem) {
    shape = "PEM";
  } else {
    try {
      shape = Buffer.from(value, "base64").toString("utf8").includes("-----BEGIN")
        ? "base64 of PEM"
        : "UNRECOGNISED";
    } catch {
      shape = "UNRECOGNISED";
    }
  }

  const escapedNewlines = value.includes("\\n");
  const realNewlines = value.includes("\n");
  return `${value.length} chars, ${shape}, escaped-newlines=${escapedNewlines}, real-newlines=${realNewlines}`;
};

/**
 * Storage, checked against the database it is paired with.
 *
 * A wrong DATABASE_URI announces itself immediately. Wrong storage credentials
 * do not: the app boots, pages render, and the only symptom is uploads landing
 * in one project while the rows describing them live in another. That surfaces
 * weeks later as images that 404 for no visible reason.
 *
 * Both halves carry the Supabase project reference, so they can be compared.
 */
const checkStorage = async (databaseRef) => {
  const endpoint = process.env.S3_ENDPOINT;
  if (!endpoint) {
    console.log("[preflight] s3: S3_ENDPOINT not set — uploads go to local disk");
    return;
  }

  let storageRef;
  try {
    storageRef = new URL(endpoint).hostname.split(".")[0];
  } catch {
    console.log(`[preflight] s3: S3_ENDPOINT is not a URL (${endpoint})`);
    return;
  }

  if (databaseRef && storageRef !== databaseRef) {
    console.log(
      `[preflight] s3: WARNING storage project is ${storageRef} but the database is ` +
        `${databaseRef}. Uploads would be written to one project and recorded in the other.`,
    );
  } else {
    console.log(`[preflight] s3: project ${storageRef}, matches the database`);
  }

  const { S3Client, ListObjectsV2Command } = await import("@aws-sdk/client-s3");
  const client = new S3Client({
    endpoint,
    region: process.env.S3_REGION,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
    },
  });

  for (const bucket of [process.env.S3_BUCKET, process.env.S3_DOWNLOADS_BUCKET].filter(Boolean)) {
    try {
      const listed = await client.send(
        new ListObjectsV2Command({ Bucket: bucket, MaxKeys: 1 }),
      );
      console.log(`[preflight] s3 ${bucket}: OK, ${listed.KeyCount ?? 0} object(s) visible`);
    } catch (err) {
      console.log(
        `[preflight] s3 ${bucket}: FAILED — ${err.name} ${err.message}` +
          supabaseStateHint(`${err.name} ${err.message}`),
      );
    }
  }
};

const main = async () => {
  const uri = process.env.DATABASE_URI;
  if (!uri) {
    console.log("[preflight] DATABASE_URI is not set");
    return;
  }

  let url;
  try {
    url = new URL(uri);
  } catch {
    console.log("[preflight] DATABASE_URI could not be parsed as a URL");
    return;
  }

  const host = url.hostname;
  const port = Number(url.port || 5432);
  const password = decodeURIComponent(url.password || "");
  console.log(
    `[preflight] host=${host} port=${port} user=${decodeURIComponent(url.username)} password=${password.length} chars`,
  );

  /**
   * The session pooler caps a tenant at 15 clients in TOTAL, which serverless
   * fan-out reaches almost at once. It then fails with a connect timeout,
   * identical in appearance to a firewall, a bad password or a starved pool —
   * so say it here, where it is still cheap to notice.
   */
  if (port === 5432 && host.includes("pooler.supabase.com")) {
    console.log(
      "[preflight] WARNING: port 5432 is Supabase's SESSION pooler, capped at 15 clients " +
        "for the whole project. Use the TRANSACTION pooler on 6543 instead.",
    );
  }

  // IPv6-only, and Vercel's functions are not. Reachable from some networks and
  // not from others, which makes it look intermittent rather than wrong.
  if (host.startsWith("db.") && host.endsWith(".supabase.co")) {
    console.log(
      "[preflight] WARNING: this is Supabase's DIRECT connection, which resolves to IPv6 " +
        "only. Vercel cannot reach it. Use the transaction pooler on 6543.",
    );
  }

  try {
    const addresses = await dns.lookup(host, { all: true, verbatim: true });
    console.log(`[preflight] dns: ${addresses.map((a) => `IPv${a.family} ${a.address}`).join(", ")}`);
  } catch (err) {
    console.log(`[preflight] dns: FAILED (${err.code ?? err.message})`);
    return;
  }

  const rawCa = process.env.DATABASE_CA_CERT;
  console.log(
    rawCa
      ? `[preflight] ca: ${describeCertificate(rawCa)}`
      : "[preflight] ca: DATABASE_CA_CERT not set — encrypted but unverified",
  );

  for (const candidate of [...new Set([port, 6543, 5432])]) {
    const tcp = await tcpProbe(host, candidate);
    if (!tcp.ok) {
      console.log(`[preflight] tcp ${candidate}: FAILED in ${tcp.ms}ms — ${tcp.reason}`);
      continue;
    }
    const handshake = await postgresProbe(host, candidate);
    console.log(
      `[preflight] tcp ${candidate}: connected in ${tcp.ms}ms | handshake: ${handshake.ok ? handshake.reason : `FAILED — ${handshake.reason}`}`,
    );
  }

  // The probes above stop at the SSLRequest reply. The TLS handshake itself,
  // the startup message and authentication all come after, and that is where a
  // connection passing every check above can still fail.
  await connectProbe("plaintext", uri, false);
  await connectProbe("encrypted, unverified", uri, { rejectUnauthorized: false });

  if (rawCa) {
    await connectProbe("encrypted, verified against DATABASE_CA_CERT", uri, sslFromRaw(rawCa));
  }

  // The project reference lives in the pooler username, not the host.
  const user = decodeURIComponent(url.username);
  await checkStorage(user.includes(".") ? user.split(".")[1] : null);
};

await main().catch((err) => console.log(`[preflight] unexpected: ${err.message}`));
