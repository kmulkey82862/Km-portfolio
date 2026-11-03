import { profile } from '../content/profile';
import type { Pattern } from './Swatch';

// Fabric squares pinned around the title, one per section, matching the section heads below.
const PINNED: { pattern: Pattern; label: string; href: string }[] = [
  { pattern: 'ticking', label: 'AI & automation', href: '#ai' },
  { pattern: 'plaid', label: 'Tools', href: '#tools' },
  { pattern: 'herringbone', label: 'Websites', href: '#websites' },
  { pattern: 'cabana', label: 'Social & video', href: '#social' },
  { pattern: 'gingham', label: 'Email', href: '#email' },
  { pattern: 'linen', label: 'Brand & design', href: '#design' },
];

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero__title">
        <p className="hero__kicker">
          <span className="hero__name">
            {profile.firstName} {profile.lastName}
          </span>
          <span className="hero__rule" aria-hidden="true" />
          <span className="hero__place">{profile.locationLong}</span>
        </p>
        <h1 className="hero__main">Digital Portfolio</h1>
      </div>
      <nav className="hero__pins" aria-label="Sections">
        {PINNED.map((p, k) => (
          <a key={p.pattern} href={p.href} className={`pin pin--${k + 1}`}>
            <span className={`pin__fabric swatch--${p.pattern}`} aria-hidden="true" />
            <span className="pin__label">{p.label}</span>
          </a>
        ))}
      </nav>
    </header>
  );
}
