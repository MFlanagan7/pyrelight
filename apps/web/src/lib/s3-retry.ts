/**
 * Retry strategy for S3 that also retries TLS-level failures.
 *
 * The AWS SDK's built-in strategy only retries these:
 *
 *   TRANSIENT_ERROR_CODES      TimeoutError, RequestTimeout, RequestTimeoutException
 *   NODEJS_TIMEOUT_ERROR_CODES ECONNRESET, ECONNREFUSED, EPIPE, ETIMEDOUT
 *   NODEJS_NETWORK_ERROR_CODES EHOSTUNREACH, ENETUNREACH, ENOTFOUND, EAI_AGAIN
 *
 * A TLS record failing its integrity check surfaces as
 * ERR_SSL_SSL/TLS_ALERT_BAD_RECORD_MAC, which appears on none of those lists.
 * The SDK therefore abandons the request after a single attempt no matter what
 * maxAttempts says — which is why uploads failed while the logs reported
 * "attempts": 1.
 *
 * Every S3 operation used here (PUT, DELETE, GET) is idempotent, so replaying a
 * request is safe. Replaying requires a rewindable body: a Buffer can be sent
 * again, a stream cannot, so a streamed body is failed immediately with an
 * explanation rather than retried into a silent truncation.
 */

import type {
  FinalizeHandler,
  FinalizeHandlerArguments,
  FinalizeHandlerOutput,
  MetadataBearer,
  RetryStrategy,
} from "@smithy/types";

const RETRYABLE_CODES = new Set([
  // The SDK's own lists, repeated because supplying a strategy replaces them.
  "TimeoutError",
  "RequestTimeout",
  "RequestTimeoutException",
  "ECONNRESET",
  "ECONNREFUSED",
  "EPIPE",
  "ETIMEDOUT",
  "EHOSTUNREACH",
  "ENETUNREACH",
  "ENOTFOUND",
  "EAI_AGAIN",
  // Undici surfaces an aborted socket as this.
  "UND_ERR_SOCKET",
]);

const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);

const isRetryable = (err: unknown): boolean => {
  if (!err || typeof err !== "object") return false;
  const e = err as {
    code?: string;
    name?: string;
    message?: string;
    $metadata?: { httpStatusCode?: number };
  };

  if (e.code && RETRYABLE_CODES.has(e.code)) return true;
  if (e.name && RETRYABLE_CODES.has(e.name)) return true;

  const status = e.$metadata?.httpStatusCode;
  if (status && RETRYABLE_STATUS.has(status)) return true;

  // Any TLS-layer failure. Matched on the code and message because OpenSSL
  // error identifiers vary between Node builds and platforms.
  const haystack = `${e.code ?? ""} ${e.message ?? ""}`;
  return /ERR_SSL|bad record mac|decryption failed|wrong version number|sslv3|tlsv1/i.test(
    haystack,
  );
};

/** A body that cannot be replayed makes a retry unsafe. */
const isRewindable = (request: unknown): boolean => {
  const body = (request as { body?: unknown } | undefined)?.body;
  if (body == null) return true;
  if (typeof body === "string") return true;
  if (Buffer.isBuffer(body)) return true;
  if (body instanceof Uint8Array) return true;
  return false;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const tlsAwareRetryStrategy = (maxAttempts = 8): RetryStrategy => ({
  mode: "STANDARD",
  retry: async <Input extends object, Output extends MetadataBearer>(
    next: FinalizeHandler<Input, Output>,
    args: FinalizeHandlerArguments<Input>,
  ): Promise<FinalizeHandlerOutput<Output>> => {
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await next(args);
      } catch (err) {
        lastError = err;

        const last = attempt === maxAttempts;
        if (last || !isRetryable(err)) throw err;

        if (!isRewindable(args.request)) {
          throw new Error(
            `S3 request failed with a retryable error but its body is a stream, which cannot be replayed. ` +
              `Original error: ${(err as Error)?.message ?? String(err)}`,
            { cause: err },
          );
        }

        // Exponential backoff with full jitter, capped at 5s. Jitter matters
        // because these failures arrive in bursts — retrying in lockstep walks
        // straight back into the same bad patch.
        const ceiling = Math.min(100 * 2 ** (attempt - 1), 5_000);
        const delay = Math.random() * ceiling;

        const code =
          (err as { code?: string; name?: string })?.code ??
          (err as { name?: string })?.name ??
          "unknown";
        console.warn(
          `[s3] attempt ${attempt}/${maxAttempts} failed (${code}); retrying in ${Math.round(delay)}ms`,
        );

        await sleep(delay);
      }
    }

    throw lastError;
  },
});
