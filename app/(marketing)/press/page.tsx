import type { Metadata } from "next";

import PageHero from "@/components/sections/PageHero";
import PressHero from "@/components/sections/press/PressHero";
import PressKit from "@/components/sections/press/PressKit";
import PressMentions from "@/components/sections/press/PressMentions";
import CompanyBoilerplate from "@/components/sections/press/CompanyBoilerplate";
import PressContact from "@/components/sections/press/PressContact";

import { generateMetadata } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from "@/lib/seo/schemas";

export const metadata = generateMetadata({
  title: "TaskLync Press Kit",
  description:
    "Press kit, media assets, coverage, and contact information for journalists covering TaskLync.",
  path: "/press",
});

export default function PressPage() {
  const schema = buildSchemaGraph([
    buildOrganizationSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Press", url: "/press" },
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
        breadcrumb="Press"
        title="News, Updates, and Company Information"
        subtitle="Find the latest announcements, company updates, brand resources, and media information related to TaskLync as we build a more trusted home services platform."
      />

      <PressHero />
      <PressKit />
      <PressMentions />
      <CompanyBoilerplate />
      <PressContact />
    </main>
  );
}