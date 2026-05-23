import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import PageHero from "@/components/sections/PageHero";
import ProfessionalRequirements from "@/components/sections/safety/Professionalrequirements";
import SafetyForProfessionals from "@/components/sections/safety/ProSafety";
import ProfessionalSafety from "@/components/sections/safety/ProSafety";
import SafetyForHomeowners from "@/components/sections/safety/Safetyforhomeowners";
import VettingProcess from "@/components/sections/safety/VettingProcess";
import { generateMetadata } from "@/lib/seo/metadata";


export const metadata = generateMetadata({
  title: "Safety & Trust Standards | TaskLync",
  description:
    "Every TaskLync professional is background-checked, licensed, and insured. Learn how we verify every pro before they enter your home.",
  path: "/safety",
});

export default function Page() {
  return (
    <main>
      <PageHero
        breadcrumb="Safety"
        title="Your Safety Is the Product."
        subtitle="From verification to payments and dispute handling, TaskLync is built to keep both customers and professionals safe at every step."
      />

      <section className="bg-[#F7F7F5]">
        <div className="w-full mx-auto px-6 sm:px-10 lg:px-16">
            <VettingProcess/>
            <ProfessionalRequirements/>
            <SafetyForProfessionals/>
            <SafetyForHomeowners/>
            <FAQ/>
            <FinalCTA/>
        </div>
      </section>
    </main>
  );
}