import LegalLayout from "@/components/layout/LegalLayout";
import { TERMS_SECTIONS } from "@/content/legal/terms";

import { generateMetadata } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from "@/lib/seo/schemas";

export const metadata = generateMetadata({
  title: "Terms of Service",
  description:
    "The contractual terms governing use of the TaskLync platform for homeowners and service professionals.",
  path: "/terms",
  noindex: true,
});

export default function TermsPage() {
  const schema = buildSchemaGraph([
    buildOrganizationSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Terms of Service", url: "/terms" },
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
        title="Terms of Service"
        lastUpdated="24 May 2026"
        summary="These terms form the contract between you and TaskLync Inc. They apply to all users. Section 4 covers homeowner specific terms. Section 5 covers professional specific terms. If you use the platform, you have accepted these terms."
        sections={TERMS_SECTIONS}
      />
    </main>
  );
}