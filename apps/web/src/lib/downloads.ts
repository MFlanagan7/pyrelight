import "server-only";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { tlsAwareRetryStrategy } from "./s3-retry";

/**
 * Signed links for private downloads.
 *
 * A file in the public bucket is a URL anyone can paste into a group chat,
 * which would make the email gate decorative. These links are issued only after
 * the download form is completed and expire shortly after, so a shared link is
 * a dead link rather than an open door.
 *
 * `server-only` at the top is load-bearing: this module holds the secret key,
 * and the import fails the build if a client component ever pulls it in. That
 * is a far better outcome than discovering the key in a browser bundle.
 */

/** Ten minutes: long enough to click and download, short enough to be useless later. */
const EXPIRES_IN_SECONDS = 600;

let client: S3Client | null = null;

const getClient = (): S3Client => {
  if (client) return client;
  client = new S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    forcePathStyle: true,
    retryStrategy: tlsAwareRetryStrategy(8),
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
    },
  });
  return client;
};

/**
 * A time-limited URL for one private file.
 *
 * `filename` is what the browser should save it as, which matters because the
 * stored key can be mangled by upload-time deduplication and a reader should
 * not receive "map-2-1.pdf".
 */
export const createSignedDownloadUrl = async (
  key: string,
  filename?: string,
): Promise<string | null> => {
  const bucket = process.env.S3_DOWNLOADS_BUCKET;
  if (!bucket || !key) return null;

  try {
    return await getSignedUrl(
      getClient(),
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
        ...(filename
          ? { ResponseContentDisposition: `attachment; filename="${filename.replace(/"/g, "")}"` }
          : {}),
      }),
      { expiresIn: EXPIRES_IN_SECONDS },
    );
  } catch {
    // A failure here must not leak bucket names or keys to the caller.
    return null;
  }
};
