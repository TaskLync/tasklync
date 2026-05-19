// lib/waitlist/validate.ts

import { z } from "zod";

// ─────────────────────────────────────────────────────────────
// Waitlist validation schema
// ─────────────────────────────────────────────────────────────

export const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .trim()
    .toLowerCase(),

  name: z
    .string()
    .max(100, "Name is too long")
    .optional()
    .transform((val) => val?.trim() || undefined),

  user_type: z
    .enum(["homeowner", "professional"])
    .default("homeowner"),

  referred_by: z
    .string()
    .max(20, "Invalid referral code")
    .optional(),

  // ───────────────────────────────────────────────────────────
  // Marketing attribution (UTM tracking)
  // ───────────────────────────────────────────────────────────

  utm_source: z.string().max(100).optional(),

  utm_medium: z.string().max(100).optional(),

  utm_campaign: z.string().max(100).optional(),

  utm_content: z.string().max(100).optional(),

  // ───────────────────────────────────────────────────────────
  // Honeypot anti-spam field
  // Must ALWAYS remain empty
  // ───────────────────────────────────────────────────────────

  _honey: z
    .string()
    .max(0, "Bot detected")
    .optional(),
});

// ─────────────────────────────────────────────────────────────
// Type inference
// ─────────────────────────────────────────────────────────────

export type WaitlistFormInput = z.infer<typeof waitlistSchema>;