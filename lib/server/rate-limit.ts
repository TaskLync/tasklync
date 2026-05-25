// lib/server/rate-limit.ts
// Server-only — never import in 'use client' files

import { Ratelimit } from '@upstash/ratelimit'
import { Redis }     from '@upstash/redis'

// Single shared Redis connection
const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

/**
 * Waitlist endpoint: strict
 * 5 submissions per IP per 10 minutes
 * Prevents spam signups and credential stuffing
 */
export const waitlistRateLimit = new Ratelimit({
  redis,
  limiter:   Ratelimit.slidingWindow(5, '10 m'),
  analytics: true,
  prefix:    'tl_rl_waitlist',
})

/**
 * Analytics endpoint: permissive
 * 300 events per session per minute
 * Prevents beacon floods but allows heavy scroll tracking
 */
export const analyticsRateLimit = new Ratelimit({
  redis,
  limiter:   Ratelimit.slidingWindow(300, '1 m'),
  analytics: false,
  prefix:    'tl_rl_analytics',
})

/**
 * Contact endpoint: strict per-IP
 * 3 submissions per IP per 24 hours across all contact types
 */
export const contactRateLimit = new Ratelimit({
  redis,
  limiter:   Ratelimit.slidingWindow(3, '24 h'),
  analytics: true,
  prefix:    'tl_rl_contact',
})