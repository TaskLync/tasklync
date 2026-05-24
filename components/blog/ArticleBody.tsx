// Server component — async, no 'use client'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import { InlineCTA } from './InlineCTA'
import { FAQBlock } from './FAQBlock'
import { PullQuote } from './PullQuote'
import { CalloutBlock } from '../editorial/CalloutBlock'

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

type ImageSrc = string | StaticImageData

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
}

const mdxComponents = {
  InlineCTA,
  FAQBlock,
  PullQuote,
  CalloutBlock,

  h2: ({ children, ...props }: React.ComponentProps<'h2'>) => (
    <h2
      id={slugify(String(children))}
      className="scroll-mt-24"
      style={{
        fontFamily: 'var(--font-clash)',
        fontSize: 'clamp(1.15rem, 2vw, 1.15rem)',
        fontWeight: '700',
        letterSpacing: '-0.025em',
        color: '#0D1F1C',
        marginTop: '1.5rem',
        marginBottom: '0.6rem',
      }}
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }: React.ComponentProps<'h3'>) => (
    <h3
      id={slugify(String(children))}
      className="scroll-mt-24"
      style={{
        fontFamily: 'var(--font-clash)',
        fontSize: '1rem',
        fontWeight: '600',
        letterSpacing: '-0.02em',
        color: '#0D1F1C',
        marginTop: '1.35rem',
        marginBottom: '0.5rem',
      }}
      {...props}
    >
      {children}
    </h3>
  ),

  p: ({ children, ...props }: React.ComponentProps<'p'>) => (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.95rem',
        lineHeight: '1.78',
        color: 'rgba(13,31,28,0.72)',
        marginTop: '0.85em',
        marginBottom: '0.85em',
      }}
      {...props}
    >
      {children}
    </p>
  ),

  a: ({ href, children, ...props }: React.ComponentProps<'a'>) => (
    <a
      href={href}
      style={{
        color: '#1F6F5F',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        fontFamily: 'var(--font-body)',
      }}
      {...props}
    >
      {children}
    </a>
  ),

  strong: ({ children, ...props }: React.ComponentProps<'strong'>) => (
    <strong style={{ color: '#0D1F1C', fontWeight: '600' }} {...props}>
      {children}
    </strong>
  ),

  ul: ({ children, ...props }: React.ComponentProps<'ul'>) => (
    <ul
      style={{
        paddingLeft: '1.25rem',
        marginTop: '0.6em',
        marginBottom: '0.6em',
      }}
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: React.ComponentProps<'ol'>) => (
    <ol
      style={{
        paddingLeft: '1.25rem',
        marginTop: '0.6em',
        marginBottom: '0.6em',
      }}
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({ children, ...props }: React.ComponentProps<'li'>) => (
    <li
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        lineHeight: '1.75',
        color: 'rgba(13,31,28,0.72)',
        marginBottom: '0.25em',
      }}
      {...props}
    >
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }: React.ComponentProps<'blockquote'>) => (
    <blockquote
      style={{
        borderLeft: '3px solid #1F6F5F',
        paddingLeft: '1.25rem',
        margin: '1.25em 0',
        fontFamily: 'var(--font-serif-italic)',
        fontSize: '1.05rem',
        color: 'rgba(13,31,28,0.6)',
        fontStyle: 'italic',
      }}
      {...props}
    >
      {children}
    </blockquote>
  ),

  code: ({ children, ...props }: React.ComponentProps<'code'>) => (
    <code
      style={{
        background: 'rgba(31,111,95,0.07)',
        color: '#1F6F5F',
        padding: '0.15em 0.45em',
        borderRadius: '4px',
        fontSize: '0.875em',
        fontFamily: 'monospace',
        border: '1px solid rgba(31,111,95,0.14)',
      }}
      {...props}
    >
      {children}
    </code>
  ),

  pre: ({ children, ...props }: React.ComponentProps<'pre'>) => (
    <pre
      style={{
        background: '#F7F7F2',
        border: '1px solid rgba(31,111,95,0.12)',
        borderRadius: '12px',
        padding: '1.25rem',
        overflowX: 'auto',
        margin: '1em 0',
        fontSize: '0.875rem',
        fontFamily: 'monospace',
        color: '#0D1F1C',
      }}
      {...props}
    >
      {children}
    </pre>
  ),

  table: ({ children, ...props }: React.ComponentProps<'table'>) => (
    <div style={{ overflowX: 'auto', margin: '1.75em 0' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
        }}
        {...props}
      >
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }: React.ComponentProps<'thead'>) => (
    <thead
      style={{ borderBottom: '2px solid rgba(31,111,95,0.15)' }}
      {...props}
    >
      {children}
    </thead>
  ),

  th: ({ children, ...props }: React.ComponentProps<'th'>) => (
    <th
      style={{
        padding: '0.6rem 1rem',
        textAlign: 'left',
        fontWeight: '600',
        color: '#0D1F1C',
        fontFamily: 'var(--font-body)',
        fontSize: '0.8125rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }: React.ComponentProps<'td'>) => (
    <td
      style={{
        padding: '0.6rem 1rem',
        color: 'rgba(13,31,28,0.65)',
        borderBottom: '1px solid rgba(31,111,95,0.07)',
      }}
      {...props}
    >
      {children}
    </td>
  ),

  img: ({ src, alt }: React.ComponentProps<'img'>) => {
    let imageSrc: ImageSrc = ''
    if (typeof src === 'string') {
      imageSrc = src
    } else {
      imageSrc = ''
    }

    return (
      <figure style={{ margin: '1.5rem 0' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'rgba(31,111,95,0.06)',
          }}
        >
          {imageSrc && (
            <Image src={imageSrc} alt={alt ?? ''} fill className="object-cover" />
          )}
        </div>
        {alt && (
          <figcaption
            style={{
              textAlign: 'center',
              fontSize: '12px',
              color: 'rgba(13,31,28,0.35)',
              marginTop: '0.6rem',
              fontFamily: 'var(--font-body)',
            }}
          >
            {alt}
          </figcaption>
        )}
      </figure>
    )
  },
}

interface Props {
  content: string
}

export async function ArticleBody({ content }: Props) {
  return (
    <div>
      <MDXRemote
        source={content}
        components={mdxComponents}
        options={mdxOptions}
      />
    </div>
  )
}