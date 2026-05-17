// ─── variants.ts ──────────────────────────────────────────────────────────────
// Framer Motion variant definitions.
// All easing and duration values come from transitions.ts — never hardcoded here.

import type { Variants } from "framer-motion";
import {
  EASE_EXPO_OUT,
  DUR,
  transitionFloat,
} from "@/lib/motion/transitions";

// ─── Navbar variants ───────────────────────────────────────────────────────────

export const navbarVariants: Variants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: DUR.slow,
      ease: [...EASE_EXPO_OUT],
    },
  },
};

export const navLinkVariants: Variants = {
  hidden: { y: -12, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3 + i * 0.07,
      duration: DUR.base,
      ease: [...EASE_EXPO_OUT],
    },
  }),
};

// ─── Mobile menu variants ──────────────────────────────────────────────────────

export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    transition: {
      duration: 0.45,
      ease: [0.76, 0, 0.24, 1], // intentional: specific menu close curve
    },
  },
  open: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: DUR.base + 0.05,
      ease: [...EASE_EXPO_OUT],
    },
  },
};

export const mobileLinkVariants: Variants = {
  closed: { x: -24, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.15 + i * 0.06,
      duration: DUR.base,
      ease: [...EASE_EXPO_OUT],
    },
  }),
};

export const mobileCtaVariants: Variants = {
  closed: { y: 16, opacity: 0 },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.45,
      duration: DUR.base,
      ease: [...EASE_EXPO_OUT],
    },
  },
};

// ─── Generic reveal variants ───────────────────────────────────────────────────
// Use `custom` prop to pass per-element delay: <motion.div custom={0.2} />

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DUR.slow,
      ease: [...EASE_EXPO_OUT],
      delay,
    },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: DUR.base + 0.1,
      ease: "easeOut",
      delay,
    },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: DUR.base + 0.1,
      ease: [...EASE_EXPO_OUT],
      delay,
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: DUR.fast,
      ease: "easeIn",
    },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DUR.slow,
      ease: [...EASE_EXPO_OUT],
      delay,
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// ─── Modal / overlay variants ──────────────────────────────────────────────────

export const backdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DUR.fast, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: DUR.instant, ease: "easeIn", delay: 0.05 },
  },
};

export const panelVariants: Variants = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: DUR.slow, ease: [...EASE_EXPO_OUT] },
  },
  exit: {
    opacity: 0, y: 18, scale: 0.97,
    transition: { duration: DUR.fast, ease: [0.7, 0, 0.84, 0] },
  },
};

// ─── Phone variants ────────────────────────────────────────────────────────────

/**
 * Float loop for the hero phone post-sequence.
 * Uses transitionFloat from transitions.ts — change it there to update globally.
 */
export const phoneFloat: Variants = {
  float: {
    y: [0, -12, 0],
    transition: {
      ...transitionFloat,
    },
  },
};

/**
 * Ambient glow pulse — applied to the inner glow div (not the GSAP-controlled outer).
 * GSAP handles the entry burst; this variant handles the steady-state loop.
 */
export const glowPulse: Variants = {
  pulse: {
    opacity: [0.4, 0.8, 0.4],
    scale: [0.95, 1.05, 0.95],
    transition: {
      duration: DUR.cinematic * 2 + 0.1, // ~2.5s
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ─── Screen transition variants (HeroPhone internal screens) ───────────────────

export const screenTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [...EASE_EXPO_OUT],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: DUR.fast,
      ease: "easeIn",
    },
  },
};