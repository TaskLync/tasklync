// app/api/waitlist/route.ts

import { NextRequest, NextResponse }  from 'next/server'
import { supabaseServer }             from '@/lib/supabase'
import { waitlistRateLimit }          from '@/lib/server/rate-limit'
import { getClientIP }                from '@/lib/server/ip'
import { waitlistSchema }             from '@/lib/waitlist/validate'
import { sendWelcomeEmail }           from '@/lib/email/send'
import type { WaitlistAPIResponse }   from '@/types/waitlist'

export async function POST(req: NextRequest): Promise<NextResponse<WaitlistAPIResponse>> {
  try {

    // ── 1. Rate limit by IP ──────────────────────────────────────────────
    const ip = getClientIP(req)
    const { success: withinLimit } = await waitlistRateLimit.limit(ip)

    if (!withinLimit) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 }
      )
    }

    // ── 2. Honeypot check — bots first, before any DB work ───────────────
    const body = await req.json()
    if (body._honey) {
      // Silent success — don't reveal bot detection to the bot
      return NextResponse.json({ success: true, position: 9999, referralCode: 'bot' })
    }

    // ── 3. Validate ──────────────────────────────────────────────────────
    const parsed = waitlistSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }

    const data = parsed.data

    // ── 4. Duplicate email check — return existing data, not an error ────
    const { data: existing } = await supabaseServer
      .from('waitlist')
      .select('position, referral_code')
      .eq('email', data.email)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({
        success:         true,
        position:        existing.position,
        referralCode:    existing.referral_code,
        alreadySignedUp: true,
      })
    }

    // ── 5. Insert — Postgres trigger assigns position + referral_code ────
    const { data: inserted, error: insertError } = await supabaseServer
      .from('waitlist')
      .insert({
        email:        data.email,
        name:         data.name         ?? null,
        user_type:    data.user_type,
        referred_by:  data.referred_by  ?? null,
        utm_source:   data.utm_source   ?? null,
        utm_medium:   data.utm_medium   ?? null,
        utm_campaign: data.utm_campaign ?? null,
        utm_content:  data.utm_content  ?? null,
        ip_address:   ip,
        user_agent:   req.headers.get('user-agent') ?? null,
      })
      .select('position, referral_code')
      .single()

    if (insertError || !inserted) {
      console.error('[api/waitlist] insert error:', insertError)
      return NextResponse.json(
        { success: false, error: 'Something went wrong. Please try again.' },
        { status: 500 }
      )
    }

    // ── 6. Referral bonus — non-blocking, don't await ────────────────────
    if (data.referred_by) {
      supabaseServer
        .rpc('apply_referral_bonus', { p_referral_code: data.referred_by })
        .then(({ error }) => {
          if (error) console.error('[api/waitlist] referral bonus error:', error)
        })
    }

    // ── 7. Welcome email — non-blocking, never fail the request ─────────
    sendWelcomeEmail({
      email:        data.email,
      name:         data.name,
      position:     inserted.position,
      referralCode: inserted.referral_code,
      userType:     data.user_type,
    }).catch(err => {
      console.error('[api/waitlist] email send error:', err)
    })

    // ── 8. Success ───────────────────────────────────────────────────────
    return NextResponse.json({
      success:      true,
      position:     inserted.position,
      referralCode: inserted.referral_code,
    })

  } catch (err) {
    console.error('[api/waitlist] unexpected error:', err)
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}