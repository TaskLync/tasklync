import AboutHero from "@/components/sections/about/AboutHero";
import CompanyValues from "@/components/sections/about/CompanyValues";
import FoundingStory from "@/components/sections/about/FoundingStory";
import MissionStatement from "@/components/sections/about/MissionStatement";
import TeamCards from "@/components/sections/about/TeamCards";
import FinalCTA from "@/components/sections/FinalCTA";
import PageHero from "@/components/sections/PageHero";

import { generateMetadata } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  buildBreadcrumbSchema,
  buildOrganizationSchema,
} from "@/lib/seo/schemas";

export const metadata = generateMetadata({
  title: "About TaskLync | Who We Are and Why We Built This",
  description:
    "TaskLync was built because finding a reliable, vetted home professional should not be a gamble. Meet the team, learn our story, and understand why we operate the way we do.",
  path: "/about",
});

export default function AboutPage() {
  const schema = buildSchemaGraph([
    buildOrganizationSchema(),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
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

      <AboutHero/>

      <FoundingStory />
      <MissionStatement />
      <CompanyValues />
      <FinalCTA />
    </main>
  );
}