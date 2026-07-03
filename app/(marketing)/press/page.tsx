import type { Metadata } from "next";

import PageHero from "@/components/sections/PageHero";
import PressKit from "@/components/sections/press/PressKit";
import PressMentions from "@/components/sections/press/PressMentions";
import CompanyBoilerplate from "@/components/sections/press/CompanyBoilerplate";

import { generateMetadata } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from "@/lib/seo/schemas";
import PressKitHero from "@/components/sections/press/PressKitHero";

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

      <PressKitHero/>
      <PressKit />
      <PressMentions />
      <CompanyBoilerplate />
    </main>
  );
}