import Image from 'next/image'
import type { Author } from '@/types/blog'

interface Props {
  author: Author
}

// Inline SVG Icons (no external dependency)
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.3L6.3 22H3l7.3-8.4L1 2h6.3l4.4 5.7L18.9 2z" />
  </svg>
)

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM6.82 20.45H3.86V9h2.96v11.45z" />
  </svg>
)

export function AuthorBox({ author }: Props) {
  return (
    <aside
      className="mt-12 p-6 sm:p-8 rounded-2xl border flex flex-col sm:flex-row gap-5 items-start"
      style={{
        background: '#fff',
        borderColor: 'rgba(31,111,95,0.12)',
        boxShadow: '0 4px 24px rgba(13,31,28,0.05)',
      }}
    >
      {author.avatar && (
        <div
          className="relative w-14 h-14 rounded-full overflow-hidden shrink-0"
          style={{ border: '2px solid rgba(31,111,95,0.2)' }}
        >
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex-1">
        <p
          className="text-[11px] font-bold uppercase tracking-widest mb-1"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'rgba(13,31,28,0.35)',
          }}
        >
          Written by
        </p>

        <p
          className="font-bold text-[17px] leading-none tracking-[-0.02em]"
          style={{
            fontFamily: 'var(--font-clash)',
            color: '#0D1F1C',
          }}
        >
          {author.name}
        </p>

        {author.title && (
          <p
            className="text-[12.5px] mt-0.5"
            style={{
              fontFamily: 'var(--font-body)',
              color: '#1F6F5F',
            }}
          >
            {author.title}
          </p>
        )}

        {author.bio && (
          <p
            className="text-[13.5px] leading-[1.7] mt-3"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(13,31,28,0.5)',
            }}
          >
            {author.bio}
          </p>
        )}

        {(author.twitter || author.linkedin) && (
          <div className="flex gap-3 mt-4">
            {author.twitter && (
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="hover:text-[#1F6F5F] transition-colors"
                style={{ color: 'rgba(13,31,28,0.3)' }}
              >
                <XIcon className="w-4 h-4" />
              </a>
            )}

            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-[#1F6F5F] transition-colors"
                style={{ color: 'rgba(13,31,28,0.3)' }}
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}