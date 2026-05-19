// lib/email/templates.ts
// Pure functions — no side effects, no API calls

import { siteConfig } from "@/config/site";

export interface EmailTemplateParams {
  firstName: string;
  position: number;
  referralUrl: string;
}

// ─────────────────────────────────────────────────────────────
// Homeowner welcome email
// ─────────────────────────────────────────────────────────────

export function homeownerSubject(position: number): string {
  return `You're #${position} on the TaskLync waitlist`;
}

export function homeownerText({
  firstName,
  position,
  referralUrl,
}: EmailTemplateParams): string {
  return [
    `Hey ${firstName},`,

    `You're officially on the TaskLync waitlist. Your current position is #${position}.`,

    `TaskLync is building a faster and simpler way to book trusted home services without endless calls, unreliable arrivals, or hidden pricing.`,

    `As an early member, you'll get priority access when we launch.`,

    `Want to move up the list?`,
    `Invite friends using your referral link below. Every successful referral moves you up 3 spots.`,

    referralUrl,

    `Team TaskLync`,

    `Unsubscribe: ${siteConfig.url}/unsubscribe`,
  ].join("\n\n");
}

export function homeownerHTML({
  firstName,
  position,
  referralUrl,
}: EmailTemplateParams): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TaskLync Waitlist</title>
</head>

<body style="margin:0;padding:0;background-color:#F7F7F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:48px 20px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:28px;">
              <span style="font-size:24px;font-weight:800;color:#0D1F1C;letter-spacing:-0.03em;">
                Task<span style="color:#1F6F5F;">Lync</span>
              </span>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background:#FFFFFF;border:1px solid rgba(31,111,95,0.08);border-radius:24px;padding:42px;">

              <!-- Label -->
              <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;color:#1F6F5F;letter-spacing:0.12em;text-transform:uppercase;">
                Early Access Waitlist
              </p>

              <!-- Heading -->
              <h1 style="margin:0 0 18px 0;font-size:34px;font-weight:800;color:#0D1F1C;line-height:1.08;letter-spacing:-0.04em;">
                Welcome, ${firstName}
              </h1>

              <!-- Intro -->
              <p style="margin:0 0 18px 0;font-size:16px;color:rgba(13,31,28,0.72);line-height:1.75;">
                You're officially on the TaskLync waitlist.
              </p>

              <p style="margin:0 0 32px 0;font-size:16px;color:rgba(13,31,28,0.72);line-height:1.75;">
                TaskLync is building a faster and simpler way to book trusted home services without endless calls, unreliable arrivals, or hidden pricing.
              </p>

              <!-- Position Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#F7F7F5;border:1px solid rgba(31,111,95,0.08);border-radius:18px;padding:24px;">

                    <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;color:rgba(13,31,28,0.45);letter-spacing:0.1em;text-transform:uppercase;">
                      Your current position
                    </p>

                    <p style="margin:0;font-size:54px;font-weight:800;color:#1F6F5F;line-height:1;letter-spacing:-0.05em;">
                      #${position}
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Referral -->
              <p style="margin:0 0 10px 0;font-size:16px;font-weight:700;color:#0D1F1C;">
                Move up the waitlist
              </p>

              <p style="margin:0 0 18px 0;font-size:14px;color:rgba(13,31,28,0.58);line-height:1.7;">
                Every successful referral moves you up 3 spots.
              </p>

              <!-- Referral Link -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="background:#F7F7F5;border-radius:14px;padding:14px 16px;word-break:break-all;border:1px solid rgba(31,111,95,0.08);">

                    <a href="${referralUrl}"
                      style="font-size:13px;color:#1F6F5F;text-decoration:none;font-family:'Courier New',Courier,monospace;">
                      ${referralUrl}
                    </a>

                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <a href="${referralUrl}"
                style="display:inline-block;background:#1F6F5F;color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:600;padding:14px 26px;border-radius:12px;">
                Share Referral Link
              </a>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;">

              <p style="margin:0;font-size:12px;color:rgba(13,31,28,0.45);line-height:1.7;">
                You received this email because you joined the TaskLync waitlist.
                <br />

                <a href="${siteConfig.url}/unsubscribe"
                  style="color:rgba(13,31,28,0.45);text-decoration:underline;">
                  Unsubscribe
                </a>
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────
// Professional welcome email
// ─────────────────────────────────────────────────────────────

export function professionalSubject(position: number): string {
  return `You're #${position} on the TaskLync professional waitlist`;
}

export function professionalText({
  firstName,
  position,
  referralUrl,
}: EmailTemplateParams): string {
  return [
    `Hey ${firstName},`,

    `Thanks for joining the TaskLync professional waitlist. Your current position is #${position}.`,

    `We're building TaskLync to help skilled professionals connect with more local customers through a faster and more reliable platform.`,

    `Early professionals will get priority onboarding access when provider accounts begin rolling out.`,

    `Want to move up the list?`,
    `Share your referral link below. Every successful referral moves you up 3 spots.`,

    referralUrl,

    `Team TaskLync`,

    `Unsubscribe: ${siteConfig.url}/unsubscribe`,
  ].join("\n\n");
}

export function professionalHTML({
  firstName,
  position,
  referralUrl,
}: EmailTemplateParams): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>TaskLync Professional Waitlist</title>
</head>

<body style="margin:0;padding:0;background-color:#F7F7F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:48px 20px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:28px;">
              <span style="font-size:24px;font-weight:800;color:#0D1F1C;letter-spacing:-0.03em;">
                Task<span style="color:#1F6F5F;">Lync</span>
              </span>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="background:#FFFFFF;border:1px solid rgba(31,111,95,0.08);border-radius:24px;padding:42px;">

              <!-- Label -->
              <p style="margin:0 0 12px 0;font-size:11px;font-weight:700;color:#1F6F5F;letter-spacing:0.12em;text-transform:uppercase;">
                Professional Waitlist
              </p>

              <!-- Heading -->
              <h1 style="margin:0 0 18px 0;font-size:34px;font-weight:800;color:#0D1F1C;line-height:1.08;letter-spacing:-0.04em;">
                Welcome, ${firstName}
              </h1>

              <!-- Intro -->
              <p style="margin:0 0 18px 0;font-size:16px;color:rgba(13,31,28,0.72);line-height:1.75;">
                You're officially on the TaskLync professional waitlist.
              </p>

              <p style="margin:0 0 32px 0;font-size:16px;color:rgba(13,31,28,0.72);line-height:1.75;">
                We're building TaskLync to help skilled professionals connect with more local customers through a faster and more reliable platform.
              </p>

              <!-- Position Card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#F7F7F5;border:1px solid rgba(31,111,95,0.08);border-radius:18px;padding:24px;">

                    <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;color:rgba(13,31,28,0.45);letter-spacing:0.1em;text-transform:uppercase;">
                      Your current position
                    </p>

                    <p style="margin:0;font-size:54px;font-weight:800;color:#1F6F5F;line-height:1;letter-spacing:-0.05em;">
                      #${position}
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Referral -->
              <p style="margin:0 0 10px 0;font-size:16px;font-weight:700;color:#0D1F1C;">
                Move up the waitlist
              </p>

              <p style="margin:0 0 18px 0;font-size:14px;color:rgba(13,31,28,0.58);line-height:1.7;">
                Share your referral link with other professionals. Every successful referral moves you up 3 spots.
              </p>

              <!-- Referral Link -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;">
                <tr>
                  <td style="background:#F7F7F5;border-radius:14px;padding:14px 16px;word-break:break-all;border:1px solid rgba(31,111,95,0.08);">

                    <a href="${referralUrl}"
                      style="font-size:13px;color:#1F6F5F;text-decoration:none;font-family:'Courier New',Courier,monospace;">
                      ${referralUrl}
                    </a>

                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <a href="${referralUrl}"
                style="display:inline-block;background:#1F6F5F;color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:600;padding:14px 26px;border-radius:12px;">
                Share Referral Link
              </a>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;">

              <p style="margin:0;font-size:12px;color:rgba(13,31,28,0.45);line-height:1.7;">
                You received this email because you joined the TaskLync professional waitlist.
                <br />

                <a href="${siteConfig.url}/unsubscribe"
                  style="color:rgba(13,31,28,0.45);text-decoration:underline;">
                  Unsubscribe
                </a>
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}