import type { ContactType } from "./ContactTypeSelector";

const faqs: Record<ContactType, { q: string; a: string }[]> = {
  support: [
    {
      q: "I joined the waitlist. How and when will I get access?",
      a: "TaskLync is currently rolling out in controlled phases. Access is granted in batches based on location, demand, and service availability. Once your area is activated, you will receive an email with onboarding instructions.",
    },
    {
      q: "I signed up but did not receive any confirmation email.",
      a: "Please check your spam or promotions folder first. If it is not there, your submission may not have completed successfully. You can re-join the waitlist at tasklync.pk/waitlist and you will receive a confirmation shortly after submission.",
    },
    {
      q: "What happens if I have an issue with a booking or service?",
      a: "Once the platform is live in your area, all booking-related disputes are handled through the TaskLync resolution system. For pre-launch inquiries, select Support in this form and our team will guide you on how the process will work.",
    },
  ],

  press: [
    {
      q: "Do you have official press materials available?",
      a: "Yes. Our press kit includes logos, founder information, product screenshots, company descriptions in multiple formats, and key platform facts. It is available at tasklync.pk/press.",
    },
    {
      q: "Can I interview the founders or leadership team?",
      a: "Yes. TaskLync leadership is available for media interviews. Please contact press@tasklync.pk with your publication details, deadline, and topic focus. Our media team typically responds within one business day.",
    },
    {
      q: "Do you offer exclusives or embargoed announcements?",
      a: "We occasionally coordinate embargoed updates or exclusives on a case-by-case basis depending on timing and publication reach. Please include your request details in your message.",
    },
  ],

  partnerships: [
    {
      q: "What types of partnerships does TaskLync support?",
      a: "We work with organisations across real estate, insurance, property management, and home services ecosystems. Any business that regularly connects customers with home-related services is a potential partner.",
    },
    {
      q: "How do referral partnerships work?",
      a: "Partners refer customers who need verified home professionals. TaskLync handles vetting, matching, scheduling, and payment flow. Partnership models may include referral fees, integration support, or co-marketing depending on scale.",
    },
    {
      q: "We are a large organisation. Who should we contact?",
      a: "Enterprise partnership requests are handled directly by our partnerships team. Please submit your enquiry through this form and select Partnerships. Your message will be routed to the appropriate contact.",
    },
  ],

  professional: [
    {
      q: "How do I apply to become a TaskLync professional?",
      a: "Applications are submitted through tasklync.pk/for-professionals. All professionals go through a structured vetting process that includes identity verification, background screening, licence validation, and insurance checks.",
    },
    {
      q: "Is there a fee to join TaskLync?",
      a: "There is no application fee. TaskLync earns a service fee per completed booking. The full fee structure is shared during onboarding before your profile is activated.",
    },
    {
      q: "What if my application is not approved?",
      a: "If your application is not approved, you may request a review by emailing appeals@tasklync.pk within 14 days. Include any additional documentation relevant to the stage where your application did not pass. We respond within 10 business days.",
    },
  ],
};

export default function ContactFAQ({ type }: { type: ContactType }) {
  const items = faqs[type];

  return (
    <div>
      <div
        className="text-[#0D1F1C] font-semibold text-[13px] uppercase tracking-[0.08em] mb-5"
        style={{ fontFamily: "var(--font-clash)" }}
      >
        Common questions
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.q}
            className="border border-[rgba(31,111,95,0.1)] rounded-xl p-5 bg-white"
          >
            <div
              className="text-[#0D1F1C] font-medium text-[13.5px] leading-snug mb-2"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              {item.q}
            </div>
            <p
              className="text-[rgba(13,31,28,0.6)] text-[13px] leading-[1.7]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}