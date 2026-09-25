/**
 * Exercises the rate limiter's logic without a request.
 *
 * Worth having as a file rather than something typed once and thrown away: it
 * is a security control with no UI, so a mistake in it is silent. The failure
 * mode that matters is not "refuses too early" but "never refuses at all",
 * which looks exactly like working correctly from the outside.
 */
import { rateLimit } from "../src/lib/rate-limit";

const failures: string[] = [];
const check = (label: string, actual: boolean, expected: boolean) => {
  const ok = actual === expected;
  console.log(`  ${ok ? "ok  " : "FAIL"} ${label}`);
  if (!ok) failures.push(label);
};

for (let i = 1; i <= 5; i++) {
  const r = await rateLimit("t-news", 5, 600, "1.2.3.4");
  check(`attempt ${i} of 5 allowed`, r.ok, true);
}
check("6th attempt refused", (await rateLimit("t-news", 5, 600, "1.2.3.4")).ok, false);
check("another address unaffected", (await rateLimit("t-news", 5, 600, "9.9.9.9")).ok, true);
check("another endpoint unaffected", (await rateLimit("t-dl", 15, 600, "1.2.3.4")).ok, true);

const expired = await rateLimit("t-window", 1, 0, "1.2.3.4");
check("zero-length window always allows", expired.ok, true);
check("and again", (await rateLimit("t-window", 1, 0, "1.2.3.4")).ok, true);

if (failures.length) {
  console.error(`\n[rate-limit] ${failures.length} check(s) failed\n`);
  process.exit(1);
}
console.log("[rate-limit] OK");
