import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import HowItWorks from "@/components/sections/HowItWorks";
import PageHero from "@/components/sections/PageHero";
import ServiceCategoryGrid from "@/components/sections/ServiceCategoryGrid";
import ServicesHero from "@/components/sections/ServiceHero";
import WaitlistCTA from "@/components/sections/WaitListCTA";

import { generateMetadata } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  buildBreadcrumbSchema,
} from "@/lib/seo/schemas";

export const metadata = generateMetadata({
  title: "Home Services & Task Categories",
  description:
    "From furniture assembly to plumbing basics, browse every home service TaskLync professionals handle. Book trusted local pros in your city.",
  path: "/services",
});

export default function Page() {
  const schema = buildSchemaGraph([
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
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
      <ServicesHero/>
      <section className="bg-[#F7F7F5]">
        <div className="w-full">
          <ServiceCategoryGrid />
          <HowItWorks />
          <WaitlistCTA />
          <FAQ />
          <FinalCTA />
        </div>
      </section>
    </main>
  );
}