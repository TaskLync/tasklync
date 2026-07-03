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

export interface FAQItem {
  question: string
  answer: string
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
}

const FREDOKA = "'Fredoka', sans-serif"
const POPPINS = "'Poppins', sans-serif"

function MdxH2({ children, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      id={slugify(String(children))}
      className="scroll-mt-24"
      style={{
        fontFamily: FREDOKA,
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
  )
}

function MdxH3({ children, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      id={slugify(String(children))}
      className="scroll-mt-24"
      style={{
        fontFamily: FREDOKA,
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
  )
}

function MdxP({ children, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      style={{
        fontFamily: POPPINS,
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
  )
}

function MdxA({ href, children, ...props }: React.ComponentProps<'a'>) {
  return (
    <a
      href={href ?? '#'}
      style={{
        fontFamily: POPPINS,
        color: '#1F6F5F',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
      }}
      {...props}
    >
      {children}
    </a>
  )
}

function MdxStrong({ children, ...props }: React.ComponentProps<'strong'>) {
  return (
    <strong style={{ color: '#0D1F1C', fontWeight: '600' }} {...props}>
      {children}
    </strong>
  )
}

function MdxUl({ children, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      style={{ paddingLeft: '1.25rem', marginTop: '0.6em', marginBottom: '0.6em' }}
      {...props}
    >
      {children}
    </ul>
  )
}

function MdxOl({ children, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      style={{ paddingLeft: '1.25rem', marginTop: '0.6em', marginBottom: '0.6em' }}
      {...props}
    >
      {children}
    </ol>
  )
}

function MdxLi({ children, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      style={{
        fontFamily: POPPINS,
        fontSize: '1rem',
        lineHeight: '1.75',
        color: 'rgba(13,31,28,0.72)',
        marginBottom: '0.25em',
      }}
      {...props}
    >
      {children}
    </li>
  )
}

function MdxBlockquote({ children, ...props }: React.ComponentProps<'blockquote'>) {
  return (
    <blockquote
      style={{
        borderLeft: '3px solid #1F6F5F',
        paddingLeft: '1.25rem',
        margin: '1.25em 0',
        fontFamily: POPPINS,
        fontSize: '1.05rem',
        color: 'rgba(13,31,28,0.6)',
        fontStyle: 'italic',
      }}
      {...props}
    >
      {children}
    </blockquote>
  )
}

function MdxCode({ children, ...props }: React.ComponentProps<'code'>) {
  return (
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
  )
}

function MdxPre({ children, ...props }: React.ComponentProps<'pre'>) {
  return (
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
  )
}

function MdxTable({ children, ...props }: React.ComponentProps<'table'>) {
  return (
    <div style={{ overflowX: 'auto', margin: '1.75em 0' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: POPPINS,
          fontSize: '0.9375rem',
        }}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}

function MdxThead({ children, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead style={{ borderBottom: '2px solid rgba(31,111,95,0.15)' }} {...props}>
      {children}
    </thead>
  )
}

function MdxTh({ children, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      style={{
        padding: '0.6rem 1rem',
        textAlign: 'left',
        fontWeight: '600',
        color: '#0D1F1C',
        fontFamily: POPPINS,
        fontSize: '0.8125rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
      {...props}
    >
      {children}
    </th>
  )
}

function MdxTd({ children, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      style={{
        padding: '0.6rem 1rem',
        color: 'rgba(13,31,28,0.65)',
        fontFamily: POPPINS,
        borderBottom: '1px solid rgba(31,111,95,0.07)',
      }}
      {...props}
    >
      {children}
    </td>
  )
}

function MdxImg({ src, alt }: React.ComponentProps<'img'>) {
  const imageSrc: ImageSrc = typeof src === 'string' ? src : ''

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
            fontFamily: POPPINS,
          }}
        >
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

interface Props {
  content: string
  faqItems?: FAQItem[]
}

export async function ArticleBody({ content, faqItems }: Props) {
  const components = {
    h2: MdxH2,
    h3: MdxH3,
    p: MdxP,
    a: MdxA,
    strong: MdxStrong,
    ul: MdxUl,
    ol: MdxOl,
    li: MdxLi,
    blockquote: MdxBlockquote,
    code: MdxCode,
    pre: MdxPre,
    table: MdxTable,
    thead: MdxThead,
    th: MdxTh,
    td: MdxTd,
    img: MdxImg,
    InlineCTA,
    PullQuote,
    CalloutBlock,
    FAQBlock: () => (faqItems && faqItems.length > 0 ? <FAQBlock items={faqItems} /> : null),
  }

  return (
    <div>
      <MDXRemote source={content} components={components} options={mdxOptions} />
    </div>
  )
}