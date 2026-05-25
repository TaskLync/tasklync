import { NextRequest, NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact/validate";
import { contactRouting } from "@/lib/contact/config";
import { getClientIP } from "@/lib/server/ip";
import { contactRateLimit } from "@/lib/server/rate-limit";
import type { ContactAPIResponse } from "@/types/contact";

import {
  buildContactEmailHtml,
  buildContactPlainText,
} from "@/lib/email/templates/contact";

import { sendContactEmail } from "@/lib/email/send";

export async function POST(
  req: NextRequest
): Promise<NextResponse<ContactAPIResponse>> {
  try {
    // ✅ after (debug version)
    const ip = getClientIP(req);

    const { success: withinLimit, limit, remaining, reset } = await contactRateLimit.limit(ip);

    if (!withinLimit) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Your form is blocked for the next 24 hours and you cannot submit again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (body._honey) {
      return NextResponse.json({ success: true });
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { type, fields } = parsed.data;

    const route = contactRouting[type];

    if (!route) {
      return NextResponse.json(
        { success: false, error: "Invalid contact type" },
        { status: 400 }
      );
    }

    const submitterEmail =
      Object.values(fields).find((v) => v.includes("@")) || undefined;

    const html = buildContactEmailHtml(type, fields);
    const text = buildContactPlainText(type, fields);

    sendContactEmail({
      to: route.to,
      subject: route.subject,
      html,
      text,
      replyTo: submitterEmail,
    }).catch((err) => {
      console.error("[api/contact] email error:", err);
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/contact] unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try agin later." },
      { status: 500 }
    );
  }
}