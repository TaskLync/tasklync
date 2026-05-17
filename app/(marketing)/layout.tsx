// app/(marketing)/layout.tsx
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WaitlistProvider } from "@/components/waitlist/WaitlistProvider";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <WaitlistProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </WaitlistProvider>
  );
}