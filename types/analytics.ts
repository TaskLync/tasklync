// types/analytics.ts

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

// ─── Database rows ─────────────────────────────────────────────────────────
export interface AnalyticsEventRow {
  id:           string
  session_id:   string
  event_name:   string
  properties:   Record<string, unknown>
  page_url:     string | null
  referrer:     string | null
  utm_source:   string | null
  utm_medium:   string | null
  utm_campaign: string | null
  device_type:  DeviceType | null
  created_at:   string
}

export interface ScrollSessionRow {
  id:               string
  session_id:       string
  max_scroll_pct:   number
  sections_seen:    string[]
  time_on_page_sec: number
  page_url:         string | null
  device_type:      DeviceType | null
  created_at:       string
  updated_at:       string
}

// ─── API payload shapes ────────────────────────────────────────────────────

export interface AnalyticsEventPayload {
  type:          'event'
  session_id:    string
  event_name:    string
  properties?:   Record<string, unknown>
  page_url?:     string
  referrer?:     string
  utm_source?:   string
  utm_medium?:   string
  utm_campaign?: string
  device_type?:  DeviceType
}

export interface ScrollSessionPayload {
  type:             'scroll'
  session_id:       string
  max_scroll_pct:   number
  sections_seen?:   string[]
  time_on_page_sec?: number
  page_url?:        string
  device_type?:     DeviceType
}

export type AnalyticsPayload = AnalyticsEventPayload | ScrollSessionPayload