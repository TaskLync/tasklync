import type { Metadata } from "next";
import LegalLayout from "@/components/layout/LegalLayout";
import { TERMS_SECTIONS } from "@/content/legal/terms";

export const metadata: Metadata = {
  title: "Terms of Service — TaskLync",
  description:
    "The contractual terms governing use of the TaskLync platform for homeowners and service professionals.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="24 May 2026"
      summary="These terms form the contract between you and TaskLync Inc. They apply to all users. Section 4 covers homeowner-specific terms. Section 5 covers professional-specific terms. If you use the platform, you have accepted these terms."
      sections={TERMS_SECTIONS}
    />
  );
}