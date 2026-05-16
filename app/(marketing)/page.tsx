import FAQ from "@/components/sections/FAQ";
import Features from "@/components/sections/Features";
import FinalCTA from "@/components/sections/FinalCTA";
import ForProfessionalsPage from "@/components/sections/ForProfessionals";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import SocialProof from "@/components/sections/SocialProof";
import WaitlistCTA from "@/components/sections/WaitListCTA";




export default function HomePage() {
  return(
    <div>
      <Hero/>
      <SocialProof/>
      <HowItWorks/>
      <Features/>
      <ForProfessionalsPage/>
      <WaitlistCTA/>
      <FAQ/>
      <FinalCTA/>
    </div>
  );
}