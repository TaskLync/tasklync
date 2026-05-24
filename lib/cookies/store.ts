import { create } from "zustand";
import type { ConsentState } from "@/types/consent";
import {
  defaultConsent,
  readConsentCookie,
  writeConsentCookie,
  buildConsentState,
} from "./consent";

interface ConsentStore {
  consent: ConsentState;
  hasResponded: boolean;
  isModalOpen: boolean;
  // Actions
  hydrate: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (prefs: Partial<Pick<ConsentState, "analytics" | "marketing" | "functional">>) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useConsentStore = create<ConsentStore>((set) => ({
  consent: defaultConsent,
  hasResponded: false,
  isModalOpen: false,

  /** Called once on mount — reads existing cookie */
  hydrate: () => {
    const saved = readConsentCookie();
    if (saved) {
      set({ consent: saved, hasResponded: true });
    }
  },

  acceptAll: () => {
    const state = buildConsentState({ analytics: true, marketing: true, functional: true });
    writeConsentCookie(state);
    set({ consent: state, hasResponded: true, isModalOpen: false });
  },

  rejectAll: () => {
    const state = buildConsentState({ analytics: false, marketing: false, functional: false });
    writeConsentCookie(state);
    set({ consent: state, hasResponded: true, isModalOpen: false });
  },

  savePreferences: (prefs) => {
    const state = buildConsentState(prefs);
    writeConsentCookie(state);
    set({ consent: state, hasResponded: true, isModalOpen: false });
  },

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));