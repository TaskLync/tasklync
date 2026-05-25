// lib/contact/client-guard.ts
// Client-safe only — never import in server files or API routes

import type { ContactType } from "@/types/contact";

const KEY_PREFIX = "tl_contact_last_submit_";
const WINDOW_MS  = 24 * 60 * 60 * 1000; // 24 hours — matches server-side TTL

// ─── Storage helpers ──────────────────────────────────────────────────────────
// All wrapped in try/catch because localStorage can throw in:
//   - Private browsing on some browsers
//   - Contexts where storage is blocked by browser policy
//   - SSR if this file is ever accidentally imported server-side

function getLastSubmitTime(type: ContactType): number | null {
  try {
    const raw = localStorage.getItem(`${KEY_PREFIX}${type}`);
    return raw ? parseInt(raw, 10) : null;
  } catch {
    return null;
  }
}

export function setLastSubmitTime(type: ContactType): void {
  try {
    localStorage.setItem(`${KEY_PREFIX}${type}`, Date.now().toString());
  } catch {
    // Storage unavailable — server-side guard still applies
  }
}

export function isClientRateLimited(type: ContactType): boolean {
  const last = getLastSubmitTime(type);
  if (!last) return false;
  return Date.now() - last < WINDOW_MS;
}

export function timeUntilNextAllowed(type: ContactType): string {
  const last = getLastSubmitTime(type);
  if (!last) return "";
  const ms    = WINDOW_MS - (Date.now() - last);
  const hours = Math.ceil(ms / (1000 * 60 * 60));
  return hours === 1 ? "1 hour" : `${hours} hours`;
}