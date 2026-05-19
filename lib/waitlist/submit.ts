// lib/waitlist/submit.ts
// Client-side helper for submitting waitlist forms

import type {
  UserType,
  WaitlistAPIResponse,
  WaitlistSubmitPayload,
} from "@/types/waitlist";

// ─────────────────────────────────────────────────────────────
// Extract UTM params from URL
// ─────────────────────────────────────────────────────────────

function getUTMParams(): Partial<WaitlistSubmitPayload> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
  };
}

// ─────────────────────────────────────────────────────────────
// Get referral code
// Priority:
// 1. URL param (?ref=abc123)
// 2. sessionStorage fallback
// ─────────────────────────────────────────────────────────────

function getReferralCode(): string | undefined {
  if (typeof window === "undefined") return undefined;

  const params = new URLSearchParams(window.location.search);

  return (
    params.get("ref") ??
    sessionStorage.getItem("tl_ref") ??
    undefined
  );
}

// ─────────────────────────────────────────────────────────────
// Submit waitlist form
// ─────────────────────────────────────────────────────────────

export async function submitWaitlist(args: {
  email: string;
  name?: string;
  user_type: UserType;
}): Promise<WaitlistAPIResponse> {
  const payload: WaitlistSubmitPayload = {
    email: args.email,
    name: args.name,
    user_type: args.user_type,

    referred_by: getReferralCode(),

    // Honeypot field
    _honey: "",

    ...getUTMParams(),
  };

  const res = await fetch("/api/waitlist", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payload),
  });

  const data: WaitlistAPIResponse = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error ?? "Submission failed. Please try again."
    );
  }

  return data;
}