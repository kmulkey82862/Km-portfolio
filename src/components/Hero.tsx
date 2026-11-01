import { useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../content/profile';
import type { Pattern } from './Swatch';

// Katelyn's own paper-doll illustrations (from Katelyn's World). Click to change outfits.
const OUTFITS = [
  { src: '/hero/doll-leopard.webp', label: 'leopard top', w: 228 },
  { src: '/hero/doll-bluedress.webp', label: 'blue dress', w: 250 },
  { src: '/hero/doll-mattsgirl.webp', label: 'Matt’s Girl tee', w: 228 },
];

// Swatches pinned to the board, one per section, matching the section heads below.
const PINNED: { pattern: Pattern; label: string; href: string; tilt: number }[] = [
  { pattern: 'ticking', label: 'AI enablement', href: '#work', tilt: -6 },
  { pattern: 'plaid', label: 'Tools', href: '#tools', tilt: 4 },
  { pattern: 'cabana', label: 'Marketing', href: '#marketing', tilt: -3 },
  { pattern: 'herringbone', label: 'Freelance', href: '#freelance', tilt: 7 },
];

function PaperDoll() {
  const [i, setI] = useState(0);
  const outfit = OUTFITS[i];
  const next = OUTFITS[(i + 1) % OUTFITS.length];
  return (
    <button
      type="button"
      className="doll"
      onClick={() => setI((n) => (n + 1) % OUTFITS.length)}
      aria-label={`Paper doll of Katelyn in a ${outfit.label}. Change to the ${next.label}.`}
    >
      {OUTFITS.map((o, k) => (
        <img key={o.src} src={o.src} alt="" width={o.w} height={760} className={k === i ? 'is-on' : undefined} draggable={false} />
      ))}
      <span className="doll__tag" aria-hidden="true">
        change outfit ↻
      </span>
    </button>
  );
}

function Pinboard() {
  return (
    <div className="board" aria-label="Sections">
      {PINNED.map((p, k) => (
        <a key={p.pattern} href={p.href} className={`pin pin--${k + 1}`} style={{ ['--tilt' as string]: `${p.tilt}deg` }}>
          <span className={`pin__fabric swatch--${p.pattern}`} aria-hidden="true" />
          <span className="pin__label">{p.label}</span>
        </a>
      ))}
      <PaperDoll />
      <p className="board__note" aria-hidden="true">
        New Orleans, LA
        <br />
        hands-on with AI since 2023
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero__text">
        <p className="hero__hi">Hi, I’m</p>
        <h1 className="hname">
          <span className="hname__first">{profile.firstName}</span> {profile.lastName}
          <svg className="hname__squiggle" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
            <path d="M2 12 C 30 2, 50 18, 80 9 S 130 3, 160 10 S 220 16, 250 7 S 285 6, 298 10" />
          </svg>
        </h1>
        <p className="eyebrow">{profile.positioning}</p>
        <p className="hero__summary">{profile.summary}</p>
        <ul className="hero__contact">
          <li>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <a href={profile.phoneHref}>{profile.phone}</a>
          </li>
          <li>{profile.location}</li>
        </ul>
        <div className="hero__ctas">
          <Link to="/resume" className="btn btn--accent">
            Résumé <span className="arrow">→</span>
          </Link>
          <a href={profile.resumePath} className="hero__textlink" download>
            or download the PDF
          </a>
        </div>
      </div>
      <Pinboard />
    </header>
  );
}
