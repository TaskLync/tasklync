export type ConsentCategory = "essential" | "analytics" | "marketing" | "functional";

export interface ConsentState {
  essential: true;           // Always true — cannot be toggled off
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  consentedAt: string | null; // ISO timestamp — for your records
  version: number;            // Bump when your cookie policy changes to force re-consent
}

export interface ConsentContextValue {
  consent: ConsentState;
  hasResponded: boolean;      // Has the user made any choice yet?
  isModalOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: Partial<Omit<ConsentState, "essential" | "consentedAt" | "version">>) => void;
  openModal: () => void;
  closeModal: () => void;
}