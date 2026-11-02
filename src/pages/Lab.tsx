import { Link } from 'react-router-dom';
import { labDemos } from '../content/lab';
import { usePageMeta } from '../lib/usePageMeta';
import Swatch from '../components/Swatch';

export default function Lab() {
  usePageMeta('Lab', 'Browser versions of tools Katelyn Mulkey built, running on sample data.');
  return (
    <section className="lab">
      <div className="wrap">
        <header className="lab__head">
          <Link to="/" className="lab__back">
            ← Home
          </Link>
        </header>
        <Swatch
          id="lab-h"
          title="Lab"
          pattern="gingham"
          level={1}
          note="Browser versions of three tools from the archive, running on sample data. Files you add stay in your browser."
        />
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
