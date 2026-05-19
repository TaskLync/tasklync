// types/waitlist.ts

import type React from "react";

// ─────────────────────────────────────────────────────────────
// Shared enums/types
// ─────────────────────────────────────────────────────────────

export type UserType = "homeowner" | "professional";

export type WaitlistStep =
  | "idle"
  | "loading"
  | "success"
  | "error";

export type WaitlistStatus =
  | "pending"
  | "approved"
  | "rejected";

// ─────────────────────────────────────────────────────────────
// Frontend component props
// ─────────────────────────────────────────────────────────────

export interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export interface WaitlistFormProps {
  onSubmit: () => void;
  loading: boolean;
  error: string;
  email: string;
  setEmail: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  emailRef: React.RefObject<HTMLInputElement | null>;
}

// ─────────────────────────────────────────────────────────────
// Database row
// ─────────────────────────────────────────────────────────────

export interface WaitlistEntry {
  id: string;

  email: string;
  name: string | null;

  user_type: UserType;

  position: number;

  referral_code: string;
  referred_by: string | null;

  city: string | null;

  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;

  ip_address: string | null;
  user_agent: string | null;

  status: WaitlistStatus;

  created_at: string;
  updated_at: string;
}

// ─────────────────────────────────────────────────────────────
// API response
// ─────────────────────────────────────────────────────────────

export interface WaitlistAPIResponse {
  success: boolean;

  position?: number;

  referralCode?: string;

  alreadySignedUp?: boolean;

  error?: string;
}

// ─────────────────────────────────────────────────────────────
// Form submission payload
// ─────────────────────────────────────────────────────────────

export interface WaitlistSubmitPayload {
  email: string;

  name?: string;

  user_type: UserType;

  referred_by?: string;

  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;

  _honey: string;
}