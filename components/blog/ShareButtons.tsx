'use client'

import { useState } from 'react'
import { Link2, Check } from 'lucide-react'

interface Props {
  title: string
  url: string
}

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.3L6.3 22H3l7.3-8.4L1 2h6.3l4.4 5.7L18.9 2z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.121 1.535 5.853L.057 23.487a.75.75 0 0 0 .921.921l5.635-1.478A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 0 1-4.934-1.348l-.353-.21-3.664.961.977-3.567-.229-.368A9.694 9.694 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM6.82 20.45H3.86V9h2.96v11.45z" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.271h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
)

export function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const encoded = { title: encodeURIComponent(title), url: encodeURIComponent(url) }

  const shareLinks = [
    {
      label: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encoded.title}&url=${encoded.url}`,
      icon: <XIcon />,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encoded.title}%20${encoded.url}`,
      icon: <WhatsAppIcon />,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded.url}`,
      icon: <LinkedInIcon />,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded.url}`,
      icon: <FacebookIcon />,
    },
  ]

  const btnBase: React.CSSProperties = {
    fontFamily: 'var(--font-poppins)',
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

  function onEnter(e: React.MouseEvent<HTMLElement>) {
    e.currentTarget.style.borderColor = '#1F6F5F'
    e.currentTarget.style.color = '#1F6F5F'
  }

  function onLeave(e: React.MouseEvent<HTMLElement>) {
    e.currentTarget.style.borderColor = 'rgba(31,111,95,0.18)'
    e.currentTarget.style.color = 'rgba(13,31,28,0.55)'
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-8">
      <span
        className="text-[13px] mr-1"
        style={{ fontFamily: 'var(--font-poppins)', color: 'rgba(13,31,28,0.35)' }}
      >
        Share:
      </span>

      {shareLinks.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={btnBase}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {icon} {label}
        </a>
      ))}

      <button
        onClick={copyLink}
        style={btnBase}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
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