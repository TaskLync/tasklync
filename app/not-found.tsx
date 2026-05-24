import Link from "next/link";

// ─── Metadata ────────────────────────────────────────────────────────────────
// Next.js App Router picks this up automatically for the 404 page
export const metadata = {
  title: "404 – Page Not Found | TaskLync",
  description: "This page doesn't exist. Head back home to find trusted local professionals.",
  robots: { index: false },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NotFound() {
  return (
    <>
      {/* Inline keyframe — only loaded on 404, zero runtime cost */}
      <style>{`
        @keyframes notFoundFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nf-anim { animation: notFoundFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      <main
        className="relative flex min-h-screen flex-col items-center justify-center bg-[#F7F7F2] overflow-hidden px-6 text-center"
        aria-label="404 – Page not found"
      >

        {/* Content */}
        <div className="relative z-10 flex max-w-130 flex-col items-center">

          {/* 404 */}
          <p
            className="nf-anim mb-5 select-none leading-[0.9] tracking-[-0.04em] font-bold"
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "clamp(7rem, 22vw, 10rem)",
              backgroundImage:
                "linear-gradient(135deg, #1F6F5F 0%, #2FA084 50%, #6FCF97 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animationDelay: "0.1s",
            }}
            aria-hidden // screen readers get the <h1> below
          >
            404
          </p>

          {/* Heading */}
          <h1
            className="nf-anim mb-3 text-[#0D1F1C] font-bold leading-[1.1] tracking-tight"
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              animationDelay: "0.18s",
            }}
          >
            This page took the day off.
          </h1>

          {/* CTA buttons */}
          <div
            className="nf-anim flex flex-wrap justify-center gap-3"
            style={{ animationDelay: "0.32s" }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-[14px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                fontFamily: "var(--font-body)",
                background:
                  "linear-gradient(135deg, #1F6F5F 0%, #2FA084 100%)",
                boxShadow: "0 4px 20px rgba(47,160,132,0.28)",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                <path
                  d="M2 7.5h11M8.5 3l4.5 4.5-4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to home
            </Link>
          </div>

          {/* Divider */}
          <div
            className="nf-anim my-8 h-px w-12 bg-[rgba(31,111,95,0.15)]"
            style={{ animationDelay: "0.38s" }}
          />
        </div>
      </main>
    </>
  );
}