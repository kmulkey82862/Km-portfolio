import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { labDemos } from '../content/lab';
import { usePageMeta } from '../lib/usePageMeta';

export default function LabShell({ slug, children, aside }: { slug: string; children: ReactNode; aside?: ReactNode }) {
  const demo = labDemos.find((d) => d.slug === slug)!;
  const index = labDemos.indexOf(demo);
  const next = labDemos[(index + 1) % labDemos.length];
  usePageMeta(demo.title, demo.blurb);
  return (
    <article className="lab">
      <div className="wrap">
        <header className="lab__head">
          <Link to="/lab" className="lab__back">
            ← Lab
          </Link>
          <p className="eyebrow">Demo {String(index + 1).padStart(2, '0')}</p>
          <h1 className="h-section">{demo.title}</h1>
          <p className="lab__blurb">{demo.blurb}</p>
          <p className="lab__proves">
            <span className="pill pill--demo">Sample data</span> {demo.provesLine}
          </p>
        </header>
        {children}
        {aside && <div className="lab__aside">{aside}</div>}
        <footer className="lab__next">
          <span className="muted">Next demo</span>
          <Link to={`/lab/${next.slug}`} className="lab__next-link">
            {next.title} <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </div>
    </article>
  );
}
