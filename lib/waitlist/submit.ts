// lib/waitlist/submit.ts
"use client";

import type { WaitlistAPIResponse, WaitlistSubmitPayload } from "@/types/waitlist";

function getUTMParams(): Partial<WaitlistSubmitPayload> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source:   p.get("utm_source")   ?? undefined,
    utm_medium:   p.get("utm_medium")   ?? undefined,
    utm_campaign: p.get("utm_campaign") ?? undefined,
    utm_content:  p.get("utm_content")  ?? undefined,
  };
}

export async function submitWaitlist(args: { email: string }): Promise<WaitlistAPIResponse> {
  const payload: WaitlistSubmitPayload = {
    email:  args.email,
    _honey: "",
    ...getUTMParams(),
  };

  const res = await fetch("/api/waitlist", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(payload),
  });

  const data: WaitlistAPIResponse = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Submission failed. Please try again.");
  return data;
}