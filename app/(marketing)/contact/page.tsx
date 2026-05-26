import ContactHero from "@/components/sections/contact/ContactHero";
import PageHero from "@/components/sections/PageHero";
import ContactTypeSelector from "@/components/sections/contact/ContactTypeSelector";

import { generateMetadata } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from "@/lib/seo/schemas";

export const metadata = generateMetadata({
  title: "Contact",
  description:
    "Get in touch with the TaskLync team. Support, press, partnership, and professional onboarding enquiries each have a dedicated channel.",
  path: "/contact",
});

export default function ContactPage() {
  const schema = buildSchemaGraph([
    buildOrganizationSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact" },
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

      <PageHero
        breadcrumb="Contact"
        title="Talk to the TaskLync team"
        subtitle="Whether you have a question, partnership enquiry, support issue, or media request, our team is here to help and will get back to you as quickly as possible."
      />

      <ContactHero />
      <ContactTypeSelector />
    </main>
  );
}