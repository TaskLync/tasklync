'use client'

import { useState } from 'react'
import { X, Link2, Check } from 'lucide-react'

interface Props {
  title: string
  url: string
}

export function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`

  const btnBase: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: '600',
    background: 'transparent',
    border: '1px solid rgba(31,111,95,0.18)',
    borderRadius: '100px',
    color: 'rgba(13,31,28,0.55)',
    cursor: 'pointer',
    padding: '6px 14px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'border-color 0.2s ease, color 0.2s ease',
  }

  return (
    <div className="flex items-center gap-2 mt-8">
      <span
        className="text-[13px] mr-1"
        style={{ fontFamily: 'var(--font-body)', color: 'rgba(13,31,28,0.35)' }}
      >
        Share:
      </span>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={btnBase}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = '#1F6F5F'
          ;(e.currentTarget as HTMLElement).style.color = '#1F6F5F'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(31,111,95,0.18)'
          ;(e.currentTarget as HTMLElement).style.color = 'rgba(13,31,28,0.55)'
        }}
      >
        <X className="w-3.5 h-3.5" /> Twitter
      </a>

      <button
        onClick={copyLink}
        style={btnBase}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = '#1F6F5F'
          ;(e.currentTarget as HTMLElement).style.color = '#1F6F5F'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(31,111,95,0.18)'
          ;(e.currentTarget as HTMLElement).style.color = 'rgba(13,31,28,0.55)'
        }}
      >
        {copied ? (
          <><Check className="w-3.5 h-3.5" style={{ color: '#1F6F5F' }} /> Copied!</>
        ) : (
          <><Link2 className="w-3.5 h-3.5" /> Copy link</>
        )}
      </button>
    </div>
  )
}