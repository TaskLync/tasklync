import CompanyValues from "@/components/sections/about/CompanyValues";
import FoundingStory from "@/components/sections/about/FoundingStory";
import MissionStatement from "@/components/sections/about/MissionStatement";
import TeamCards from "@/components/sections/about/TeamCards";
import FinalCTA from "@/components/sections/FinalCTA";
import PageHero from "@/components/sections/PageHero";
import { generateMetadata } from "@/lib/seo/metadata";


export const metadata = generateMetadata({
  title: "About TaskLync — Who We Are and Why We Built This",
  description:
    "TaskLync was built because finding a reliable, vetted home professional should not be a gamble. Meet the team, learn our story, and understand why we operate the way we do.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
        <PageHero
                breadcrumb="About Us"
                title="Who We Are and Why We Built This"
                subtitle="TaskLync was built because finding a reliable, vetted home professional should be trustworthy."
              />
        <MissionStatement/>
        <FoundingStory/>
        <CompanyValues/>
        <FinalCTA/>
    </main>
  );
}