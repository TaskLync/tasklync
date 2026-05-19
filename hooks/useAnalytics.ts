// hooks/useAnalytics.ts
'use client'

import { useCallback, useEffect, useRef } from 'react'
import { sendEvent, sendScrollSession }   from '@/lib/analytics/providers'
import { ANALYTICS_EVENTS }               from '@/lib/analytics/events'
import type { AnalyticsEventName }        from '@/lib/analytics/events'

// ─── useAnalytics ──────────────────────────────────────────────────────────
// Primary hook. Use in any interactive component.
// const { track } = useAnalytics()
// track(ANALYTICS_EVENTS.HERO_CTA_CLICKED, { cta_text: 'Join the waitlist' })

export function useAnalytics() {
  const track = useCallback(
    (eventName: AnalyticsEventName, properties: Record<string, unknown> = {}) => {
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => sendEvent(eventName, properties))
      } else {
        setTimeout(() => sendEvent(eventName, properties), 0)
      }
    },
    []
  )
  return { track }
}

// ─── usePageView ───────────────────────────────────────────────────────────
// Call once in app/(marketing)/layout.tsx

export function usePageView() {
  useEffect(() => {
    sendEvent(ANALYTICS_EVENTS.PAGE_VIEWED, { title: document.title })
  }, [])
}

// ─── useSectionTracker ─────────────────────────────────────────────────────
// Attach to each section's ref. Fires 'section_viewed' when 30% is visible.
// const ref = useSectionTracker('hero')
// return <section ref={ref}>

export function useSectionTracker(sectionName: string) {
  const ref     = useRef<HTMLElement>(null)
  const tracked = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true
          sendEvent(ANALYTICS_EVENTS.SECTION_VIEWED, { section_name: sectionName })
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionName])

  return ref
}

// ─── useScrollTracker ──────────────────────────────────────────────────────
// Call once in app/(marketing)/layout.tsx alongside usePageView.
// Fires scroll_depth at 25/50/75/90% milestones.
// Reports full session data on page unload via sendBeacon.

export function useScrollTracker() {
  const hitsRef    = useRef(new Set<number>())
  const sectionsRef = useRef<string[]>([])
  const startTime  = useRef(Date.now())

  const registerSection = useCallback((name: string) => {
    if (!sectionsRef.current.includes(name)) {
      sectionsRef.current = [...sectionsRef.current, name]
    }
  }, [])

  useEffect(() => {
    const hits = hitsRef.current

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total <= 0) return
      const pct = Math.round((window.scrollY / total) * 100)

      ;([25, 50, 75, 90] as const).forEach(milestone => {
        if (pct >= milestone && !hits.has(milestone)) {
          hits.add(milestone)
          sendEvent(ANALYTICS_EVENTS.SCROLL_DEPTH, { depth_pct: milestone })
        }
      })
    }

    const onUnload = () => {
      sendScrollSession({
        max_scroll_pct:   hits.size > 0 ? Math.max(...Array.from(hits)) : 0,
        sections_seen:    sectionsRef.current,
        time_on_page_sec: Math.round((Date.now() - startTime.current) / 1000),
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('beforeunload', onUnload)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') onUnload()
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('beforeunload', onUnload)
    }
  }, [])

  return { registerSection }
}