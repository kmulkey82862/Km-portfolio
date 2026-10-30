import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta';

export default function NotFound() {
  usePageMeta('Not found');
  return (
    <section className="lab">
      <div className="wrap" style={{ minHeight: '60vh' }}>
        <p className="eyebrow">404</p>
        <h1 className="h-display">This page isn’t wired up.</h1>
        <p className="lab__blurb">Even good automations miss a route sometimes.</p>
        <Link to="/" className="btn btn--accent">
          Back home <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
