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
      `[preflight] connect (${label}): FAILED in ${Date.now() - started}ms — ${err.code ?? err.name ?? ""} ${err.message}`,
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
};

await main().catch((err) => console.log(`[preflight] unexpected: ${err.message}`));
