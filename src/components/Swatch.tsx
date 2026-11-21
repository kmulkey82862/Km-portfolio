import { ReactNode } from 'react';
import GradientShimmer from './GradientShimmer';

export type Pattern = 'ticking' | 'plaid' | 'cabana' | 'herringbone' | 'linen' | 'gingham';

/** A section head: title and description on a stitched label over the section's solid colour. */
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
          <GradientShimmer baseColor="var(--ink)">{title}</GradientShimmer>
        </Heading>
        {note && <p className="swatch__note">{note}</p>}
        {children}
      </div>
    </div>
  );
}
