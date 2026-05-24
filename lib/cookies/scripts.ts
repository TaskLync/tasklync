import type { ConsentState } from "@/types/consent";

type FbqFunction = {
  (...args: unknown[]): void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: FbqFunction;
  callMethod?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer: unknown[];
    fbq?: FbqFunction;
    _fbq?: unknown;
  }
}

let analyticsLoaded = false;
let marketingLoaded = false;

export function loadAnalyticsScripts(consent: ConsentState): void {
  // ─────────────────────────────────────────────────────────────
  // Google Analytics 4
  // ─────────────────────────────────────────────────────────────
  if (consent.analytics && !analyticsLoaded) {
    analyticsLoaded = true;

    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

    if (!GA_ID) return;

    // Inject GA script
    const script = document.createElement("script");

    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

    script.async = true;

    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];

    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

    window.gtag("js", new Date());

    window.gtag("config", GA_ID, {
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Meta Pixel
  // ─────────────────────────────────────────────────────────────
  if (consent.marketing && !marketingLoaded) {
    marketingLoaded = true;

    const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

    if (!FB_PIXEL_ID) return;

    if (!window.fbq) {
      const fbq = function (...args: unknown[]) {
        if (fbq.callMethod) {
          fbq.callMethod(...args);
        } else {
          fbq.queue?.push(args);
        }
      } as FbqFunction;

      fbq.queue = [];
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.push = fbq;

      window.fbq = fbq;

      const script = document.createElement("script");

      script.async = true;

      script.src =
        "https://connect.facebook.net/en_US/fbevents.js";

      const firstScript =
        document.getElementsByTagName("script")[0];

      firstScript?.parentNode?.insertBefore(
        script,
        firstScript
      );
    }

    window.fbq("init", FB_PIXEL_ID);

    window.fbq("track", "PageView");
  }

  // ─────────────────────────────────────────────────────────────
  // Revoke analytics consent
  // ─────────────────────────────────────────────────────────────
  if (!consent.analytics && window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
    });
  }

  // ─────────────────────────────────────────────────────────────
  // Revoke marketing consent
  // ─────────────────────────────────────────────────────────────
  if (!consent.marketing && window.gtag) {
    window.gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}