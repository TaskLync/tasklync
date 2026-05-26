import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import PageHero from "@/components/sections/PageHero";
import ProfessionalRequirements from "@/components/sections/safety/Professionalrequirements";
import SafetyForProfessionals from "@/components/sections/safety/ProSafety";
import SafetyForHomeowners from "@/components/sections/safety/Safetyforhomeowners";
import VettingProcess from "@/components/sections/safety/VettingProcess";

import { generateMetadata } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from "@/lib/seo/schemas";

export const metadata = generateMetadata({
  title: "Safety & Trust Standards",
  description:
    "Every TaskLync professional is background-checked, licensed, and insured. Learn how we verify every pro before they enter your home.",
  path: "/safety",
});

export default function Page() {
  const schema = buildSchemaGraph([
    buildOrganizationSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Safety", url: "/safety" },
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
        breadcrumb="Safety"
        title="Your Safety Is the Product."
        subtitle="From verification to payments and dispute handling, TaskLync is built to keep both customers and professionals safe at every step."
      />

      <section className="bg-[#F7F7F5]">
        <div className="w-full">
          <VettingProcess />
          <ProfessionalRequirements />
          <SafetyForProfessionals />
          <SafetyForHomeowners />
          <FAQ />
          <FinalCTA />
        </div>
      </section>
    </main>
  );
}