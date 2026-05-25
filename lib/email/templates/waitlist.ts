// lib/email/templates/waitlist.ts
import { siteConfig } from "@/config/site";

export interface EmailTemplateParams {
  position: number;
}

export function welcomeSubject(position: number): string {
  return `You are #${position} on the TaskLync waitlist`;
}

export function welcomeText({ position }: EmailTemplateParams): string {
  return [
    `Hey,`,
    `You are #${position} on the TaskLync waitlist.`,
    `We are building the fastest way to find and book trusted local home services. Being this early means you get priority access the moment we launch in your city.`,
    `We will reach out as soon as we go live. Thanks for being part of this.`,
    `The TaskLync Team`,
    `Unsubscribe: ${siteConfig.url}/unsubscribe`,
  ].join("\n\n");
}

export function welcomeHTML({ position }: EmailTemplateParams): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>You are on the TaskLync waitlist</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F7F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:48px 24px;">
        <table role="presentation" width="100%" style="max-width:560px;" cellpadding="0" cellspacing="0" border="0">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:32px;">
              <span style="font-size:20px;font-weight:800;color:#0D1F1C;letter-spacing:-0.03em;">
                Task<span style="color:#1F6F5F;">Lync</span>
              </span>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background-color:#ffffff;border:1px solid rgba(31,111,95,0.12);border-radius:16px;padding:40px;">

              <p style="margin:0 0 10px 0;font-size:11px;font-weight:700;color:#1F6F5F;letter-spacing:0.12em;text-transform:uppercase;">
                You are on the list
              </p>

              <h1 style="margin:0 0 16px 0;font-size:30px;font-weight:800;color:#0D1F1C;letter-spacing:-0.025em;line-height:1.15;">
                You are #${position} on the waitlist.
              </h1>

              <p style="margin:0 0 32px 0;font-size:15px;color:rgba(13,31,28,0.55);line-height:1.7;">
                We are building the fastest way to find and book trusted local home services.
                Being this early means you get priority access the moment we launch in your city.
              </p>

              <!-- Position badge -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#F7F7F5;border:1px solid rgba(31,111,95,0.15);border-radius:12px;padding:20px 24px;">
                    <p style="margin:0 0 6px 0;font-size:11px;font-weight:600;color:rgba(13,31,28,0.45);letter-spacing:0.1em;text-transform:uppercase;">
                      Your waitlist position
                    </p>
                    <p style="margin:0;font-size:48px;font-weight:800;color:#1F6F5F;letter-spacing:-0.03em;line-height:1;">
                      #${position}
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:32px 0 0 0;font-size:14px;color:rgba(13,31,28,0.45);line-height:1.65;">
                We will reach out as soon as we go live in your area. Thanks for being part of this early on.
              </p>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:28px 0 0 0;border-top:1px solid rgba(31,111,95,0.08);">
              <p style="margin:0;font-size:12px;color:rgba(13,31,28,0.35);line-height:1.6;">
                You received this because you joined the TaskLync waitlist.<br>
                <a href="${siteConfig.url}/unsubscribe" style="color:rgba(13,31,28,0.35);text-decoration:underline;">Unsubscribe</a>
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