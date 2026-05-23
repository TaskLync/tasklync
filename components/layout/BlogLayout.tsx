import type { TOCItem } from '@/types/blog'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar'

interface Props {
  children: React.ReactNode
  toc: TOCItem[]
}

export function BlogLayout({ children, toc }: Props) {
  return (
    <>
      <ReadingProgressBar />

      {/* Page background — matches brand */}
      <div style={{ background: '#F7F7F2', minHeight: '100vh' }}>
        {/* Optional dot texture on article pages */}
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(rgba(13,31,28,0.035) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 lg:py-16">
          <div className="lg:grid lg:grid-cols-[1fr_256px] lg:gap-16 items-start">
            {/* Article */}
            <article className="min-w-0">
              {children}
            </article>

            {/* Sticky TOC sidebar — desktop only */}
            {toc.length > 0 && (
              <aside
                className="hidden lg:block sticky top-28 self-start rounded-2xl p-6"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(31,111,95,0.1)',
                  boxShadow: '0 4px 24px rgba(13,31,28,0.04)',
                }}
              >
                <TableOfContents items={toc} />
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  )
}