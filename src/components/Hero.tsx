import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../content/profile';
import GridPulse from './GridPulse';

// What the "automation status" line cycles through. All illustrative.
const statusLines = [
  { job: 'digest.daily', text: 'sent 7:02a · 4 clients · 23 open items' },
  { job: 'rfp.scan', text: '3 new bids matched · drafts started' },
  { job: 'zoom.route', text: 'summary filed to client workspace' },
  { job: 'receipts.ocr', text: '12 expenses logged · 0 flagged' },
  { job: 'comp.codes', text: '41 redeemed · reminder 2 queued' },
];

function StatusTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % statusLines.length), 3200);
    return () => window.clearInterval(id);
  }, []);
  const line = statusLines[i];
  return (
    <div className="ticker" aria-hidden="true" data-grid-avoid>
      <span className="ticker__dot" />
      <span key={i} className="ticker__line">
        <span className="ticker__job">{line.job}</span> {line.text}
      </span>
    </div>
  );
}

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
          <p className="hero__lede" data-grid-avoid>
            I make AI part of how a team <em>actually</em> works.
          </p>
          <p className="hero__summary" data-grid-avoid>
            {profile.summary}
          </p>
          <div className="hero__ctas">
            <Link to="/#systems" className="btn btn--accent">
              See the systems <span className="arrow">→</span>
            </Link>
            <Link to="/lab" className="btn">
              Try the lab
            </Link>
            <a href={profile.resumePath} className="btn" download>
              Resume (PDF)
            </a>
          </div>
          <StatusTicker />
          <dl className="hero__meta" data-grid-avoid>
            <div>
              <dt>Based in</dt>
              <dd>
                {profile.location} <span className="muted">{profile.coordinates}</span>
              </dd>
            </div>
            <div>
              <dt>Working</dt>
              <dd>{profile.availability}</dd>
            </div>
            <div>
              <dt>Hands-on with generative AI</dt>
              <dd>Since 2023</dd>
            </div>
          </dl>
        </div>
      </header>
    </div>
  );
}
