import { Link } from 'react-router-dom';
import { profile } from '../content/profile';
import GridPulse from './GridPulse';

function VerticalName() {
  const letters = (word: string, offset: number) =>
    word.split('').map((ch, i) => (
      <span key={i} style={{ animationDelay: `${(offset + i) * 55}ms` }}>
        {ch}
      </span>
    ));
  return (
    <h1 className="vname" aria-label={`${profile.firstName} ${profile.lastName}`}>
      <span className="vname__glow" aria-hidden="true" />
      <span className="vname__word vname__first" aria-hidden="true" data-grid-avoid>
        {letters(profile.firstName.toUpperCase(), 0)}
      </span>
      <span className="vname__word vname__last" aria-hidden="true" data-grid-avoid>
        {letters(profile.lastName.toUpperCase(), profile.firstName.length)}
      </span>
    </h1>
  );
}

export default function Hero() {
  return (
    <div className="hero-field">
      <GridPulse />
      <header className="hero">
        <VerticalName />
        <div className="hero__body">
          <p className="eyebrow" data-grid-avoid>
            {profile.positioning}
          </p>
          <p className="hero__summary" data-grid-avoid>
            {profile.summary}
          </p>
          <ul className="hero__contact" data-grid-avoid>
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
            <a href={profile.resumePath} className="btn" download>
              Download PDF
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
