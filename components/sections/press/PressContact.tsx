export default function PressContact() {
  return (
    <section className="bg-[#F7F7F5] py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <span
              className="inline-block mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Get In Touch
            </span>
            <h2
              className="text-[#0D1F1C] font-bold leading-[1.1] tracking-[-0.03em] mb-6"
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)",
              }}
            >
              Working on a story?
            </h2>
            <p
              className="text-[rgba(13,31,28,0.6)] text-[14.5px] leading-[1.8] mb-5"
              style={{ fontFamily: "var(--font-body)" }}
            >
              We are available for interviews, background briefings, and
              product demonstrations. We do not operate an embargo system
              but we are happy to discuss timing that works for your
              publication.
            </p>
            <p
              className="text-[rgba(13,31,28,0.6)] text-[14.5px] leading-[1.8]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              If you need a custom asset, a specific data point, or a
              comment on deadline, email{" "}
              <a
                href="mailto:press@tasklync.pk"
                className="text-[#1F6F5F] underline underline-offset-2"
              >
                press@tasklync.pk
              </a>
              . We respond to media enquiries within 4 business hours
              during EST working hours (Monday to Friday, 9am to 6pm EST).
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                type: "General press enquiries",
                value: "press@tasklync.pk",
                href: "mailto:press@tasklync.pk",
              },
              {
                type: "Interview requests",
                value: "press@tasklync.pk",
                href: "mailto:press@tasklync.pk",
              },
              {
                type: "Investor and analyst enquiries",
                value: "investors@tasklync.pk",
                href: "mailto:investors@tasklync.pk",
              },
              {
                type: "Partnership and business development",
                value: "partnerships@tasklync.pk",
                href: "mailto:partnerships@tasklync.pk",
              },
            ].map((contact) => (
              <div
                key={contact.type}
                className="bg-white border border-[rgba(31,111,95,0.12)] rounded-xl p-5 flex items-center justify-between"
              >
                <div>
                  <div
                    className="text-[rgba(13,31,28,0.5)] text-[12px] mb-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {contact.type}
                  </div>
                  <a
                    href={contact.href}
                    className="text-[#0D1F1C] text-[14px] font-medium hover:text-[#1F6F5F] transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {contact.value}
                  </a>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-[rgba(13,31,28,0.25)] flex-shrink-0"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}