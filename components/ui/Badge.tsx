// components/ui/Badge.tsx

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-surface-elevated text-content-secondary border border-white/10",

  success:
    "bg-green-500/10 text-green-400 border border-green-500/20",

  warning:
    "bg-amber-500/10 text-amber-400 border border-amber-500/20",

  error:
    "bg-red-500/10 text-red-400 border border-red-500/20",

  info:
    "bg-brand-primary/10 text-brand-primary border border-brand-primary/20",
};

export function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}