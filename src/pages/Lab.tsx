import { Link } from 'react-router-dom';
import { labDemos } from '../content/lab';
import { usePageMeta } from '../lib/usePageMeta';

export default function Lab() {
  usePageMeta('Lab', 'Browser versions of tools Katelyn Mulkey built, running on sample data.');
  return (
    <section className="lab">
      <div className="wrap">
        <header className="lab__head">
          <Link to="/" className="lab__back">
            ← Home
          </Link>
          <p className="eyebrow">The lab</p>
          <h1 className="h-display">Lab</h1>
          <p className="lab__blurb">Browser versions of tools from the archive, running on sample data. Files you add stay in your browser.</p>
        </header>
        <ul className="lab-grid">
          {labDemos.map((d, i) => (
            <li key={d.slug}>
              <Link to={`/lab/${d.slug}`} className="lab-card">
                <span className="lab-card__num">{String(i + 1).padStart(2, '0')}</span>
                <h2>{d.title}</h2>
                <p>{d.blurb}</p>
                <p className="lab-card__proves">{d.provesLine}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ height: 'clamp(64px, 8vw, 120px)' }} />
      </div>
    </section>
  );
}
