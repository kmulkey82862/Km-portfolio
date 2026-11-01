import { ReactNode } from 'react';

export type Pattern = 'ticking' | 'plaid' | 'cabana' | 'herringbone' | 'linen' | 'gingham';

const TAGS: Record<Pattern, string> = {
  ticking: 'Ticking stripe · Icy blue & poppy',
  plaid: 'Tartan · Blush, mulberry & poppy',
  cabana: 'Cabana stripe · Blush',
  herringbone: 'Herringbone · Olive',
  linen: 'Linen · Icy gray & poppy',
  gingham: 'Gingham · Blush',
};

/** A section head set like a fabric sample: title and description on a stitched label over a pattern. */
export default function Swatch({
  id,
  title,
  note,
  pattern,
  level = 2,
  children,
}: {
  id: string;
  title: string;
  note?: ReactNode;
  pattern: Pattern;
  level?: 1 | 2;
  children?: ReactNode;
}) {
  const Heading = level === 1 ? 'h1' : 'h2';
  return (
    <div className={`swatch swatch--${pattern} reveal`}>
      <div className="swatch__label">
        <Heading id={id} className={level === 1 ? 'h-display' : 'h-section'}>
          {title}
        </Heading>
        {note && <p className="swatch__note">{note}</p>}
        {children}
      </div>
      <span className="swatch__tag" aria-hidden="true">
        {TAGS[pattern]}
      </span>
    </div>
  );
}
