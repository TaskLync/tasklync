// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseServer }            from "@/lib/supabase";
import { waitlistRateLimit }         from "@/lib/server/rate-limit";
import { getClientIP }               from "@/lib/server/ip";
import { waitlistSchema }            from "@/lib/waitlist/validate";
import { sendWelcomeEmail }          from "@/lib/email/send";
import type { WaitlistAPIResponse }  from "@/types/waitlist";

export async function POST(req: NextRequest): Promise<NextResponse<WaitlistAPIResponse>> {
  try {
    const ip = getClientIP(req);
    const { success: withinLimit } = await waitlistRateLimit.limit(ip);
    if (!withinLimit) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();
    if (body._honey) {
      return NextResponse.json({ success: true, position: 9999 });
    }

    const parsed = waitlistSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { email, utm_source, utm_medium, utm_campaign, utm_content } = parsed.data;

    // Return existing entry silently
    const { data: existing } = await supabaseServer
      .from("waitlist")
      .select("position")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: true, position: existing.position, alreadySignedUp: true });
    }

    const { data: inserted, error: insertError } = await supabaseServer
      .from("waitlist")
      .insert({
        email,
        utm_source:   utm_source   ?? null,
        utm_medium:   utm_medium   ?? null,
        utm_campaign: utm_campaign ?? null,
        utm_content:  utm_content  ?? null,
        ip_address:   ip,
        user_agent:   req.headers.get("user-agent") ?? null,
      })
      .select("position")
      .single();

    if (insertError || !inserted) {
      console.error("[api/waitlist] insert error:", insertError);
      return NextResponse.json(
        { success: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Send welcome email — non-blocking
    sendWelcomeEmail({ email, position: inserted.position }).catch((err) => {
      console.error("[api/waitlist] email error:", err);
    });

    return NextResponse.json({ success: true, position: inserted.position });

  } catch (err) {
    console.error("[api/waitlist] unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}