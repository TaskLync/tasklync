export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const NAV_LINKS: NavItem[] = [
  { label: "Services", href: "/services", description: "Browse all home services" },
  { label: "Professionals", href: "/for-professionals", description: "Join as a pro" },
  { label: "How It Works", href: "/how-it-works", description: "See how TaskLync works" },
  { label: "Safety", href: "/safety", description: "Trust & safety standards" },
  { label: "Pricing", href: "/pricing", description: "Simple, transparent pricing" },
];