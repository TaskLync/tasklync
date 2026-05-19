// lib/email/send.ts
// Server-only — never import in 'use client' files

import { Brevo, BrevoClient, BrevoEnvironment } from '@getbrevo/brevo'
import { siteConfig } from '@/config/site'
import type { UserType } from '@/types/waitlist'
import {
  homeownerSubject, homeownerText, homeownerHTML,
  professionalSubject, professionalText, professionalHTML,
  type EmailTemplateParams,
} from './templates'

// Initialise once — module-level singleton
const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY!,
  environment: BrevoEnvironment.Default,
})

export interface SendWelcomeEmailArgs {
  email:        string
  name?:        string
  position:     number
  referralCode: string
  userType:     UserType
}

export async function sendWelcomeEmail(args: SendWelcomeEmailArgs): Promise<void> {
  const { email, name, position, referralCode, userType } = args
  const firstName   = name?.trim().split(' ')[0] ?? 'there'
  const referralUrl = `${siteConfig.url}/ref/${referralCode}`
  const isHomeowner = userType === 'homeowner'

  const params: EmailTemplateParams = { firstName, position, referralUrl }

  await client.transactionalEmails.sendTransacEmail({
    to:          [{ email, name: name ?? firstName }],
    sender:      { name: siteConfig.email.senderName, email: siteConfig.email.sender },
    replyTo:     { email: siteConfig.email.sender },
    subject:     isHomeowner ? homeownerSubject(position) : professionalSubject(position),
    htmlContent: isHomeowner ? homeownerHTML(params)      : professionalHTML(params),
    textContent: isHomeowner ? homeownerText(params)      : professionalText(params),
    tags:        [userType, 'waitlist-welcome', `pos-${position}`],
  })
}