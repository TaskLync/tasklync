"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import HeroPhone from "./HeroPhone";

type Phase = "idle" | "onboarding" | "search" | "map" | "booking" | "confirmed";

// ─── Ambient particles ─────────────────────────────────────────────────────────
function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.25 + 0.05,
      vy: -(Math.random() * 0.3 + 0.08),
      vx: (Math.random() - 0.5) * 0.15,
    }));
    let raf: number;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(31,111,95,${p.a})`; ctx.fill();
        p.y += p.vy; p.x += p.vx;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 opacity-40" />;
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const phoneRef    = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const textColRef  = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [done, setDone]   = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 35, damping: 18 });
  const sy = useSpring(my, { stiffness: 35, damping: 18 });

  useEffect(() => {
    if (!done) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth  - 0.5) * 14);
      my.set((e.clientY / window.innerHeight - 0.5) * 8);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [done, mx, my]);

  useEffect(() => {
    // Only run the GSAP animation on desktop (lg = 1024px+)
    if (window.innerWidth < 1024) return;

    const phone   = phoneRef.current;
    const glow    = glowRef.current;
    const textCol = textColRef.current;
    const hl      = headlineRef.current;
    const sub     = subRef.current;
    const cta     = ctaRef.current;
    if (!phone || !glow || !textCol || !hl || !sub || !cta) return;

    gsap.set(phone, {
      // Start above the navbar — yPercent -200 but offset by navbar height (80px)
      yPercent: -200,
      rotateX: 25,
      rotateZ: -6,
      scale: 0.85,
      opacity: 0,
      transformPerspective: 1000,
      transformOrigin: "center center",
    });
    gsap.set(glow,    { opacity: 0, scale: 0.6 });
    gsap.set(textCol, { opacity: 0 });
    gsap.set([hl, sub, cta], { opacity: 0, y: 28 });

    const tl = gsap.timeline();

    tl.to(phone, { duration: 1.5, yPercent: 0, rotateX: 0, rotateZ: 0, scale: 1, opacity: 1, ease: "expo.out" }, 0.3)
      .to(phone, { duration: 0.08, y: 16,  ease: "power2.in"           }, 1.76)
      .to(phone, { duration: 0.28, y: -9,  ease: "elastic.out(1, 0.6)" }, 1.84)
      .to(phone, { duration: 0.18, y: 0,   ease: "power2.inOut"        }, 2.12)
      .to(glow,  { duration: 0.32, opacity: 1, scale: 1.9, ease: "power2.out" }, 1.8)
      .to(glow,  { duration: 0.55, opacity: 0, scale: 1,   ease: "power2.in"  }, 2.12)
      .call(() => setPhase("onboarding"), [], 2.7)
      .call(() => setPhase("search"),     [], 4.4)
      .call(() => setPhase("map"),        [], 7.2)
      .call(() => setPhase("booking"),    [], 9.8)
      .call(() => setPhase("confirmed"),  [], 11.4)
      .to(phone, {
        duration: 1.4,
        x: () => window.innerWidth * 0.22,
        yPercent: 0,
        scale: 0.88,
        ease: "expo.inOut",
      }, 12.0)
      .to(textCol, { duration: 0.01, opacity: 1 },                              12.5)
      .to(hl,      { duration: 0.85, opacity: 1, y: 0, ease: "expo.out" },     12.55)
      .to(sub,     { duration: 0.75, opacity: 1, y: 0, ease: "expo.out" },     13.0)
      .to(cta,     { duration: 0.65, opacity: 1, y: 0, ease: "expo.out" },     13.35)
      .call(() => setDone(true), [], 14.2);

    return () => { tl.kill(); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=cabinet-grotesk@400,500,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
      `}</style>

      <section
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "100svh",
          background: "linear-gradient(155deg, #f0f7f4 0%, #e8f5f0 45%, #f2f9f6 75%, #edf7f3 100%)",
        }}
      >
        {/* noise */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(31,111,95,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(31,111,95,.6) 1px,transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        {/* blobs */}
        <div
          className="pointer-events-none absolute left-[20%] top-[30%] h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18]"
          style={{ background: "radial-gradient(circle,#2FA084 0%,transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute right-[15%] bottom-[20%] h-87.5 w-87.5 rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle,#1F6F5F 0%,transparent 70%)" }}
        />

        <AmbientParticles />

        {/* ── PHONE — desktop only ─────────────────────────────────────
            hidden on mobile (<lg), block on desktop (lg+)
            paddingTop: 80px pushes the drop zone below the navbar
        ──────────────────────────────────────────────────────────── */}
        <div
          className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex"
          style={{ zIndex: 20, paddingTop: "80px" }}
        >
          {/* impact glow */}
          <div
            ref={glowRef}
            className="absolute h-72 w-72 rounded-full"
            style={{
              background: "radial-gradient(circle,rgba(47,160,132,0.45) 0%,transparent 70%)",
              filter: "blur(24px)",
              opacity: 0,
            }}
          />

          <div ref={phoneRef} style={{ opacity: 0, willChange: "transform, opacity" }}>
            {done ? (
              <motion.div
                style={{ x: sx, y: sy }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
              >
                <HeroPhone phase={phase} />
              </motion.div>
            ) : (
              <HeroPhone phase={phase} />
            )}
          </div>
        </div>

        {/* ── TEXT COLUMN ─────────────────────────────────────────────
            Desktop: opacity 0, GSAP fades it in after animation
            Mobile:  opacity 1 immediately, centered, full width
        ──────────────────────────────────────────────────────────── */}

        {/* MOBILE layout — visible only on <lg */}
        <div
          className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 text-center lg:hidden"
          style={{ paddingTop: "88px", paddingBottom: "2rem" }}
        >
          <h1
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: "clamp(2.6rem,10vw,3.8rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#0D1F1C",
            }}
          >
            Every Task<br />
            <span style={{
              backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 50%,#6FCF97 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Every Expert
            </span>
            <br />On One Platform
          </h1>

          <p
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontSize: "clamp(1rem,4vw,1.15rem)",
              lineHeight: 1.72,
              color: "rgba(13,31,28,0.52)",
              marginTop: "1.4rem",
              maxWidth: 340,
            }}
          >
            TaskLync connects you instantly with verified electricians, plumbers,
            mechanics, and more — available right now, in your city.
          </p>

          <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            {/* primary */}
            <button
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                boxShadow: "0 0 28px rgba(47,160,132,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                border: "none", borderRadius: 999,
                padding: "0.85rem 1.8rem",
                color: "#fff", fontSize: "0.875rem", fontWeight: 600,
                cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem",
                transition: "opacity .2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Join the Waitlist
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* secondary */}
            <button
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                background: "rgba(13,31,28,0.05)",
                border: "1px solid rgba(13,31,28,0.15)",
                borderRadius: 999, padding: "0.85rem 1.8rem",
                color: "rgba(13,31,28,0.6)", fontSize: "0.875rem", fontWeight: 500,
                cursor: "pointer", backdropFilter: "blur(8px)", transition: "border-color .2s,color .2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(31,111,95,0.5)";
                e.currentTarget.style.color = "#1F6F5F";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(13,31,28,0.15)";
                e.currentTarget.style.color = "rgba(13,31,28,0.6)";
              }}
            >
              See how it works
            </button>
          </div>
        </div>

        {/* DESKTOP layout — hidden on mobile, animated by GSAP */}
        <div
          ref={textColRef}
          className="relative z-10 hidden min-h-screen w-full items-center lg:flex"
          style={{
            opacity: 0,
            padding: "clamp(7rem,9vw,9rem) clamp(2rem,6vw,7rem) 0",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <h1
              ref={headlineRef}
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(2.8rem,5vw,5rem)",
                fontWeight: 700,
                lineHeight: 1.03,
                letterSpacing: "-0.02em",
                color: "#0D1F1C",
                opacity: 0,
              }}
            >
              Every Task<br />
              <span style={{
                backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 50%,#6FCF97 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Every Expert
              </span>
              <br />On One Platform
            </h1>

            <p
              ref={subRef}
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: "clamp(1rem,1.5vw,1.18rem)",
                lineHeight: 1.72,
                color: "rgba(13,31,28,0.52)",
                marginTop: "1.5rem",
                maxWidth: 420,
                opacity: 0,
              }}
            >
              TaskLync connects you instantly with verified electricians, plumbers,
              mechanics, and more — available right now, in your city.
            </p>

            <div
              ref={ctaRef}
              style={{ marginTop: "2.2rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", opacity: 0 }}
            >
              <button
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                  boxShadow: "0 0 28px rgba(47,160,132,0.25), inset 0 1px 0 rgba(255,255,255,0.15)",
                  border: "none", borderRadius: 999,
                  padding: "0.85rem 1.8rem",
                  color: "#fff", fontSize: "0.875rem", fontWeight: 600,
                  cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem",
                  transition: "opacity .2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Join the Waitlist
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  background: "rgba(13,31,28,0.05)",
                  border: "1px solid rgba(13,31,28,0.15)",
                  borderRadius: 999, padding: "0.85rem 1.8rem",
                  color: "rgba(13,31,28,0.6)", fontSize: "0.875rem", fontWeight: 500,
                  cursor: "pointer", backdropFilter: "blur(8px)", transition: "border-color .2s,color .2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(31,111,95,0.5)";
                  e.currentTarget.style.color = "#1F6F5F";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(13,31,28,0.15)";
                  e.currentTarget.style.color = "rgba(13,31,28,0.6)";
                }}
              >
                See how it works
              </button>
            </div>
          </div>
        </div>

        {/* bottom fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24"
          style={{ background: "linear-gradient(to bottom,transparent,rgba(240,247,244,0.9))" }}
        />

        {/* scroll cue — desktop only */}
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
          >
            <span style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: 9, letterSpacing: "0.3em",
              color: "rgba(13,31,28,0.3)", textTransform: "uppercase",
            }}>
              Scroll
            </span>
            <motion.div
              style={{
                width: 1, height: 32,
                background: "linear-gradient(to bottom,rgba(31,111,95,0.5),transparent)",
              }}
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </section>
    </>
  );
}