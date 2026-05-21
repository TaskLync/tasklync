"use client";

// ─── Hero.tsx ──────────────────────────────────────────────────────────────────
// MOBILE PERFORMANCE PASS:
//
//  [M1] AmbientParticles disabled on mobile — canvas RAF loop on weak CPU = jank
//       Replaced with 6 static CSS dots (opacity + transform, zero JS)
//
//  [M2] Framer Motion removed from mobile headline/sub/cta — replaced with
//       CSS keyframe animations via className. Same fadeUp feel, zero JS cost.
//
//  [M3] SecondaryButton backdropFilter removed on mobile — compositor layer
//       for a small button isn't worth the GPU cost.
//
//  [M4] Blob divs hidden on mobile — radial-gradient blobs cause extra paint
//       layers. Not visible on small screens anyway.
//
//  [M5] Scroll cue infinite Framer loop moved to CSS animation — zero JS
//       after mount.
//
//  Desktop: completely unchanged. GSAP sequence + Framer parallax intact.

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
  fontDisplay: "'Clash Display', sans-serif",
  fontSerif:   "'Instrument Serif', serif",
  fontSans:    "'Cabinet Grotesk', sans-serif",
} as const;

type Phase = "idle" | "onboarding" | "search" | "map" | "booking" | "confirmed";

// ─── AmbientParticles — desktop only ─────────────────────────────────────────
// [M1] On mobile we render static CSS dots instead (see MobileParticles below)

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
    let cleanedUp = false;

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

// ─── MobileParticles — static CSS dots, zero JS after mount ──────────────────
// [M1] 6 hand-placed dots using CSS animation (compositor-only opacity pulse).
// No canvas, no RAF, no JS running per frame. Browser handles on GPU thread.

const MOBILE_DOTS = [
  { top: "18%", left: "8%",  size: 3, delay: "0s",    opacity: 0.18 },
  { top: "35%", left: "88%", size: 2, delay: "0.6s",  opacity: 0.14 },
  { top: "55%", left: "5%",  size: 2, delay: "1.1s",  opacity: 0.12 },
  { top: "70%", left: "92%", size: 3, delay: "0.3s",  opacity: 0.16 },
  { top: "82%", left: "20%", size: 2, delay: "0.9s",  opacity: 0.10 },
  { top: "25%", left: "75%", size: 2, delay: "1.4s",  opacity: 0.13 },
];

function MobileParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      {MOBILE_DOTS.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#1F6F5F]"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
            // CSS animation — compositor-only, zero JS
            animation: `heroDotPulse 3.5s ease-in-out ${d.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
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
  const [done,  setDone]  = useState(false);

  // Parallax tilt — desktop only
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING_GENTLE);
  const sy = useSpring(my, SPRING_GENTLE);

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

  // ── GSAP master timeline — desktop only, unchanged ───────────────────────────
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const phone   = phoneRef.current;
    const glow    = glowRef.current;
    const textCol = textColRef.current;
    const hl      = headlineRef.current;
    const sub     = subRef.current;
    const cta     = ctaRef.current;
    if (!phone || !glow || !textCol || !hl || !sub || !cta) return;

    const ease = `cubic-bezier(${EASE_EXPO_OUT.join(",")})`;

    gsap.set(phone, {
      yPercent: -200, rotateX: 25, rotateZ: -6,
      scale: 0.85, opacity: 0,
      transformPerspective: 1000,
      transformOrigin: "center center",
    });
    gsap.set(glow,    { opacity: 0, scale: 0.6 });
    gsap.set(textCol, { opacity: 0 });
    gsap.set([hl, sub, cta], { opacity: 0, y: 28 });

    const tl = gsap.timeline();

    tl
      .to(phone, {
        duration: DUR.epic,
        yPercent: 0, rotateX: 0, rotateZ: 0, scale: 1, opacity: 1,
        ease,
      }, GSAP_PHASES.phoneEnter)
      .to(phone, { duration: DUR.instant,     y: 16, ease: "power2.in"           }, GSAP_PHASES.phoneLand - 0.05)
      .to(phone, { duration: DUR.fast,         y: -9, ease: "elastic.out(1, 0.6)" }, GSAP_PHASES.phoneLand + 0.03)
      .to(phone, { duration: DUR.fast * 0.6,  y: 0,  ease: "power2.inOut"        }, GSAP_PHASES.phoneLand + 0.31)
      .to(glow, { duration: DUR.fast,  opacity: 1, scale: 1.9, ease: "power2.out" }, GSAP_PHASES.phoneLand)
      .to(glow, { duration: DUR.base,  opacity: 0, scale: 1,   ease: "power2.in"  }, GSAP_PHASES.phoneLand + 0.32)
      .call(() => setPhase("onboarding"), [], GSAP_PHASES.onboardingScreen)
      .call(() => setPhase("search"),     [], GSAP_PHASES.searchScreen)
      .call(() => setPhase("map"),        [], GSAP_PHASES.mapScreen)
      .call(() => setPhase("booking"),    [], GSAP_PHASES.bookingScreen)
      .call(() => setPhase("confirmed"),  [], GSAP_PHASES.confirmedScreen)
      .to(phone, {
        duration: DUR.cinematic,
        x: () => window.innerWidth * 0.22,
        yPercent: 0, scale: 0.88,
        ease,
      }, GSAP_PHASES.phoneSlideRight)
      .to(textCol, { duration: 0.01, opacity: 1 }, GSAP_PHASES.heroTextReveal)
      .to(hl,  { duration: DUR.slow,        opacity: 1, y: 0, ease }, GSAP_PHASES.heroTextReveal + DUR.instant)
      .to(sub, { duration: DUR.slow * 0.95, opacity: 1, y: 0, ease }, GSAP_PHASES.heroTextReveal + DUR.instant + DUR.fast * 1.5)
      .to(cta, { duration: DUR.base * 1.3,  opacity: 1, y: 0, ease }, GSAP_PHASES.heroTextReveal + DUR.instant + DUR.fast * 3)
      .call(() => setDone(true), [], GSAP_PHASES.sequenceDone);

    return () => { tl.kill(); };
  }, []);

  return (
    <>
      {/*
        [M2] CSS keyframes injected once — no runtime cost.
        heroDotPulse: for static mobile particles
        heroFadeUp:   replaces Framer fadeUp on mobile text elements
        heroLineGrow: replaces Framer scaleY loop on scroll cue
      */}
      <style>{`
        @keyframes heroDotPulse {
          0%, 100% { opacity: var(--dot-opacity, 0.14); }
          50%       { opacity: calc(var(--dot-opacity, 0.14) * 2.2); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroLineGrow {
          0%   { transform: scaleY(0); opacity: 0.6; }
          50%  { transform: scaleY(1); opacity: 1;   }
          100% { transform: scaleY(0); opacity: 0.4; }
        }
      `}</style>

      <section
        className="relative w-full overflow-hidden"
        style={{ minHeight: "100svh", background: STYLES.sectionBg }}
      >
        {/* noise — static, zero animation cost */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* grid — static */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(31,111,95,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(31,111,95,.6) 1px,transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        {/*
          [M4] Blobs — desktop only. On mobile they're invisible behind content
          and force extra compositing layers. Hidden via lg: class.
        */}
        <div
          className="pointer-events-none absolute left-[20%] top-[30%] hidden h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] lg:block"
          style={{ background: `radial-gradient(circle,${STYLES.brand400} 0%,transparent 70%)` }}
        />
        <div
          className="pointer-events-none absolute right-[15%] bottom-[20%] hidden h-87.5 w-87.5 rounded-full opacity-[0.12] lg:block"
          style={{ background: `radial-gradient(circle,${STYLES.brand600} 0%,transparent 70%)` }}
        />

        {/* [M1] Canvas particles — desktop only */}
        <div className="hidden lg:block">
          <AmbientParticles />
        </div>

        {/* [M1] Static CSS dots — mobile only, zero JS */}
        <div className="lg:hidden">
          <MobileParticles />
        </div>

        {/* ── PHONE — desktop only, unchanged ───────────────────────────────── */}
        <div
          className="pointer-events-none absolute inset-0 hidden items-center justify-center lg:flex"
          style={{ zIndex: 20, paddingTop: "80px" }}
        >
          <div
            ref={glowRef}
            className="absolute h-72 w-72 rounded-full"
            style={{ opacity: 0 }}
          >
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

          <div
            ref={phoneRef}
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
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

        {/* ── MOBILE layout ─────────────────────────────────────────────────── */}
        {/*
          [M2] All Framer motion.h1 / motion.p / motion.div replaced with
          plain elements + CSS animation (heroFadeUp keyframe).
          animation-fill-mode: both keeps opacity:0 before animation starts
          so there's no flash. animation-play-state ensures it only runs once.
        */}
        <div
          className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 text-center lg:hidden"
          style={{ paddingTop: "88px", paddingBottom: "2rem" }}
        >
          <h1
            style={{
              fontFamily: STYLES.fontDisplay,
              fontSize: "clamp(2.6rem,10vw,3.8rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: STYLES.ink,
              // CSS fadeUp — starts immediately, no JS parse needed
              animation: "heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both",
            }}
          >
            Every Task<br />
            <GradientSpan>Every Expert</GradientSpan>
            <br />On One Platform
          </h1>

          <p
            style={{
              fontFamily: STYLES.fontSerif,
              fontStyle: "italic",
              fontSize: "clamp(1rem,4vw,1.15rem)",
              lineHeight: 1.72,
              color: STYLES.inkMuted,
              marginTop: "1.4rem",
              maxWidth: 340,
              animation: "heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.18s both",
            }}
          >
            TaskLync connects you instantly with verified electricians, plumbers,
            mechanics, and more, available right now, in your city.
          </p>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
              animation: "heroFadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both",
            }}
          >
            <PrimaryButton>Join the Waitlist</PrimaryButton>
            <SecondaryButton>See how it works</SecondaryButton>
          </div>


        </div>

        {/* ── DESKTOP text column — revealed by GSAP, unchanged ─────────────── */}
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

        {/*
          [M5] Scroll cue — desktop only (already was), but the inner
          Framer infinite loop replaced with CSS animation.
          Same visual, zero JS running after mount.
        */}
        {done && (
          <div className="absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
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
            {/* [M5] CSS animation replaces Framer animate={{ scaleY:[0,1,0] }} */}
            <div
              style={{
                width: 1,
                height: 32,
                background: "linear-gradient(to bottom,rgba(31,111,95,0.5),transparent)",
                transformOrigin: "top",
                animation: "heroLineGrow 1.6s ease-in-out infinite",
              }}
            />
          </div>
        )}
      </section>
    </>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

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
        // Only transition opacity — cheapest possible hover
        transition: "opacity 0.15s",
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
        // [M3] backdropFilter removed on mobile — forces compositing layer
        // Add it back only on desktop via CSS media query if needed
        transition: "border-color 0.2s, color 0.2s",
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