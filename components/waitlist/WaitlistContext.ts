// components/waitlist/WaitlistContext.ts
import { createContext, useContext } from "react";

interface WaitlistContextValue {
  openModal: () => void;
}

export const WaitlistContext = createContext<WaitlistContextValue>({
  openModal: () => {},
});

export function useWaitlist() {
  return useContext(WaitlistContext);
}