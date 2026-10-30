import { ReactNode, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
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
  { to: '/#systems', label: 'Systems', wideOnly: true },
  { to: '/lab', label: 'Lab' },
  { to: '/#work', label: 'Work' },
  { to: '/#experience', label: 'Experience', wideOnly: true },
];

export default function Layout({ children }: { children: ReactNode }) {
  useReveal();
  const [theme, setTheme] = useState<Theme>(() => storedTheme() ?? systemTheme());
  useEffect(() => {
    if (storedTheme()) applyTheme(storedTheme()!);
  }, []);
  const { pathname } = useLocation();
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const on = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const changeTheme = (t: Theme) => {
    applyTheme(t);
    setTheme(t);
  };
  return (
    <div className="shell">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <aside className={`rail${pathname === '/' && !pastHero ? ' rail--quiet' : ''}`} aria-label="Site">
        <Link to="/" className="rail__name" aria-label={`${profile.firstName} ${profile.lastName}, home`}>
          <span className="first">{profile.firstName}</span>
          <span className="last">{profile.lastName}</span>
        </Link>
        <div className="rail__tools">
          <ThemeToggle theme={theme} onChange={changeTheme} />
          <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Email Katelyn" title="Email">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
              <path d="m3.5 6 8.5 7 8.5-7" />
            </svg>
          </a>
        </div>
      </aside>
      <div className="main">
        <nav className="topnav" aria-label="Primary">
          <Link to="/" className="topnav__brand">
            <span className="first">{profile.firstName}</span>
            <span>{profile.lastName}</span>
          </Link>
          {links.map((l) =>
            l.to.includes('#') ? (
              <Link key={l.to} to={l.to} className={l.wideOnly ? 'wide-only' : undefined}>
                {l.label}
              </Link>
            ) : (
              <NavLink key={l.to} to={l.to} className={l.wideOnly ? 'wide-only' : undefined}>
                {l.label}
              </NavLink>
            ),
          )}
          <Link to="/#contact" className="topnav__cta">
            Contact
          </Link>
          <span className="narrow-only">
            <ThemeToggle theme={theme} onChange={changeTheme} />
          </span>
        </nav>
        <main id="content">{children}</main>
        <footer className="footer">
          <div className="wrap">
            <span>
              © {new Date().getFullYear()} {profile.firstName} {profile.lastName} · {profile.location}
            </span>
            <span>Designed and built by Katelyn, with Claude. Demos use sample data only.</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
