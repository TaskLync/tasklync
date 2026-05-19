// lib/analytics/providers.ts
// Client-side only — every function guards against SSR

import type { DeviceType, AnalyticsEventPayload, ScrollSessionPayload } from '@/types/analytics'
import type { AnalyticsEventName } from './events'

// ─── Session ID ────────────────────────────────────────────────────────────
// Anonymous, per-browser-tab, stored in sessionStorage.
// No cookies. No PII. Fully GDPR-compliant.

export function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr'
  const KEY = 'tl_session'
  let id = sessionStorage.getItem(KEY)
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    sessionStorage.setItem(KEY, id)
  }
  return id
}

export function getDeviceType(): DeviceType {
  if (typeof window === 'undefined') return 'desktop'
  const w = window.innerWidth
  if (w < 768)  return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

export function getUTMContext() {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source:    p.get('utm_source')   ?? undefined,
    utm_medium:    p.get('utm_medium')   ?? undefined,
    utm_campaign:  p.get('utm_campaign') ?? undefined,
  }
}

// ─── Beacon sender ─────────────────────────────────────────────────────────
// sendBeacon guarantees delivery even when the tab closes.
// Falls back to fetch with keepalive.

function beacon(payload: object): void {
  const body = JSON.stringify(payload)
  const blob = new Blob([body], { type: 'application/json' })
  const sent = navigator.sendBeacon?.('/api/analytics', blob)
  if (!sent) {
    fetch('/api/analytics', {
      method:    'POST',
      body,
      headers:   { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(() => { /* analytics must never break the page */ })
  }
}

// ─── Public API — used by useAnalytics hook ────────────────────────────────

export function sendEvent(
  eventName: AnalyticsEventName,
  properties: Record<string, unknown> = {}
): void {
  if (typeof window === 'undefined') return

  const payload: AnalyticsEventPayload = {
    type:        'event',
    session_id:  getSessionId(),
    event_name:  eventName,
    properties,
    page_url:    window.location.pathname,
    referrer:    document.referrer || undefined,
    device_type: getDeviceType(),
    ...getUTMContext(),
  }

  beacon(payload)
}

export function sendScrollSession(data: {
  max_scroll_pct:   number
  sections_seen:    string[]
  time_on_page_sec: number
}): void {
  if (typeof window === 'undefined') return

  const payload: ScrollSessionPayload = {
    type:             'scroll',
    session_id:       getSessionId(),
    page_url:         window.location.pathname,
    device_type:      getDeviceType(),
    ...data,
  }

  beacon(payload)
}