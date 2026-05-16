"use client";

import { motion } from "framer-motion";

interface LogoMarkProps {
  size?: number;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function LogoMark({ size = 42 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tasklync-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>

      {/* T — top bar */}
      <motion.rect
        x="6"
        y="10"
        width="34"
        height="6"
        rx="3"
        fill="url(#tasklync-green)"
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{
          delay: 0.05,
          duration: 0.45,
          ease: EASE,
        }}
        style={{ transformOrigin: "23px 13px" }}
      />

      {/* T — vertical stem */}
      <motion.rect
        x="20"
        y="10"
        width="6"
        height="50"
        rx="3"
        fill="url(#tasklync-green)"
        initial={{ opacity: 0, scaleY: 0.4 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{
          delay: 0.15,
          duration: 0.5,
          ease: EASE,
        }}
        style={{ transformOrigin: "23px 35px" }}
      />

      {/* L — vertical stem */}
      <motion.rect
        x="34"
        y="24"
        width="6"
        height="36"
        rx="3"
        fill="url(#tasklync-green)"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 0.78, y: 0 }}
        transition={{
          delay: 0.28,
          duration: 0.5,
          ease: EASE,
        }}
      />

      {/* L — bottom bar */}
      <motion.rect
        x="34"
        y="54"
        width="26"
        height="6"
        rx="3"
        fill="url(#tasklync-green)"
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: 0.78, scaleX: 1 }}
        transition={{
          delay: 0.38,
          duration: 0.45,
          ease: EASE,
        }}
        style={{ transformOrigin: "47px 57px" }}
      />

      {/* Ambient glow pulse */}
      <motion.circle
        cx="36"
        cy="36"
        r="24"
        fill="url(#tasklync-green)"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: [0, 0.08, 0],
          scale: [0.8, 1.25, 1.5],
        }}
        transition={{
          delay: 1,
          duration: 2.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}