"use client";

// ─── Hero.tsx ──────────────────────────────────────────────────────────────────
// Issues fixed vs previous version:
//  [1] Font <style> import removed → use next/font in layout.tsx (see bottom comment)
//  [2] GSAP + Framer conflict resolved → wrapper pattern, never same element
//  [3] Canvas Strict Mode double-invoke guard added
//  [4] mousemove RAF-throttled via useCallback + ref
//  [5] Unused imports removed
//  [6] Repeated inline values extracted to STYLES constant
//  [7] GradientSpan extracted (was duplicated in mobile + desktop)

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import HeroPhone from "./HeroPhone";

import {
  GSAP_PHASES,
  DUR,
  EASE_EXPO_OUT,
  SPRING_GENTLE,
  transitionFloat,
} from "@/lib/motion/transitions";

import { fadeUp, phoneFloat, glowPulse } from "@/lib/motion/variants";

// ─── Style constants ───────────────────────────────────────────────────────────
// Values used in 2+ places live here. Change once, updates everywhere.

const STYLES = {
  sectionBg:
    "linear-gradient(155deg,#f0f7f4 0%,#e8f5f0 45%,#f2f9f6 75%,#edf7f3 100%)",
  brandGradient:
    "linear-gradient(100deg,#1F6F5F 0%,#2FA084 50%,#6FCF97 100%)",
  ink:      "#0D1F1C",
  inkMuted: "rgba(13,31,28,0.52)",
  inkFaint: "rgba(13,31,28,0.3)",
  brand600: "#1F6F5F",
  brand400: "#2FA084",
  // Font stacks — loaded via next/font in layout.tsx (see comment at bottom)
  fontDisplay: "'Clash Display', sans-serif",
  fontSerif:   "'Instrument Serif', serif",
  fontSans:    "'Cabinet Grotesk', sans-serif",
} as const;

// ─── Types ─────────────────────────────────────────────────────────────────────

type Phase = "idle" | "onboarding" | "search" | "map" | "booking" | "confirmed";

// ─── AmbientParticles ──────────────────────────────────────────────────────────

function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width  = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const pts = Array.from({ length: 70 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.2 + 0.3,
      a:  Math.random() * 0.25 + 0.05,
      vy: -(Math.random() * 0.3 + 0.08),
      vx: (Math.random() - 0.5) * 0.15,
    }));

    let raf: number;
    let cleanedUp = false; // FIX [3]: prevents double-loop in React Strict Mode

    const tick = () => {
      if (cleanedUp) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(31,111,95,${p.a})`;
        ctx.fill();
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
      }
      raf = requestAnimationFrame(tick);
    };

    tick();

    const onResize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cleanedUp = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-40"
    />
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

export default function Hero() {
  // GSAP refs — GSAP is the sole owner of these DOM nodes
  const phoneRef    = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null); // outer wrapper only
  const textColRef  = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("idle");
  const [done,  setDone]  = useState(false);

  // ── Parallax tilt (SPRING_GENTLE from transitions.ts) ────────────────────────
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING_GENTLE);
  const sy = useSpring(my, SPRING_GENTLE);

  // FIX [4]: RAF-throttled mousemove — caps at display refresh rate
  const pendingRaf = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (pendingRaf.current !== null) return;
      pendingRaf.current = requestAnimationFrame(() => {
        mx.set((e.clientX / window.innerWidth  - 0.5) * 14);
        my.set((e.clientY / window.innerHeight - 0.5) * 8);
        pendingRaf.current = null;
      });
    },
    [mx, my],
  );

  useEffect(() => {
    if (!done) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (pendingRaf.current !== null) cancelAnimationFrame(pendingRaf.current);
    };
  }, [done, handleMouseMove]);

  // ── GSAP master timeline ──────────────────────────────────────────────────────
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const phone   = phoneRef.current;
    const glow    = glowRef.current;
    const textCol = textColRef.current;
    const hl      = headlineRef.current;
    const sub     = subRef.current;
    const cta     = ctaRef.current;
    if (!phone || !glow || !textCol || !hl || !sub || !cta) return;

    // Build GSAP ease string once from the shared constant
    const ease = `cubic-bezier(${EASE_EXPO_OUT.join(",")})`;

    gsap.set(phone, {
      yPercent: -200, rotateX: 25, rotateZ: -6,
      scale: 0.85, opacity: 0,
      transformPerspective: 1000,
      transformOrigin: "center center",
    });
    // FIX [2]: GSAP only touches glowRef (the outer wrapper div)
    // Framer's glowPulse runs on the inner motion.div — zero overlap
    gsap.set(glow,    { opacity: 0, scale: 0.6 });
    gsap.set(textCol, { opacity: 0 });
    gsap.set([hl, sub, cta], { opacity: 0, y: 28 });

    const tl = gsap.timeline();

    tl
      // Phone enters from above
      .to(phone, {
        duration: DUR.epic,
        yPercent: 0, rotateX: 0, rotateZ: 0, scale: 1, opacity: 1,
        ease,
      }, GSAP_PHASES.phoneEnter)

      // Landing bounce
      .to(phone, { duration: DUR.instant,      y: 16, ease: "power2.in"           }, GSAP_PHASES.phoneLand - 0.05)
      .to(phone, { duration: DUR.fast,          y: -9, ease: "elastic.out(1, 0.6)" }, GSAP_PHASES.phoneLand + 0.03)
      .to(phone, { duration: DUR.fast * 0.6,   y: 0,  ease: "power2.inOut"        }, GSAP_PHASES.phoneLand + 0.31)

      // Glow burst — outer wrapper only; Framer pulse loop on inner div
      .to(glow, { duration: DUR.fast,  opacity: 1, scale: 1.9, ease: "power2.out" }, GSAP_PHASES.phoneLand)
      .to(glow, { duration: DUR.base,  opacity: 0, scale: 1,   ease: "power2.in"  }, GSAP_PHASES.phoneLand + 0.32)

      // Screen phase transitions
      .call(() => setPhase("onboarding"), [], GSAP_PHASES.onboardingScreen)
      .call(() => setPhase("search"),     [], GSAP_PHASES.searchScreen)
      .call(() => setPhase("map"),        [], GSAP_PHASES.mapScreen)
      .call(() => setPhase("booking"),    [], GSAP_PHASES.bookingScreen)
      .call(() => setPhase("confirmed"),  [], GSAP_PHASES.confirmedScreen)

      // Phone slides right
      .to(phone, {
        duration: DUR.cinematic,
        x: () => window.innerWidth * 0.22,
        yPercent: 0, scale: 0.88,
        ease,
      }, GSAP_PHASES.phoneSlideRight)

      // Text column reveals
      .to(textCol, { duration: 0.01, opacity: 1 }, GSAP_PHASES.heroTextReveal)
      .to(hl,  { duration: DUR.slow,        opacity: 1, y: 0, ease }, GSAP_PHASES.heroTextReveal + DUR.instant)
      .to(sub, { duration: DUR.slow * 0.95, opacity: 1, y: 0, ease }, GSAP_PHASES.heroTextReveal + DUR.instant + DUR.fast * 1.5)
      .to(cta, { duration: DUR.base * 1.3,  opacity: 1, y: 0, ease }, GSAP_PHASES.heroTextReveal + DUR.instant + DUR.fast * 3)

      .call(() => setDone(true), [], GSAP_PHASES.sequenceDone);

    return () => { tl.kill(); };
  }, []);

  return (
    // FIX [1]: <style> tag removed. Load fonts in layout.tsx via next/font.
    // See the setup comment at the bottom of this file.
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", background: STYLES.sectionBg }}
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
        style={{ background: `radial-gradient(circle,${STYLES.brand400} 0%,transparent 70%)` }}
      />
      <div
        className="pointer-events-none absolute right-[15%] bottom-[20%] h-87.5 w-87.5 rounded-full opacity-[0.12]"
        style={{ background: `radial-gradient(circle,${STYLES.brand600} 0%,transparent 70%)` }}
      />

      <AmbientParticles />

      {/* ── PHONE — desktop only ─────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex"
        style={{ zIndex: 20, paddingTop: "80px" }}
      >
        {/*
          FIX [2] — Wrapper ownership pattern:

          glowRef (plain div)          ← GSAP ONLY: entry burst (opacity, scale)
          └── motion.div               ← FRAMER ONLY: glowPulse loop after `done`

          phoneRef (plain div)         ← GSAP ONLY: enter, bounce, slide
          └── motion.div               ← FRAMER ONLY: parallax tilt + float loop

          Rule: each element is controlled by exactly one animation system.
          Handoff happens at `done = true` — GSAP has finished, Framer takes over.
        */}

        {/* Outer glow — GSAP entry burst */}
        <div
          ref={glowRef}
          className="absolute h-72 w-72 rounded-full"
          style={{ opacity: 0 }}
        >
          {/* Inner glow — Framer steady-state pulse loop */}
          <motion.div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle,rgba(47,160,132,0.45) 0%,transparent 70%)",
              filter: "blur(24px)",
            }}
            variants={glowPulse}
            animate={done ? "pulse" : undefined}
          />
        </div>

        {/* Outer phone — GSAP position/rotation/scale */}
        <div
          ref={phoneRef}
          style={{ opacity: 0, willChange: "transform, opacity" }}
        >
          {/* Inner phone — Framer parallax tilt + float after sequence */}
          {done ? (
            <motion.div
              style={{ x: sx, y: sy }}
              variants={phoneFloat}
              animate="float"
              transition={transitionFloat}
            >
              <HeroPhone phase={phase} />
            </motion.div>
          ) : (
            <HeroPhone phase={phase} />
          )}
        </div>
      </div>

      {/* ── MOBILE layout ─────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 text-center lg:hidden"
        style={{ paddingTop: "88px", paddingBottom: "2rem" }}
      >
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          style={{
            fontFamily: STYLES.fontDisplay,
            fontSize: "clamp(2.6rem,10vw,3.8rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: STYLES.ink,
          }}
        >
          Every Task<br />
          <GradientSpan>Every Expert</GradientSpan>
          <br />On One Platform
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.15}
          style={{
            fontFamily: STYLES.fontSerif,
            fontStyle: "italic",
            fontSize: "clamp(1rem,4vw,1.15rem)",
            lineHeight: 1.72,
            color: STYLES.inkMuted,
            marginTop: "1.4rem",
            maxWidth: 340,
          }}
        >
          TaskLync connects you instantly with verified electricians, plumbers,
          mechanics, and more, available right now, in your city.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.28}
          style={{
            marginTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "center",
          }}
        >
          <PrimaryButton>Join the Waitlist</PrimaryButton>
          <SecondaryButton>See how it works</SecondaryButton>
        </motion.div>
      </div>

      {/* ── DESKTOP text column — revealed by GSAP after sequence ─────────────── */}
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
              fontFamily: STYLES.fontDisplay,
              fontSize: "clamp(2.8rem,5vw,5rem)",
              fontWeight: 700,
              lineHeight: 1.03,
              letterSpacing: "-0.02em",
              color: STYLES.ink,
              opacity: 0,
            }}
          >
            Every Task<br />
            <GradientSpan>Every Expert</GradientSpan>
            <br />On One Platform
          </h1>

          <p
            ref={subRef}
            style={{
              fontFamily: STYLES.fontSerif,
              fontStyle: "italic",
              fontSize: "clamp(1rem,1.5vw,1.18rem)",
              lineHeight: 1.72,
              color: STYLES.inkMuted,
              marginTop: "1.5rem",
              maxWidth: 420,
              opacity: 0,
            }}
          >
            TaskLync connects you instantly with verified electricians, plumbers,
            mechanics, and more, available right now, in your city.
          </p>

          <div
            ref={ctaRef}
            style={{
              marginTop: "2.2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              opacity: 0,
            }}
          >
            <PrimaryButton>Join the Waitlist</PrimaryButton>
            <SecondaryButton>See how it works</SecondaryButton>
          </div>
        </div>
      </div>

      {/* bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24"
        style={{
          background: "linear-gradient(to bottom,transparent,rgba(240,247,244,0.9))",
        }}
      />

      {/* scroll cue — desktop, fades in via fadeUp after sequence completes */}
      {done && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        >
          <span
            style={{
              fontFamily: STYLES.fontSans,
              fontSize: 9,
              letterSpacing: "0.3em",
              color: STYLES.inkFaint,
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <motion.div
            style={{
              width: 1,
              height: 32,
              background: "linear-gradient(to bottom,rgba(31,111,95,0.5),transparent)",
            }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </section>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Brand gradient text — used in both mobile and desktop headlines (DRY) */
function GradientSpan({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        backgroundImage: STYLES.brandGradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        fontFamily: STYLES.fontSans,
        background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
        boxShadow:
          "0 0 28px rgba(47,160,132,0.25),inset 0 1px 0 rgba(255,255,255,0.15)",
        border: "none",
        borderRadius: 999,
        padding: "0.85rem 1.8rem",
        color: "#fff",
        fontSize: "0.875rem",
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        transition: "opacity .2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2 7h10M8 3l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        fontFamily: STYLES.fontSans,
        background: "rgba(13,31,28,0.05)",
        border: "1px solid rgba(13,31,28,0.15)",
        borderRadius: 999,
        padding: "0.85rem 1.8rem",
        color: STYLES.inkMuted,
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
        backdropFilter: "blur(8px)",
        transition: "border-color .2s,color .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(31,111,95,0.5)";
        e.currentTarget.style.color = STYLES.brand600;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(13,31,28,0.15)";
        e.currentTarget.style.color = STYLES.inkMuted;
      }}
    >
      {children}
    </button>
  );
}

/*
─── Font setup for layout.tsx (replaces the removed <style> tag) ───────────────

  Download font files from Fontshare (Clash Display, Cabinet Grotesk) and place
  them in public/fonts/. Instrument Serif loads from Google via next/font.

  // app/layout.tsx
  import localFont from "next/font/local";
  import { Instrument_Serif } from "next/font/google";

  const clashDisplay = localFont({
    src: [
      { path: "../public/fonts/ClashDisplay-Regular.woff2",  weight: "400" },
      { path: "../public/fonts/ClashDisplay-Medium.woff2",   weight: "500" },
      { path: "../public/fonts/ClashDisplay-Semibold.woff2", weight: "600" },
      { path: "../public/fonts/ClashDisplay-Bold.woff2",     weight: "700" },
    ],
    variable: "--font-clash",
    display: "swap",
  });

  const cabinetGrotesk = localFont({
    src: [
      { path: "../public/fonts/CabinetGrotesk-Regular.woff2", weight: "400" },
      { path: "../public/fonts/CabinetGrotesk-Medium.woff2",  weight: "500" },
      { path: "../public/fonts/CabinetGrotesk-Bold.woff2",    weight: "700" },
    ],
    variable: "--font-cabinet",
    display: "swap",
  });

  const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    style: ["normal", "italic"],
    variable: "--font-instrument",
    display: "swap",
  });

  export default function RootLayout({ children }) {
    return (
      <html
        className={`
          ${clashDisplay.variable}
          ${cabinetGrotesk.variable}
          ${instrumentSerif.variable}
        `}
      >
        <body>{children}</body>
      </html>
    );
  }

  Then update STYLES.fontDisplay/fontSans/fontSerif to use CSS variables:
    fontDisplay: "var(--font-clash), sans-serif"
    fontSans:    "var(--font-cabinet), sans-serif"
    fontSerif:   "var(--font-instrument), serif"
*/