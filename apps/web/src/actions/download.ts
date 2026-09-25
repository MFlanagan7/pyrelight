"use server";

import { createSignedDownloadUrl } from "@/lib/downloads";
import { rateLimit } from "@/lib/rate-limit";
import { getPayloadClient } from "@/lib/payload";

export type DownloadState = {
  status: "idle" | "ready" | "error";
  message: string;
  /** Signed and short-lived. Present only on success. */
  url?: string;
};

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Issues a download link, recording the address if one was required.
 *
 * The consent rule lives here rather than in the form, because a form control
 * is a suggestion and this is the thing that actually writes to the list.
 *
 * An address given to receive a file has consented to receive THAT FILE. It has
 * not consented to marketing. Subscription is a separate, optional tick, and
 * only a ticked box sets `consentedAt` and marks the record as a newsletter
 * signup. Making the download conditional on subscribing would be bundled
 * consent, which GDPR does not permit — and a list built that way gets marked
 * as spam, which damages the sending domain we set up carefully.
 */
export async function requestDownload(
  _prev: DownloadState,
  formData: FormData,
): Promise<DownloadState> {
  // Issuing a signed URL costs a database read and an S3 signature, so the
  // brake goes before both. Slightly more generous than the newsletter: a
  // reader may legitimately fetch several files in one sitting.
  const limit = await rateLimit("download", 15, 600);
  if (!limit.ok) {
    return { status: "error", message: "Too many requests. Try again in a few minutes." };
  }

  const resourceId = Number(formData.get("resourceId"));
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const subscribe = formData.get("subscribe") === "on";

  if (!Number.isFinite(resourceId)) {
    return { status: "error", message: "Something went wrong. Refresh and try again." };
  }

  try {
    const payload = await getPayloadClient();

    // Re-fetch rather than trusting the client: the form could name any id.
    const resource = await payload.findByID({
      collection: "resources",
      id: resourceId,
      depth: 1,
      overrideAccess: false,
    });

    if (!resource || resource._status !== "published" || resource.delivery !== "file") {
      return { status: "error", message: "That download is not available." };
    }

    if (resource.requireEmail) {
      if (!EMAIL.test(email)) {
        return { status: "error", message: "That address does not look right." };
      }

      const existing = await payload.find({
        collection: "subscribers",
        where: { email: { equals: email } },
        limit: 1,
        overrideAccess: true,
      });

      if (existing.docs.length === 0) {
        await payload.create({
          collection: "subscribers",
          data: {
            email,
            source: `resource:${resource.slug}`,
            reason: subscribe ? "newsletter" : "download",
            ...(subscribe ? { consentedAt: new Date().toISOString() } : {}),
          },
          overrideAccess: true,
        });
      } else if (subscribe && !existing.docs[0].consentedAt) {
        // Already on file for a download; now genuinely opting in.
        await payload.update({
          collection: "subscribers",
          id: existing.docs[0].id,
          data: { reason: "newsletter", consentedAt: new Date().toISOString() },
          overrideAccess: true,
        });
      }
    }

    const file = typeof resource.file === "object" ? resource.file : null;
    if (!file?.filename) {
      return { status: "error", message: "That download is missing its file." };
    }

    const url = await createSignedDownloadUrl(file.filename, file.filename);
    if (!url) {
      return { status: "error", message: "Could not prepare the download. Try again shortly." };
    }

    return { status: "ready", message: "Your download is ready.", url };
  } catch {
    return { status: "error", message: "Something went wrong. Try again shortly." };
  }
}

/** Ungated files still go through a signed link; only the form is skipped. */
export async function directDownloadUrl(resourceId: number): Promise<string | null> {
  const payload = await getPayloadClient();
  const resource = await payload.findByID({
    collection: "resources",
    id: resourceId,
    depth: 1,
    overrideAccess: false,
  });

  if (!resource || resource._status !== "published") return null;
  if (resource.delivery !== "file" || resource.requireEmail) return null;

  const file = typeof resource.file === "object" ? resource.file : null;
  if (!file?.filename) return null;

  return createSignedDownloadUrl(file.filename, file.filename);
}
