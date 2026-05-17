// lib/waitlist/validate.ts
import { z } from "zod";

export const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email address.")
    .email("That doesn't look like a valid email."),
  name: z.string().optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;