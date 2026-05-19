// lib/email/send.ts
import { siteConfig }    from "@/config/site";
import { welcomeSubject, welcomeText, welcomeHTML } from "./templates";

interface SendWelcomeEmailParams {
  email: string;
  position: number;
}

export async function sendWelcomeEmail({ email, position }: SendWelcomeEmailParams) {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY!,
    },
    body: JSON.stringify({
      sender: {
        email: siteConfig.email.sender,
        name:  siteConfig.email.senderName,
      },
      to: [{ email }],
      subject: welcomeSubject(position),
      textContent: welcomeText({ position }),
      htmlContent: welcomeHTML({ position }),
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Brevo API error: ${JSON.stringify(error)}`);
  }

  return res.json();
}