// lib/waitlist/submit.ts
import type { WaitlistInput } from "./validate";

export async function submitWaitlist(data: WaitlistInput): Promise<void> {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Server error");
}