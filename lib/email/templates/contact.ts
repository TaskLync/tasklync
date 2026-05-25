import { siteConfig } from "@/config/site";

export interface ContactTemplateParams {
  type: string;
  fields: Record<string, string>;
}

// ─── SUBJECT ───────────────────────────────────────────────

export function contactSubject(type: string): string {
  const map: Record<string, string> = {
    support: "New Support Enquiry — TaskLync",
    press: "New Press Enquiry — TaskLync",
    partnerships: "New Partnership Enquiry — TaskLync",
    professional: "New Professional Enquiry — TaskLync",
  };

  return map[type] ?? "New Contact Form Submission — TaskLync";
}

// ─── TEXT VERSION ──────────────────────────────────────────

export function buildContactPlainText(
  type: string,
  fields: Record<string, string>
): string {
  const lines = Object.entries(fields)
    .map(([key, value]) => `${key.replace(/_/g, " ")}: ${value}`)
    .join("\n");

  return `
New ${type} enquiry from TaskLync contact form

${lines}

Sent from: ${siteConfig.url}/contact
  `.trim();
}

// ─── HTML VERSION ──────────────────────────────────────────

export function buildContactEmailHtml(
  type: string,
  fields: Record<string, string>
): string {
  const rows = Object.entries(fields)
    .map(([key, value]) => {
      const safeKey = key.replace(/_/g, " ");
      const safeValue = value
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      return `
        <tr>
          <td style="padding:12px 16px;background:#F7F7F5;border-bottom:1px solid rgba(31,111,95,0.08);width:180px;">
            <p style="margin:0;font-size:11px;font-weight:600;color:rgba(13,31,28,0.6);text-transform:uppercase;letter-spacing:0.08em;">
              ${safeKey}
            </p>
          </td>
          <td style="padding:12px 16px;border-bottom:1px solid rgba(31,111,95,0.08);">
            <p style="margin:0;font-size:14px;color:#0D1F1C;line-height:1.6;white-space:pre-wrap;">
              ${safeValue}
            </p>
          </td>
        </tr>
      `;
    })
    .join("");

  const titleMap: Record<string, string> = {
    support: "Support Enquiry",
    press: "Press Enquiry",
    partnerships: "Partnership Enquiry",
    professional: "Professional Enquiry",
  };

  const title = titleMap[type] ?? "Contact Enquiry";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
</head>

<body style="margin:0;padding:0;background-color:#F7F7F5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:48px 24px;">

        <table width="100%" style="max-width:600px;" cellpadding="0" cellspacing="0">

          <!-- Logo -->
          <tr>
            <td style="padding-bottom:28px;">
              <span style="font-size:20px;font-weight:800;color:#0D1F1C;">
                Task<span style="color:#1F6F5F;">Lync</span>
              </span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border:1px solid rgba(31,111,95,0.12);border-radius:16px;overflow:hidden;">

              <!-- Header -->
              <div style="background:#1F6F5F;padding:24px;">
                <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.12em;">
                  New Contact Submission
                </p>
                <h1 style="margin:6px 0 0 0;font-size:20px;color:#fff;">
                  ${title}
                </h1>
              </div>

              <!-- Fields -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${rows}
              </table>

              <!-- Footer -->
              <div style="padding:20px 24px;background:#F7F7F5;">
                <p style="margin:0;font-size:12px;color:rgba(13,31,28,0.4);line-height:1.6;">
                  Sent from TaskLync contact form<br>
                  ${siteConfig.url}/contact
                </p>
              </div>

            </td>
          </tr>

          <!-- Bottom note -->
          <tr>
            <td style="padding-top:24px;text-align:center;">
              <p style="margin:0;font-size:12px;color:rgba(13,31,28,0.35);">
                TaskLync — Connecting you to trusted local professionals
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