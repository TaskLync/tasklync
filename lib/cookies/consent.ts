import type { ConsentState } from "@/types/consent";

const COOKIE_NAME = "tasklync_consent";
const COOKIE_VERSION = 1;           // Bump this when your policy changes
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

export const defaultConsent: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
  functional: false,
  consentedAt: null,
  version: COOKIE_VERSION,
};

/** Read the consent cookie. Returns null if not set or version mismatch. */
export function readConsentCookie(): ConsentState | null {
  if (typeof document === "undefined") return null; // SSR guard

  const raw = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];

  if (!raw) return null;

  try {
    const parsed: ConsentState = JSON.parse(decodeURIComponent(raw));
    // Version mismatch → force re-consent
    if (parsed.version !== COOKIE_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** Write the consent cookie (client-side only). */
export function writeConsentCookie(state: ConsentState): void {
  if (typeof document === "undefined") return;

  const value = encodeURIComponent(JSON.stringify(state));
  // SameSite=Lax is correct for first-party consent cookies.
  // Do NOT use HttpOnly here — JS needs to read it.
  document.cookie = [
    `${COOKIE_NAME}=${value}`,
    `Max-Age=${COOKIE_MAX_AGE}`,
    `Path=/`,
    `SameSite=Lax`,
    // Add `; Secure` in production (handled by middleware or deployment)
    process.env.NODE_ENV === "production" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

/** Build a full ConsentState from partial preferences. */
export function buildConsentState(
  prefs: Partial<Omit<ConsentState, "essential" | "consentedAt" | "version">>
): ConsentState {
  return {
    essential: true,
    analytics: prefs.analytics ?? false,
    marketing: prefs.marketing ?? false,
    functional: prefs.functional ?? false,
    consentedAt: new Date().toISOString(),
    version: COOKIE_VERSION,
  };
}