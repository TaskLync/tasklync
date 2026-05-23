import { AlertCircle, CheckCircle, Info, Zap } from 'lucide-react'
import React from 'react'

type Variant = 'info' | 'warning' | 'success' | 'tip'

interface Props {
  variant?: string
  title?: string
  children: React.ReactNode
}

const styles: Record<Variant, {
  border: string
  bg: string
  icon: React.ReactNode
  titleColor: string
}> = {
  info: {
    border: 'rgba(31,111,95,0.15)',
    bg: 'rgba(31,111,95,0.05)',
    icon: <Info size={15} color="#1F6F5F" />,
    titleColor: '#1F6F5F',
  },
  tip: {
    border: 'rgba(47,160,132,0.18)',
    bg: 'rgba(47,160,132,0.06)',
    icon: <Zap size={15} color="#2FA084" />,
    titleColor: '#2FA084',
  },
  success: {
    border: 'rgba(111,207,151,0.25)',
    bg: 'rgba(111,207,151,0.08)',
    icon: <CheckCircle size={15} color="#3a8f5e" />,
    titleColor: '#3a8f5e',
  },
  warning: {
    border: 'rgba(13,31,28,0.14)',
    bg: 'rgba(13,31,28,0.04)',
    icon: <AlertCircle size={15} color="#4a5c58" />,
    titleColor: '#4a5c58',
  },
}

export function CalloutBlock({
  variant = 'info',
  title,
  children,
}: Props) {

  // normalize + safety fallback
  const safeVariant: Variant =
    (typeof variant === 'string' && variant in styles
      ? variant
      : 'info') as Variant

  const s = styles[safeVariant]

  return (
    <aside
      className="my-8 rounded-xl p-5"
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
      }}
    >
      <div className="flex gap-3">
        <div className="mt-0.5 shrink-0">{s.icon}</div>

        <div>
          {title && (
            <p
              className="text-[13px] font-semibold mb-1"
              style={{
                fontFamily: 'var(--font-body)',
                color: s.titleColor,
              }}
            >
              {title}
            </p>
          )}

          <div
            className="text-[13.5px] leading-[1.7]"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(13,31,28,0.6)',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </aside>
  )
}