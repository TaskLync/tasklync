import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Props {
  headline?: string
  body?: string
  cta?: string
}

export function InlineCTA({
  headline = 'Find a vetted pro near you.',
  body = 'TaskLync connects you with background-checked home service professionals. Join the waitlist to get early access.',
  cta = 'Join the Waitlist',
}: Props) {
  return (
    <aside
      className="my-10 rounded-2xl p-6 sm:p-8"
      style={{
        background: '#fff',
        border: '1px solid rgba(31,111,95,0.15)',
        boxShadow: '0 4px 24px rgba(13,31,28,0.06)',
      }}
    >
      <p
        className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2"
        style={{ fontFamily: 'var(--font-poppins)', color: '#1F6F5F' }}
      >
        TaskLync
      </p>
      <h3
        className="font-bold tracking-tight mb-2"
        style={{
          fontFamily: 'var(--font-fredoka-one)',
          fontSize: '1.25rem',
          color: '#0D1F1C',
        }}
      >
        {headline}
      </h3>
      <p
        className="text-[14px] leading-[1.7] mb-5"
        style={{ fontFamily: 'var(--font-poppins)', color: 'rgba(13,31,28,0.5)' }}
      >
        {body}
      </p>
      <Link
        href="/#waitlist"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[13.5px] font-semibold text-white transition-opacity duration-200 hover:opacity-90"
        style={{
          background: 'linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)',
          boxShadow: '0 2px 12px rgba(47,160,132,0.28)',
          fontFamily: 'var(--font-poppins)',
        }}
      >
        {cta} <ArrowRight className="w-4 h-4" />
      </Link>
    </aside>
  )
}