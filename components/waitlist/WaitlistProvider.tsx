// components/waitlist/WaitlistProvider.tsx
"use client";
import { useWaitlistModal } from "@/hooks/useWaitlistModal";
import { WaitlistContext } from "./WaitlistContext";
import { WaitlistModal } from "./WaitlistModal";

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const { open, dismiss, openManual, markJoined, isSignedUp } = useWaitlistModal();

  return (
    <WaitlistContext.Provider value={{ openModal: openManual }}>
      {children}
      <WaitlistModal
        open={open}
        onClose={dismiss}
        onSuccess={markJoined}
        startAtSuccess={isSignedUp}
      />
    </WaitlistContext.Provider>
  );
}