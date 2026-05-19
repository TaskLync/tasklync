// lib/waitlist/validate.ts
import { z } from "zod";

export const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
  utm_content: z.string().max(100).optional(),

  _honey: z.string().max(0, "bot").optional(),
});

export type WaitlistFormInput = z.infer<typeof waitlistSchema>;