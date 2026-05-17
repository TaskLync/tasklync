// components/waitlist/WaitlistProvider.tsx
"use client";

import { useWaitlistModal } from "@/hooks/useWaitlistForm";
import { WaitlistContext } from "./WaitlistContext";
import { WaitlistModal } from "./WaitlistModal";

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const { open, dismiss, openManual, markJoined } = useWaitlistModal();

  return (
    <WaitlistContext.Provider value={{ openModal: openManual }}>
      {children}
      <WaitlistModal
        open={open}
        onClose={dismiss}
        onSuccess={markJoined}
      />
    </WaitlistContext.Provider>
  );
}