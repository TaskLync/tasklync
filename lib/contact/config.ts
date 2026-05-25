// lib/contact/config.ts
// Pure data — no React, no server imports, safe everywhere

import type { ContactField, ContactRouting, ContactType } from "@/types/contact";

// ─── Field configs ────────────────────────────────────────────────────────────

export const fieldConfigs: Record<ContactType, ContactField[]> = {
  support: [
    { label: "Your name",      placeholder: "Full name" },
    { label: "Email address",  placeholder: "you@example.com" },
    { label: "Subject",        placeholder: "e.g. Waitlist registration, booking question" },
    { label: "Message",        placeholder: "Describe your issue in detail" },
  ],
  press: [
    { label: "Your name",               placeholder: "Full name" },
    { label: "Publication or outlet",   placeholder: "e.g. Toronto Star, BetaKit" },
    { label: "Email address",           placeholder: "you@publication.com" },
    { label: "Deadline (if applicable)", placeholder: "e.g. Friday 5pm EST", required: false },
    { label: "What are you working on?", placeholder: "Brief description of the story or angle" },
  ],
  partnerships: [
    { label: "Your name",                    placeholder: "Full name" },
    { label: "Company name",                 placeholder: "Organisation you represent" },
    { label: "Your role",                    placeholder: "e.g. VP Partnerships, CEO" },
    { label: "Email address",                placeholder: "you@company.com" },
    { label: "Partnership type",             placeholder: "e.g. Insurance, real estate, property management" },
    { label: "Tell us about the opportunity", placeholder: "What does the partnership look like from your side?" },
  ],
  professional: [
    { label: "Your name",          placeholder: "Full name" },
    { label: "Email address",      placeholder: "you@example.com" },
    { label: "Trade or service type", placeholder: "e.g. Licensed plumber, electrician" },
    { label: "Your question",      placeholder: "What do you need to know before applying?" },
  ],
};

// ─── Form titles ──────────────────────────────────────────────────────────────

export const contactTitles: Record<ContactType, string> = {
  support:       "Send a support message",
  press:         "Send a press enquiry",
  partnerships:  "Send a partnership enquiry",
  professional:  "Ask about professional onboarding",
};

// ─── Email routing ────────────────────────────────────────────────────────────
// Used by the API route only, but lives here so adding a new contact type
// means updating one file, not hunting across config and route files.

export const contactRouting: Record<ContactType, ContactRouting> = {
  support: {
    to:      "quickbite234@gmail.com",
    subject: "New Support Enquiry — TaskLync Contact Form",
  },
  press: {
    to:      "press@tasklync.com",
    subject: "New Press Enquiry — TaskLync Contact Form",
  },
  partnerships: {
    to:      "partnerships@tasklync.com",
    subject: "New Partnership Enquiry — TaskLync Contact Form",
  },
  professional: {
    to:      "onboarding@tasklync.com",
    subject: "New Professional Onboarding Enquiry — TaskLync Contact Form",
  },
};

// ─── Field name helper ────────────────────────────────────────────────────────
// Converts a label string to a safe HTML name attribute.
// "Email address" => "email_address"

export function labelToFieldName(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/, "");
}

// ─── Textarea detection ───────────────────────────────────────────────────────
// Determines whether a field should render as a textarea vs input.

const TEXTAREA_KEYWORDS = ["message", "question", "working on", "opportunity"];

export function isTextareaField(label: string): boolean {
  const lower = label.toLowerCase();
  return TEXTAREA_KEYWORDS.some((kw) => lower.includes(kw));
}