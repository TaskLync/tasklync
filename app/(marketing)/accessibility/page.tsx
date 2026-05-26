import AccessibilityFeedbackForm from "@/components/sections/accessibility/AccessibilityFeedbackForm";
import AccessibilityStatement from "@/components/sections/accessibility/AccessibilityStatement";
import ConformanceLevel from "@/components/sections/accessibility/ConformanceLevel";
import KnownLimitations from "@/components/sections/accessibility/KnownLimitations";
import PageHero from "@/components/sections/PageHero";

import { generateMetadata } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from "@/lib/seo/schemas";

export const metadata = generateMetadata({
  title: "Accessibility",
  description:
    "TaskLync's commitment to WCAG 2.2 AA accessibility, known limitations, assistive technology support, and how to report accessibility issues.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  const schema = buildSchemaGraph([
    buildOrganizationSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Accessibility", url: "/accessibility" },
    ]),
  ]);

  return (
    <main className="bg-white">
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <PageHero
        breadcrumb="Accessibility"
        title="Building a Platform That Works for Everyone"
        subtitle="TaskLync is designed with accessibility, readability, and usability in mind so homeowners and professionals can navigate the platform clearly across devices and assistive technologies."
      />

      <AccessibilityStatement />
      <ConformanceLevel />
      <KnownLimitations />
      <AccessibilityFeedbackForm />
    </main>
  );
}