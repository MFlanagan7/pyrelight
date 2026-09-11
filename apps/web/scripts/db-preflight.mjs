/**
 * Reports which layer of the database connection works, and which does not.
 *
 * A pg pool timeout says only "could not connect", which is true of a DNS
 * failure, a blocked port, a TLS problem and a wrong password alike. This
 * separates them, so a failed deploy names its own cause instead of needing
 * another round trip to diagnose.
 *
 * Never fails the build. It runs before the real work and prints what it
 * found; the genuine error still surfaces afterwards.
 */
import dns from "node:dns/promises";
import net from "node:net";
import tls from "node:tls";

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
    socket.once("timeout", () => finish({ ok: false, reason: "timed out — packets dropped, which is what a firewall looks like" }));
    socket.once("error", (err) => finish({ ok: false, reason: err.code ?? err.message }));
  });

/**
 * Postgres does not speak TLS on connect; it asks first. This sends the
 * SSLRequest packet by hand and reads the single-byte reply, which proves the
 * server is really Postgres and willing to negotiate — distinct from a TCP
 * port that merely accepts.
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
        reason: reply === "S" ? "offers TLS" : reply === "N" ? "plaintext only" : `unexpected reply ${reply}`,
      });
    });

    socket.once("timeout", () => finish({ ok: false, reason: "connected but never answered — something is intercepting the port" }));
    socket.once("error", (err) => finish({ ok: false, reason: err.code ?? err.message }));
  });

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
  console.log(`[preflight] host=${host} port=${port} user=${decodeURIComponent(url.username)}`);

  try {
    const addresses = await dns.lookup(host, { all: true, verbatim: true });
    console.log(
      `[preflight] dns: ${addresses.map((a) => `IPv${a.family} ${a.address}`).join(", ")}`,
    );
  } catch (err) {
    console.log(`[preflight] dns: FAILED (${err.code ?? err.message})`);
    return;
  }

  // Both pooler ports, so a port-specific block is visible rather than inferred.
  for (const candidate of [...new Set([port, 6543, 5432])]) {
    const tcp = await tcpProbe(host, candidate);
    if (!tcp.ok) {
      console.log(`[preflight] tcp ${candidate}: FAILED in ${tcp.ms}ms — ${tcp.reason}`);
      continue;
    }
    const pg = await postgresProbe(host, candidate);
    console.log(
      `[preflight] tcp ${candidate}: connected in ${tcp.ms}ms | postgres handshake: ${pg.ok ? pg.reason : `FAILED — ${pg.reason}`}`,
    );
  }
};

await main().catch((err) => console.log(`[preflight] unexpected: ${err.message}`));
