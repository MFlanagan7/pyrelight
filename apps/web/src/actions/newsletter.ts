"use server";

import { getPayloadClient } from "@/lib/payload";

export type SubscribeState = { status: "idle" | "ok" | "error"; message: string };

/**
 * Stores an address as unconfirmed. Deliberately does not send anything —
 * double opt-in is not built, and mailing an unconfirmed address is exactly
 * what GDPR prohibits.
 */
export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const source = String(formData.get("source") ?? "");

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: "error", message: "That address does not look right." };
  }

  try {
    const payload = await getPayloadClient();

    const existing = await payload.find({
      collection: "subscribers",
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
    });

    // Same reply either way — telling a stranger whether an address is already
    // on the list leaks membership.
    if (existing.docs.length === 0) {
      await payload.create({
        collection: "subscribers",
        data: { email, source },
        overrideAccess: true,
      });
    }

    return { status: "ok", message: "The map is on its way." };
  } catch {
    return { status: "error", message: "Something went wrong. Try again shortly." };
  }
}
