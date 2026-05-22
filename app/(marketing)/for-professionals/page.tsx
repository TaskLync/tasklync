import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import PageHero from "@/components/sections/PageHero";
import PlatformBenefits from "@/components/sections/PlatformBenefits";
import ProSteps from "@/components/sections/ProSteps";
import WaitlistCTA from "@/components/sections/WaitListCTA";
import { generateMetadata } from "@/lib/seo/metadata";

export const metadata = generateMetadata({
  title: "For Home Service Professionals | TaskLync",
  description:
    "Join TaskLync as a verified professional. Get reliable job leads, guaranteed payments, and a platform that works as hard as you do.",
  path: "/for-professionals",
});

export default function Page() {
  return (
    <main>
      <PageHero
        breadcrumb="For Professionals"
        title="Build your business. We’ll handle the rest."
        subtitle="Get verified, get discovered, and get booked without cold calls, chasing clients, or waiting for referrals."
      />

      <section className="bg-[#F7F7F5] pt-12">
        <div className="max-w-290 mx-auto px-6 sm:px-10 lg:px-16">
          <ProSteps/>
          <WaitlistCTA/>
          <PlatformBenefits/>
          <FAQ/>
          <FinalCTA/>
        </div>
      </section>
    </main>
  );
}