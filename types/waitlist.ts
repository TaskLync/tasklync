// types/waitlist.ts

export type WaitlistStep = "idle" | "loading" | "success" | "error";

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