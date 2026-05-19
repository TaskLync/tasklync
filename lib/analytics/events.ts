// lib/analytics/events.ts

export const ANALYTICS_EVENTS = {
  // Page
  PAGE_VIEWED:              'page_viewed',

  // Scroll + visibility
  SECTION_VIEWED:           'section_viewed',       // { section_name }
  SCROLL_DEPTH:             'scroll_depth',          // { depth_pct: 25|50|75|90 }

  // CTA interactions
  HERO_CTA_CLICKED:         'hero_cta_clicked',      // { cta_text }
  NAV_CTA_CLICKED:          'nav_cta_clicked',
  STICKY_CTA_CLICKED:       'sticky_cta_clicked',
  FINAL_CTA_CLICKED:        'final_cta_clicked',

  // Waitlist funnel — track every step to find drop-off
  WAITLIST_FORM_VIEWED:     'waitlist_form_viewed',
  WAITLIST_FORM_STARTED:    'waitlist_form_started',    // first field interaction
  WAITLIST_FORM_SUBMITTED:  'waitlist_form_submitted',  // submit button pressed
  WAITLIST_SIGNUP_SUCCESS:  'waitlist_signup_success',  // { position }
  WAITLIST_SIGNUP_ERROR:    'waitlist_signup_error',    // { error_message }
  WAITLIST_ALREADY_JOINED:  'waitlist_already_joined',  // { position }

  // Engagement
  FAQ_EXPANDED:             'faq_expanded',          // { question_index }
  TESTIMONIAL_ADVANCED:     'testimonial_advanced',  // { direction: 'next'|'prev' }
  REFERRAL_LINK_COPIED:     'referral_link_copied',
  REFERRAL_LINK_SHARED:     'referral_link_shared',  // { platform }
} as const

export type AnalyticsEventName = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS]