import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/**
 * Marketing shell layout — used by the (marketing) route group.
 * File: app/(marketing)/layout.tsx
 *
 * Wraps all public marketing pages with the shared Header.
 * Add Footer here when ready.
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer/>
    </>
  );
}