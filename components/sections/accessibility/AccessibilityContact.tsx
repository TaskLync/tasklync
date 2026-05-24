export default function AccessibilityContact() {
  return (
    <section className="bg-[#F7F7F5] py-20 px-6 sm:px-10 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              label: "Email",
              value: "accessibility@tasklync.com",
              href: "mailto:accessibility@tasklync.com",
              note: "Responds within 2 business days",
            },
            {
              label: "Enforcement",
              value: "Canadian Human Rights Commission",
              href: "https://www.chrc-ccdp.gc.ca",
              note: "If our response does not satisfy you",
            },
            {
              label: "Standard",
              value: "WCAG 2.2 Level AA",
              href: "https://www.w3.org/WAI/WCAG22/quickref/",
              note: "Our conformance target",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-[rgba(31,111,95,0.12)] rounded-xl p-6"
            >
              <div
                className="text-[#1F6F5F] text-[11px] font-semibold uppercase tracking-[0.1em] mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.label}
              </div>
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="text-[#0D1F1C] text-[14px] font-medium underline underline-offset-2 hover:text-[#1F6F5F] transition-colors block mb-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.value}
              </a>
              <div
                className="text-[rgba(13,31,28,0.45)] text-[12px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}