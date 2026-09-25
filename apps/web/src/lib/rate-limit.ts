// No `server-only` marker: importing next/headers below already makes this
// impossible to use from a Client Component, and the marker additionally makes
// the module unimportable by a test, which for a security control is a bad
// trade. See scripts/check-rate-limit.ts.
import { headers } from "next/headers";

/**
 * A small brake on the two endpoints a stranger can reach: newsletter signup
 * and the download gate.
 *
 * WHAT THIS IS NOT: it is not protection against a determined or distributed
 * attacker, and pretending otherwise would be worse than having nothing. The
 * counter lives in the memory of one serverless instance, so it is lost when
 * that instance is recycled and it is not shared with the others running
 * beside it. Someone spreading requests across enough addresses defeats it
 * without noticing it exists.
 *
 * WHAT IT IS: the thing that stops a bot hammering one endpoint from one
 * address, a script left in a loop, and a form submitted forty times by
 * someone impatient. That is the actual traffic these endpoints see, and it
 * costs no dependency and no external service to stop.
 *
 * Real protection is either Vercel's firewall, which rate-limits at the edge
 * before a function is invoked and therefore before it costs anything, or a
 * shared store such as Redis. Both are worth having before the site is
 * promoted anywhere; neither is worth blocking launch on.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Bounded so the map cannot become a memory leak in a long-lived instance.
 * Well above real traffic; hitting it means something is wrong anyway, and
 * dropping the oldest entries degrades to "no limit" rather than to a crash.
 */
const MAX_TRACKED = 10_000;

/**
 * The caller's address, as far as it can be known.
 *
 * Vercel sets x-forwarded-for and strips anything a client sent, so the first
 * entry is the real peer. Off Vercel this header is trivially forged — which
 * is another reason not to treat this as a security control.
 */
const callerKey = async (scope: string): Promise<string> => {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return `${scope}:${ip}`;
};

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSeconds: number };

/**
 * @param scope   distinguishes endpoints, so the download gate and the
 *                newsletter do not share one another's budget
 * @param limit   requests allowed per window
 * @param windowSeconds length of the window
 */
export const rateLimit = async (
  scope: string,
  limit: number,
  windowSeconds: number,
  /** Bypasses header lookup. Exists so the logic can be tested without a request. */
  explicitKey?: string,
): Promise<RateLimitResult> => {
  const key = explicitKey ? `${scope}:${explicitKey}` : await callerKey(scope);
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    if (buckets.size >= MAX_TRACKED) {
      // Cheap eviction: clear expired entries, and if that frees nothing,
      // start over. Correctness here matters less than bounded memory.
      for (const [k, v] of buckets) if (now >= v.resetAt) buckets.delete(k);
      if (buckets.size >= MAX_TRACKED) buckets.clear();
    }
    buckets.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { ok: true };
  }

  if (existing.count >= limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000) };
  }

  existing.count += 1;
  return { ok: true };
};
