import FAQ from "@/components/sections/FAQ";
import Features from "@/components/sections/Features";
import FinalCTA from "@/components/sections/FinalCTA";
import ForProfessionalsPage from "@/components/sections/ForProfessionals";
import { HomeHero } from "@/components/sections/HomeHero";
import HowItWorks from "@/components/sections/HowItWorks";
import SocialProof from "@/components/sections/SocialProof";
import WaitlistCTA from "@/components/sections/WaitListCTA";

import { generateMetadata } from "@/lib/seo/metadata";
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "@/lib/seo/schemas";
import { buildSchemaGraph } from "@/lib/seo/schemas";

export const metadata = generateMetadata({
  title: "Trusted Home Services Platform",
  description:
    "Connect with trusted, verified home service professionals. TaskLync makes booking home services simple, fast, and reliable.",
  path: "/",
});

export default function HomePage() {
  const schema = buildSchemaGraph([
    buildOrganizationSchema(),
    buildWebsiteSchema(),
  ]);

  return (
    <>
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <main>
        <HomeHero/>
        <SocialProof />
        <HowItWorks />
        <Features />
        <ForProfessionalsPage />
        <WaitlistCTA />
        <FAQ />
        <FinalCTA />
      </main>
    </>
  );
}