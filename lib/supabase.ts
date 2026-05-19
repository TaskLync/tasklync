// lib/supabase.ts

import { createClient } from '@supabase/supabase-js'

// Server-side client — uses service_role key, bypasses RLS
// Import this in API routes and server components ONLY
// Never import in 'use client' files
export const supabaseServer = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      persistSession: false,   // server — no session needed
      autoRefreshToken: false,
    },
  }
)

// Browser-side client — uses anon key, respects RLS
// Import this in client components if you ever need direct Supabase access
export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)