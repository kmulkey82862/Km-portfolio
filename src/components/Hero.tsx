import { profile } from '../content/profile';
import FabricFolder, { FolderPeek } from './FabricFolder';
import type { Pattern } from './Swatch';

const g = (id: string) => `/media/gallery/${id}-600.webp`;

// One folder per section, lined with the same fabric as that section's head,
// holding a few real pieces from the section.
const FOLDERS: { pattern: Pattern; label: string; href: string; tint: string; peeks: FolderPeek[] }[] = [
  {
    pattern: 'ticking',
    label: 'AI & automation',
    href: '#ai',
    tint: '#eaf0f4',
    peeks: [{ title: 'Team AI rollout' }, { title: 'Weekly digest' }, { title: 'Inbox triage' }],
  },
  {
    pattern: 'herringbone',
    label: 'Websites',
    href: '#websites',
    tint: '#f1f0d8',
    peeks: [{ src: '/media/site-web-deva-480.webp' }, { src: '/media/site-cdc-480.webp' }, { src: '/media/site-matt-chapin-480.webp' }],
  },
  {
    pattern: 'plaid',
    label: 'Tools',
    href: '#tools',
    tint: '#fbeef2',
    peeks: [{ title: 'Logo resizer' }, { src: '/media/fimcon-archive-480.webp' }, { title: 'Speaker graphics' }],
  },
  {
    pattern: 'gingham',
    label: 'Email',
    href: '#email',
    tint: '#fdf3f6',
    peeks: [
      { src: g('1-I6J-qW_sKPe6HKhuq43z82JF1JTYHyP') },
      { src: g('1zkVKnji_n4XbFOemmX-UW3LkxW7zTEPX') },
      { src: g('1dLSySIik9P9n3JDWgQ2uIJKcs1Wg5OsM') },
    ],
  },
  {
    pattern: 'cabana',
    label: 'Social & video',
    href: '#social',
    tint: '#fbeef2',
    peeks: [
      { src: g('1utvn3e8ZcF_LpyVljZMpTlGvFz8oE1U-') },
      { src: g('1isAUKSboqf7mWBb8aCoqfzuopII19MVL') },
      { src: g('km-trivial-matters-1') },
    ],
  },
  {
    pattern: 'linen',
    label: 'Brand & design',
    href: '#design',
    tint: '#eef2f5',
    peeks: [{ src: g('1uksbxIa5l_bEaSnhq8QrCKbuLkxWlrvQ') }, { src: g('km-birthday-cover') }, { src: g('fimcon-report-p01') }],
  },
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
        {FOLDERS.map((f, k) => (
          <FabricFolder key={f.pattern} {...f} className={`pin pin--${k + 1}`} />
        ))}
      </nav>
    </header>
  );
}
