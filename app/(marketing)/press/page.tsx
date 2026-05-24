import type { Metadata } from "next";
import PressHero from "@/components/sections/press/PressHero";
import PageHero from "@/components/sections/PageHero";
import PressKit from "@/components/sections/press/PressKit";

export const metadata: Metadata = {
  title: "Press — TaskLync",
  description:
    "Press kit, media assets, coverage, and contact information for journalists covering TaskLync.",
};

export default function PressPage() {
  return (
    <main>
      <PageHero
            breadcrumb="Press"
            title="News, Updates, and Company Information"
            subtitle="Find the latest announcements, company updates, brand resources, and media information related to TaskLync as we build a more trusted home services platform."
      />
      <PressHero />
      <PressKit/>
    </main>
  );
}