import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import HowItWorks from "@/components/sections/HowItWorks";
import PageHero from "@/components/sections/PageHero";
import ProSteps from "@/components/sections/ProSteps";
import WaitlistCTA from "@/components/sections/WaitListCTA";

import { generateMetadata } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from "@/lib/seo/schemas";

export const metadata = generateMetadata({
  title: "How TaskLync Works | Vetted Home Service Professionals",
  description:
    "TaskLync connects homeowners with licensed, background-checked professionals. Learn how the platform works for both homeowners and service professionals.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  const schema = buildSchemaGraph([
    buildOrganizationSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "How It Works", url: "/how-it-works" },
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
        breadcrumb="How It Works"
        title="How TaskLync works"
        subtitle="Get verified, get listed, and start receiving real customer bookings through a trusted, vetted platform built for service professionals."
      />

      <HowItWorks />
      <ProSteps />
      <WaitlistCTA />
      <FAQ />
      <FinalCTA />
    </main>
  );
}