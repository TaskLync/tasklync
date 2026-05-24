"use client";

import { useEffect } from "react";
import { useConsentStore } from "@/lib/cookies/store";
import { loadAnalyticsScripts } from "@/lib/cookies/scripts";
import CookieBanner from "./CookieBanner";
import CookieModal from "./CookieModal";

export default function CookieProvider({ children }: { children: React.ReactNode }) {
  const { hydrate, consent, hasResponded } = useConsentStore();

  // Hydrate from cookie on first mount
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Fire analytics scripts whenever consent changes
  useEffect(() => {
    if (hasResponded) {
      loadAnalyticsScripts(consent);
    }
  }, [consent, hasResponded]);

  return (
    <>
      {children}
      <CookieBanner />
      <CookieModal />
    </>
  );
}