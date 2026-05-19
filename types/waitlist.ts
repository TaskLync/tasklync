// types/waitlist.ts
import type React from "react";

export type WaitlistStep = "idle" | "loading" | "success" | "error";
export type WaitlistStatus = "pending" | "approved" | "rejected";

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
  emailRef: React.RefObject<HTMLInputElement | null>;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  position: number;
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

export interface WaitlistAPIResponse {
  success: boolean;
  position?: number;
  alreadySignedUp?: boolean;
  error?: string;
}

export interface WaitlistSubmitPayload {
  email: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  _honey: string;
}