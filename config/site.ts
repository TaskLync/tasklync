// config/site.ts

export const siteConfig = {
    
    name:    'TaskLync',

    description:

            "Modern infrastructure for trusted home services.",

    url:     process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tasklync.com',

    email: {
             sender:     'furqanshabbir234@gmail.com',  // must be verified in Brevo
    senderName: 'TaskLync',
  },
    waitlist: {
    referralBonusSpots: 3,             // spots moved up per successful referral
  },
} as const

export type SiteConfig = typeof siteConfig