import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { labDemos } from '../content/lab';
import { usePageMeta } from '../lib/usePageMeta';

export default function LabShell({ slug, children, aside }: { slug: string; children: ReactNode; aside?: ReactNode }) {
  const demo = labDemos.find((d) => d.slug === slug)!;
  usePageMeta(demo.title, demo.blurb);
  return (
    <article className="lab">
      <div className="wrap">
        <header className="lab__head">
          <Link to="/#tools" className="lab__back">
            ← Work
          </Link>
          <h1 className="h-section">{demo.title}</h1>
          <p className="lab__blurb">{demo.blurb}</p>
          <p className="lab__proves">
            <span className="pill pill--demo">Sample data</span> {demo.provesLine}
          </p>
        </header>
        {children}
        {aside && <div className="lab__aside">{aside}</div>}
      </div>
    </article>
  );
}
