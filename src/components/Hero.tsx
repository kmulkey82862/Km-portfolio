import { profile } from '../content/profile';
import type { Pattern } from './Swatch';

// Fabric squares pinned around the title, one per section, matching the section heads below.
const PINNED: { pattern: Pattern; label: string; href: string }[] = [
  { pattern: 'ticking', label: 'AI enablement', href: '#work' },
  { pattern: 'plaid', label: 'Tools & automation', href: '#tools' },
  { pattern: 'cabana', label: 'Marketing & creative', href: '#marketing' },
  { pattern: 'herringbone', label: 'Freelance work', href: '#freelance' },
];

export default function Hero() {
  return (
    <header className="hero">
      <h1 className="hero__title">
        <span>
          {profile.firstName} {profile.lastName},
        </span>
        <span>Digital Portfolio</span>
      </h1>
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
