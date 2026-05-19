// app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer }            from '@/lib/supabase'
import { analyticsRateLimit }        from '@/lib/server/rate-limit'
import { z }                         from 'zod'
import type { AnalyticsPayload }     from '@/types/analytics'

const eventSchema = z.object({
  type:         z.literal('event'),
  session_id:   z.string().min(1).max(100),
  event_name:   z.string().min(1).max(100),
  properties:   z.record(z.string(), z.unknown()).optional().default({}),
  page_url:     z.string().max(500).optional(),
  referrer:     z.string().max(500).optional(),
  utm_source:   z.string().max(100).optional(),
  utm_medium:   z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
  device_type:  z.enum(['mobile', 'tablet', 'desktop']).optional(),
})

const scrollSchema = z.object({
  type:             z.literal('scroll'),
  session_id:       z.string().min(1).max(100),
  max_scroll_pct:   z.number().int().min(0).max(100),
  sections_seen:    z.array(z.string().max(100)).max(50).optional().default([]),
  time_on_page_sec: z.number().int().min(0).max(86400).optional().default(0),
  page_url:         z.string().max(500).optional(),
  device_type:      z.enum(['mobile', 'tablet', 'desktop']).optional(),
})

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Rate limit by session_id to prevent beacon floods
    const body       = await req.json() as AnalyticsPayload
    const session_id = body?.session_id ?? 'unknown'
    const { success } = await analyticsRateLimit.limit(session_id)

    // Silently drop — analytics must never return an error to the client
    if (!success) return NextResponse.json({ ok: true })

    if (body.type === 'event') {
      const parsed = eventSchema.safeParse(body)
      if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 })
      const { type: _, ...row } = parsed.data
      await supabaseServer.from('analytics_events').insert(row)
      return NextResponse.json({ ok: true })
    }

    if (body.type === 'scroll') {
      const parsed = scrollSchema.safeParse(body)
      if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 })
      const { type: _, ...row } = parsed.data
      await supabaseServer
        .from('scroll_sessions')
        .upsert({ ...row, updated_at: new Date().toISOString() }, { onConflict: 'session_id' })
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: false, error: 'Unknown payload type' }, { status: 400 })
  } catch (err) {
    console.error('[api/analytics] error:', err)
    // Always return ok — analytics errors must be invisible to the user
    return NextResponse.json({ ok: true })
  }
}