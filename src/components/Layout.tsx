import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { profile } from '../content/profile';
import { applyTheme, storedTheme, systemTheme, Theme } from '../lib/theme';
import { useReveal } from '../lib/useReveal';

function ThemeToggle({ theme, onChange }: { theme: Theme; onChange: (t: Theme) => void }) {
  const next: Theme = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      onClick={() => onChange(next)}
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
        </svg>
      )}
    </button>
  );
}

const links = [
  { to: '/', label: 'Work' },
  { to: '/resume', label: 'Résumé' },
  { to: '/lab', label: 'Lab' },
];

export default function Layout({ children }: { children: ReactNode }) {
  useReveal();
  const [theme, setTheme] = useState<Theme>(() => storedTheme() ?? systemTheme());
  useEffect(() => {
    if (storedTheme()) applyTheme(storedTheme()!);
  }, []);
  const { pathname } = useLocation();
  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));
  const changeTheme = (t: Theme) => {
    applyTheme(t);
    setTheme(t);
  };
  return (
    <div className="shell">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <nav className="topnav" aria-label="Primary">
        <Link to="/" className="topnav__brand" aria-label={`${profile.firstName} ${profile.lastName}, home`}>
          {profile.firstName} {profile.lastName}
        </Link>
        <ul className="topnav__links">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={isActive(l.to) ? 'is-active' : undefined} aria-current={isActive(l.to) ? 'page' : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle theme={theme} onChange={changeTheme} />
      </nav>
      <main id="content">{children}</main>
      <footer className="footer" id="contact">
        <div className="wrap">
          <ul className="footer__contact">
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.phoneHref}>{profile.phone}</a>
            </li>
            <li>{profile.location}</li>
            <li>
              <a href={profile.resumePath} download>
                Résumé (PDF)
              </a>
            </li>
          </ul>
          <span>
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}. Demos use sample data only.
          </span>
        </div>
      </footer>
    </div>
  );
}
