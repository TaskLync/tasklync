'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

export function NewsletterBlock() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'blog-newsletter' }),
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="my-4 rounded-3xl border p-8 sm:p-12"
      style={{
        background: '#fff',
        borderColor: 'rgba(31,111,95,0.12)',
        boxShadow: '0 4px 32px rgba(13,31,28,0.06)',
        backgroundImage: 'radial-gradient(rgba(13,31,28,0.04) 1px, transparent 1px), linear-gradient(#fff,#fff)',
        backgroundSize: '28px 28px, 100%',
      }}
    >
      <div className="max-w-xl mx-auto text-center">
        {submitted ? (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle className="w-10 h-10" style={{ color: '#1F6F5F' }} />
            <p className="font-['Fredoka'] text-xl font-bold tracking-[-0.02em]" style={{ color: '#0D1F1C' }}>
              You&apos;re on the list.
            </p>
            <p className="font-['Poppins'] text-[14px]" style={{ color: 'rgba(13,31,28,0.45)' }}>
              We&apos;ll let you know when TaskLync launches in your area.
            </p>
          </div>
        ) : (
          <>
            <p className="font-['Poppins'] text-[11px] font-bold uppercase tracking-[0.12em] mb-3" style={{ color: '#1F6F5F' }}>
              Early Access
            </p>
            <h3
              className="font-['Fredoka'] font-bold tracking-tight mb-3"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: '#0D1F1C' }}
            >
              Get notified when TaskLync launches.
            </h3>
            <p className="font-['Poppins'] text-[14px] leading-[1.7] mb-8" style={{ color: 'rgba(13,31,28,0.48)' }}>
              Join thousands of homeowners waiting for a smarter way to hire home service pros.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="font-['Poppins'] flex-1 px-4 py-3 rounded-full text-[14px] outline-none"
                style={{
                  background: '#F7F7F2',
                  border: '1px solid rgba(31,111,95,0.18)',
                  color: '#0D1F1C',
                }}
                onFocus={e => (e.target.style.borderColor = '#1F6F5F')}
                onBlur={e => (e.target.style.borderColor = 'rgba(31,111,95,0.18)')}
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="font-['Poppins'] flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[13.5px] font-semibold text-white whitespace-nowrap disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)',
                  boxShadow: '0 2px 12px rgba(47,160,132,0.28)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {loading ? 'Joining…' : 'Join Waitlist'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}