import type { Metadata } from "next";
import ContactHero from "@/components/sections/contact/ContactHero";
import PageHero from "@/components/sections/PageHero";
import ContactTypeSelector from "@/components/sections/contact/ContactTypeSelector";
// import ContactTypeSelector from "@/components/sections/contact/ContactTypeSelector";

export const metadata: Metadata = {
  title: "Contact — TaskLync",
  description:
    "Get in touch with the TaskLync team. Support, press, partnership, and professional onboarding enquiries each have a dedicated channel.",
  openGraph: {
    title: "Contact TaskLync",
    url: "https://tasklync.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
               breadcrumb="Contact"
               title="Talk to the TaskLync team"
               subtitle="Whether you have a question, partnership enquiry, support issue, or media request, our team is here to help and will get back to you as quickly as possible."
               />
      <ContactHero />
      <ContactTypeSelector/>
    </main>
  );
}