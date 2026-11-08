import type { CSSProperties } from 'react';
import type { Pattern } from './Swatch';

/**
 * A section link drawn as a glass folder lined with one of the site's fabrics.
 *
 * Three layers, back to front: the fabric (the section's swatch pattern) as the
 * back panel, a few pieces of real work tucked in the pocket, and a frosted
 * front panel carrying the section name. Hovering or focusing leans the glass
 * forward on its bottom hinge and lifts the work out a little; clicking jumps
 * to the section.
 *
 * Adapted from a glass-folder card pattern; the generated canvas artwork is
 * replaced by the CSS fabrics, so there are no extra assets or scripts.
 * Everything is drawn at 340 x 272 and scaled to `--ff-scale`.
 */

export type FolderPeek = { src?: string; title?: string };

const W = 340;
const H = 272;
const FRONT_TOP = 74;
const FRONT_H = H - FRONT_TOP;

const BACK_PATH =
  'M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z';
const FRONT_PATH = `M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 ${FRONT_H - 22}A22 22 0 0 1 318 ${FRONT_H}L22 ${FRONT_H}A22 22 0 0 1 0 ${FRONT_H - 22}Z`;

export default function FabricFolder({
  href,
  label,
  pattern,
  tint,
  peeks,
  className = '',
}: {
  href: string;
  label: string;
  pattern: Pattern;
  /** Colour of the frosted glass, usually the fabric's lightest tone. */
  tint: string;
  /** Up to three pieces of work in the pocket, back to front. */
  peeks: FolderPeek[];
  className?: string;
}) {
  const shown = peeks.slice(0, 3);
  return (
    <a href={href} className={`ff ${className}`} style={{ '--ff-tint': tint } as CSSProperties} aria-label={label}>
      <span className="ff__stage" aria-hidden="true">
        <span className="ff__shadow" />
        <span className={`ff__back swatch--${pattern}`} style={{ clipPath: `path('${BACK_PATH}')` }} />
        <svg className="ff__rim" viewBox={`0 0 ${W} ${H}`}>
          <path d={BACK_PATH} />
        </svg>
        <span className="ff__files">
          {shown.map((p, i) => {
            const slot = shown.length <= 1 ? 0 : (i / (shown.length - 1)) * 2 - 1;
            return (
              <span
                key={i}
                className={`ff__sheet${p.src ? ' ff__sheet--art' : ''}`}
                style={{ '--slot': slot, '--depth': shown.length - 1 - i, zIndex: i + 1 } as CSSProperties}
              >
                {p.src ? (
                  <img src={p.src} alt="" loading="lazy" decoding="async" />
                ) : (
                  <>
                    <b>{p.title}</b>
                    <i style={{ width: '86%' }} />
                    <i style={{ width: '92%' }} />
                    <i style={{ width: '64%' }} />
                    <i style={{ width: '80%' }} />
                  </>
                )}
              </span>
            );
          })}
        </span>
        <span className="ff__front" style={{ clipPath: `path('${FRONT_PATH}')` }}>
          <span className="ff__tint" />
          <svg className="ff__front-rim" viewBox={`0 0 ${W} ${FRONT_H}`}>
            <path d={FRONT_PATH} />
          </svg>
          <span className="ff__label">{label}</span>
        </span>
      </span>
    </a>
  );
}
