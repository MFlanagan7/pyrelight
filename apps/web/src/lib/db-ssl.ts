import type { ConnectionOptions } from "node:tls";

/**
 * TLS settings for the database connection.
 *
 * The connection is always encrypted. node-postgres would otherwise connect in
 * plaintext, which a developer machine tolerates and Vercel's egress path does
 * not — there it hangs until the pool times out, with nothing in the error to
 * say why.
 *
 * What the CA changes is whether the server's identity is PROVEN. Without it
 * the traffic is private but unauthenticated; with it, a machine-in-the-middle
 * presenting its own certificate is rejected.
 *
 * Supabase's pooler uses their own CA, which is not in Node's trust store, so
 * verifying against system roots fails with SELF_SIGNED_CERT_IN_CHAIN. The
 * certificate has to be supplied explicitly, from Supabase's dashboard under
 * Project Settings > Database > SSL.
 */

/**
 * A PEM is multi-line, and every environment handles that differently: Vercel
 * keeps real newlines, some shells collapse them, and .env files often end up
 * with the two characters backslash-n instead. Base64 sidesteps all of it by
 * having no newlines to lose.
 *
 * Rather than demand one shape and fail obscurely on the others, accept each.
 */
const normaliseCertificate = (raw: string): string | null => {
  const value = raw.trim();
  if (!value) return null;

  // Already a PEM, possibly with literal backslash-n where newlines belong.
  if (value.includes("-----BEGIN")) {
    return value.includes("\\n") ? value.replace(/\\n/g, "\n") : value;
  }

  // Otherwise assume base64 of a PEM, which is the shape that survives
  // copy-paste through anything.
  try {
    const decoded = Buffer.from(value, "base64").toString("utf8");
    return decoded.includes("-----BEGIN") ? decoded : null;
  } catch {
    return null;
  }
};

export const databaseSsl = (): ConnectionOptions => {
  const raw = process.env.DATABASE_CA_CERT;
  const ca = raw ? normaliseCertificate(raw) : null;

  if (raw && !ca) {
    // Loud, because the alternative is silently downgrading to an
    // unauthenticated connection that someone believed was verified.
    console.warn(
      "[db] DATABASE_CA_CERT is set but is not a readable certificate. " +
        "Expected PEM text including the BEGIN/END lines, or base64 of the same. " +
        "Connecting encrypted but UNVERIFIED.",
    );
  }

  return ca ? { ca, rejectUnauthorized: true } : { rejectUnauthorized: false };
};
