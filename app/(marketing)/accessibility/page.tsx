import AccessibilityContact from "@/components/sections/accessibility/AccessibilityContact";
import AccessibilityFeedbackForm from "@/components/sections/accessibility/AccessibilityFeedbackForm";
import AccessibilityStatement from "@/components/sections/accessibility/AccessibilityStatement";
import ConformanceLevel from "@/components/sections/accessibility/ConformanceLevel";
import KnownLimitations from "@/components/sections/accessibility/KnownLimitations";
import PageHero from "@/components/sections/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility — TaskLync",
  description:
    "TaskLync's commitment to WCAG 2.2 AA accessibility, known limitations, assistive technology support, and how to report accessibility issues.",
};

export default function AccessibilityPage() {
  return (
    <main className="bg-white">
        <PageHero
                 breadcrumb="Accessibility"
                 title="Building a Platform That Works for Everyone"
                 subtitle="TaskLync is designed with accessibility, readability, and usability in mind so homeowners and professionals can navigate the platform clearly across devices and assistive technologies."
        />
        <AccessibilityStatement />
        <ConformanceLevel/>
        <KnownLimitations/>
        <AccessibilityFeedbackForm/>
        <AccessibilityContact/>
    </main>
  );
}