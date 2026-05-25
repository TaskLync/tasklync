// types/contact.ts

export type ContactType = "support" | "press" | "partnerships" | "professional";

export interface ContactField {
  label: string;
  placeholder: string;
  required?: boolean;
}

export interface ContactRouting {
  to: string;
  subject: string;
}

export interface ContactAPIResponse {
  success: boolean;
  error?: string;
}