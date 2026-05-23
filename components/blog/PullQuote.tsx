interface Props {
  quote: string
  attribution?: string
}

export function PullQuote({ quote, attribution }: Props) {
  return (
    <figure
      className="my-10 px-7 py-7 rounded-r-2xl"
      style={{
        borderLeft: '3px solid #1F6F5F',
        background: 'rgba(31,111,95,0.04)',
      }}
    >
      <blockquote
        className="leading-[1.6] italic"
        style={{
          fontFamily: 'var(--font-serif-italic)',
          fontSize: '1.2rem',
          color: '#0D1F1C',
        }}
      >
        &ldquo;{quote}&rdquo;
      </blockquote>
      {attribution && (
        <figcaption
          className="mt-4 text-[12.5px] font-semibold not-italic"
          style={{ fontFamily: 'var(--font-body)', color: '#1F6F5F' }}
        >
          — {attribution}
        </figcaption>
      )}
    </figure>
  )
}