// lib/contact/validate.ts

import { z } from "zod";

export const contactSchema = z.object({
  type: z.enum(["support", "press", "partnerships", "professional"]),
  fields: z.record(z.string(), z.string().max(5000)),
});

export type ContactPayload = z.infer<typeof contactSchema>;