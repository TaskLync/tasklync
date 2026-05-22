import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import HowItWorks from "@/components/sections/HowItWorks";
import PageHero from "@/components/sections/PageHero";
import ServiceCategoryGrid from "@/components/sections/ServiceCategoryGrid";
import WaitlistCTA from "@/components/sections/WaitListCTA";
import { generateMetadata } from "@/lib/seo/metadata";

export const metadata = generateMetadata({
  title: "Home Services & Task Categories | TaskLync",
  description:
    "From furniture assembly to plumbing basics, browse every home service TaskLync professionals handle. Book trusted local pros in your city.",
  path: "/services",
});

export default function Page() {
  return (
    <main>
      <PageHero
        breadcrumb="Services"
        title="Every Home Service, One Platform."
        subtitle="From repairs to cleaning, connect with verified professionals ready to get the job done right."
      />

      <section className="bg-[#F7F7F5]">
        <div className="max-w-290 mx-auto px-6 sm:px-10 lg:px-16">
          <ServiceCategoryGrid/>
          <HowItWorks/>
          <WaitlistCTA/>
          <FAQ/>
          <FinalCTA/>
        </div>
      </section>
    </main>
  );
}