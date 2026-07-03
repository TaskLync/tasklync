import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import PageHero from "@/components/sections/PageHero";
import PlatformBenefits from "@/components/sections/PlatformBenefits";
import ProfessionalsHero from "@/components/sections/ProfessionalsHero";
import ProSteps from "@/components/sections/ProSteps";
import WaitlistCTA from "@/components/sections/WaitListCTA";

import { generateMetadata } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from "@/lib/seo/schemas";

export const metadata = generateMetadata({
  title: "For Home Service Professionals",
  description:
    "Join TaskLync as a verified professional. Get reliable job leads, guaranteed payments, and a platform that works as hard as you do.",
  path: "/for-professionals",
});

export default function Page() {
  const schema = buildSchemaGraph([
    buildOrganizationSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "For Professionals", url: "/for-professionals" },
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

      <ProfessionalsHero/>

      <section className="bg-[#F7F7F5] pt-12">
        <div className="w-full">
          <ProSteps />
          <WaitlistCTA />
          <PlatformBenefits />
          <FAQ />
          <FinalCTA />
        </div>
      </section>
    </main>
  );
}