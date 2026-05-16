"use client";
import { useEffect, useRef, useState } from "react";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Counter({ target, duration = 1600 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      current += step;
      if (current >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(current));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return <span ref={ref}>{val.toLocaleString()}</span>;
}

const stats = [
  { num: <><Counter target={7} />×</>,  label: "Verification Steps"  },
  { num: <><Counter target={60} />s</>, label: "Avg. Booking Time"   },
  { num: <><Counter target={94} />%</>, label: "Pro Acceptance Rate" },
  { num: <>3</>,                         label: "Steps to Book"       },
  { num: <>Always</>,                    label: "Escrow Protected"    },
];

export default function SocialProof() {
  const { ref, inView } = useInView();

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@700&f[]=cabinet-grotesk@400,500&display=swap');

        .sp-grid {
          display: flex;
          align-items: stretch;
        }

        .sp-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.2rem 1rem;
        }

        .sp-item:not(:last-child) {
          border-right: 1px solid rgba(31,111,95,0.10);
        }

        /* Mobile: 2-column grid, max 3 rows */
        @media (max-width: 640px) {
          .sp-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          .sp-item {
            padding: 1.5rem 0.75rem;
            border-right: none !important;
          }

          /* right column items get left border */
          .sp-item:nth-child(even) {
            border-left: 1px solid rgba(31,111,95,0.10) !important;
          }

          /* top-row items get bottom border */
          .sp-item:nth-child(1),
          .sp-item:nth-child(2),
          .sp-item:nth-child(3),
          .sp-item:nth-child(4) {
            border-bottom: 1px solid rgba(31,111,95,0.10);
          }

          /* last item (5th) spans full width */
          .sp-item:last-child {
            grid-column: 1 / -1;
            border-left: none !important;
            border-top: none;
          }
        }
      `}</style>

      <div
        ref={ref}
        style={{
          background: "#F7F7F5",
          borderTop: "1px solid rgba(31,111,95,0.10)",
          borderBottom: "1px solid rgba(31,111,95,0.10)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(1rem, 5vw, 4rem)",
          }}
        >
          <div className="sp-grid">
            {stats.map((s, i) => (
              <div
                key={i}
                className="sp-item"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.55s ease ${i * 80}ms, transform 0.55s ease ${i * 80}ms`,
                }}
              >
                <div style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "clamp(1.4rem, 2.8vw, 2.5rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "#1F6F5F",
                  marginBottom: "0.5rem",
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 500,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "rgba(31,111,95,0.45)",
                  textAlign: "center",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}