import type { ReactNode } from "react";

export interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  summary: string;
  sections: LegalSection[];
}

export default function LegalLayout({
  title,
  lastUpdated,
  summary,
  sections,
}: LegalLayoutProps) {
  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-b border-[rgba(31,111,95,0.1)] bg-[#F7F7F5] px-6 sm:px-10 lg:px-16 py-14">
        <div className="max-w-6xl mx-auto">
          <span
            className="inline-block mb-4 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Legal
          </span>

          <h1
            className="text-[#0D1F1C] font-bold tracking-[-0.03em] leading-[1.06] mb-4"
            style={{
              fontFamily: "var(--font-fredoka-one)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {title}
          </h1>

          <div
            className="text-[rgba(13,31,28,0.45)] text-[13px]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Last updated: {lastUpdated}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-8 py-14">
        {/* Summary */}
        <div className="bg-[rgba(31,111,95,0.05)] border border-[rgba(31,111,95,0.15)] rounded-2xl p-8 mb-12">
          <div
            className="text-[#1F6F5F] text-[11px] font-semibold uppercase tracking-[0.12em] mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Plain Language Summary
          </div>

          <p
            className="text-[#0D1F1C] text-[15px] leading-[1.75]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {summary}
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* TOC */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <div
                className="text-[#0D1F1C] text-[12px] font-semibold uppercase tracking-[0.08em] mb-4"
                style={{ fontFamily: "var(--font-fredoka-one)" }}
              >
                Contents
              </div>

              <nav className="space-y-1">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="block text-[rgba(13,31,28,0.55)] text-[13px] leading-[1.6] hover:text-[#1F6F5F] transition-colors py-1"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9 space-y-14">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2
                  className="text-[#0D1F1C] font-semibold text-[18px] tracking-[-0.02em] mb-5 pb-3 border-b border-[rgba(31,111,95,0.1)]"
                  style={{ fontFamily: "var(--font-fredoka-one)" }}
                >
                  {s.title}
                </h2>

                <div
                  className="text-[rgba(13,31,28,0.7)] text-[14px] leading-[1.85] space-y-4 [&_strong]:text-[#0D1F1C] [&_strong]:font-semibold [&_ul]:space-y-2 [&_ul]:list-none [&_ul_li]:pl-4 [&_ul_li]:relative [&_ul_li]:before:absolute [&_ul_li]:before:left-0 [&_ul_li]:before:content-['-'] [&_ul_li]:before:text-[#1F6F5F]"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {s.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}