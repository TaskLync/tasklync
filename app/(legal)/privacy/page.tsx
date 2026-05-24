import type { Metadata } from "next";
import LegalLayout from "@/components/layout/LegalLayout";
import { PRIVACY_SECTIONS } from "@/content/legal/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy — TaskLync",
  description:
    "How TaskLync collects, uses, stores, and protects your personal information. Compliant with PIPEDA, GDPR, and CCPA.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="24 May 2026"
      summary="We collect the minimum data needed to match homeowners with vetted professionals and to operate the platform safely. We do not sell your personal information. We do not share it with advertisers. This document explains exactly what we collect, why we collect it, and how long we keep it."
      sections={PRIVACY_SECTIONS}
    />
  );
}