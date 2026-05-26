import LegalLayout from "@/components/layout/LegalLayout";
import { PRIVACY_SECTIONS } from "@/content/legal/privacy";

import { generateMetadata } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from "@/lib/seo/schemas";

export const metadata = generateMetadata({
  title: "Privacy Policy",
  description:
    "How TaskLync collects, uses, stores, and protects your personal information. Compliant with PIPEDA, GDPR, and CCPA.",
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  const schema = buildSchemaGraph([
    buildOrganizationSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Privacy Policy", url: "/privacy" },
    ]),
  ]);

  return (
    <main>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <LegalLayout
        title="Privacy Policy"
        lastUpdated="24 May 2026"
        summary="We collect the minimum data needed to match homeowners with vetted professionals and to operate the platform safely. We do not sell your personal information. We do not share it with advertisers. This document explains exactly what we collect, why we collect it, and how long we keep it."
        sections={PRIVACY_SECTIONS}
      />
    </main>
  );
}