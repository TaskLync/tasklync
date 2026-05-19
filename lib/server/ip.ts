// lib/server/ip.ts

import { type NextRequest } from 'next/server'

/**
 * Extract the real client IP from a NextRequest.
 * Handles Vercel, Cloudflare, and standard proxy headers.
 */
export function getClientIP(req: NextRequest): string {
  // Cloudflare — most accurate when behind CF
  const cfIP = req.headers.get('cf-connecting-ip')
  if (cfIP) return cfIP.trim()

  // Vercel / standard proxy
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    // x-forwarded-for can be: "clientIP, proxy1, proxy2"
    // First entry is always the original client
    return forwarded.split(',')[0].trim()
  }

  // Vercel sets this header directly
  const realIP = req.headers.get('x-real-ip')
  if (realIP) return realIP.trim()

  return 'unknown'
}