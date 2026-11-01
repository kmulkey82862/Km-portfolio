import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SystemsMap from '../components/SystemsMap';
import MediaFrame, { hasMedia } from '../components/MediaFrame';
import { WebDevaMark } from '../components/Bubbles';
import { aiEnablement, ArchiveLink, creative, CreativeItem, freelanceSites, marketingSites, Site, ToolItem, tools } from '../content/projects';
import { usePageMeta } from '../lib/usePageMeta';

function ArchiveLinkItem({ link }: { link: ArchiveLink }) {
  return (
    <li>
      {link.to ? (
        <Link to={link.to}>{link.label} →</Link>
      ) : (
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label} ↗<span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      )}
    </li>
  );
}

function SectionHead({ id, title, note, action }: { id: string; title: string; note?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="shead reveal">
      <h2 id={id} className="h-section">
        {title}
      </h2>
      {note && <p className="shead__note">{note}</p>}
      {action}
    </div>
  );
}

function WorkRows({ items }: { items: ToolItem[] }) {
  return (
    <ul className="archive">
      {items.map((t) => (
        <li key={t.id} className="archive__row reveal">
          <div className="archive__title">
            <h3>{t.title}</h3>
            <p className="muted">
              {t.org} · {t.year}
            </p>
          </div>
          <p className="archive__desc">{t.description}</p>
          <ul className="archive__links">
            {t.links.map((l) => (
              <ArchiveLinkItem key={l.label} link={l} />
            ))}
          </ul>
          {t.media && hasMedia(t.media) && <MediaFrame id={t.media} className="archive__shot" sizes="(max-width: 860px) 100vw, 60vw" />}
        </li>
      ))}
    </ul>
  );
}

function AiEnablement() {
  return (
    <section className="section" id="work" aria-labelledby="ai-h">
      <div className="wrap">
        <SectionHead id="ai-h" title="AI enablement" note="ARB Meetings & Events, 2026." />
        <WorkRows items={aiEnablement} />
        <div className="archive__sub reveal" id="systems">
          <h3 className="h-card">ARB systems overview</h3>
          <p className="shead__note">
            How Claude Team connected ARB’s systems into one knowledge base, and what it produced. Select a node to see its connections.
          </p>
        </div>
        <div className="reveal">
          <SystemsMap />
        </div>
      </div>
    </section>
  );
}

function Tools() {
  return (
    <section className="section" id="tools" aria-labelledby="tools-h">
      <div className="wrap">
        <SectionHead
          id="tools-h"
          title="Tools & automation"
          note={
            <>
              ARB Meetings & Events, 2026. Demos run on sample data; all of them are in the <Link to="/lab">lab</Link>.
            </>
          }
        />
        <WorkRows items={tools} />
      </div>
    </section>
  );
}

function SiteGrid({ items }: { items: Site[] }) {
  return (
    <ul className="sites">
      {items.map((s) => {
        const body = (
          <>
            {s.media && hasMedia(s.media) ? (
              <MediaFrame id={s.media} className="site__shot" sizes="(max-width: 760px) 100vw, 33vw" />
            ) : (
              <div className="site__shot site__shot--type" aria-hidden="true">
                <span>{s.name}</span>
              </div>
            )}
            <div className="site__meta">
              <span className="site__kind">
                {s.kind}
                {s.year && ` · ${s.year}`}
              </span>
              {s.status && <span className={`pill pill--${s.status}`}>{s.status === 'in-progress' ? 'In progress' : 'Live'}</span>}
            </div>
            <h3 className="site__name">{s.name}</h3>
            <p className="site__blurb">{s.blurb}</p>
          </>
        );
        return (
          <li key={s.name} className="site reveal">
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="site__link">
                {body}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            ) : (
              body
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Freelance() {
  return (
    <section className="section" id="freelance" aria-labelledby="freelance-h">
      <div className="wrap">
        <SectionHead
          id="freelance-h"
          title="Freelance work"
          note={
            <>
              Websites and interactive builds through <WebDevaMark />, my freelance studio.
            </>
          }
        />
        <SiteGrid items={freelanceSites} />
      </div>
    </section>
  );
}

function Lightbox({ item, onClose }: { item: CreativeItem; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const ids = item.media.filter(hasMedia);
  const [i, setI] = useState(0);
  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    return () => d?.close();
  }, []);
  const go = (delta: number) => setI((n) => (n + delta + ids.length) % ids.length);
  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={`${item.title}, ${item.client}`}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <div className="lightbox__inner">
        <MediaFrame key={ids[i]} id={ids[i]} sizes="90vw" className="lightbox__media" autoplay={false} />
        <div className="lightbox__bar">
          <div>
            <strong>{item.title}</strong> · {item.client}
            <div className="muted">{item.kind}</div>
          </div>
          <div className="lightbox__nav">
            {ids.length > 1 && (
              <>
                <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous">
                  ←
                </button>
                <span className="muted">
                  {i + 1} / {ids.length}
                </span>
                <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next">
                  →
                </button>
              </>
            )}
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

function Marketing() {
  const [open, setOpen] = useState<CreativeItem | null>(null);
  // In production, only show pieces whose media has been imported.
  const items = import.meta.env.DEV ? creative : creative.filter((c) => c.media.some(hasMedia));
  return (
    <section className="section" id="marketing" aria-labelledby="marketing-h">
      <div className="wrap">
        <SectionHead id="marketing-h" title="Marketing & creative" note="Websites, campaigns, and design across agency, in-house, and freelance roles." />
        <SiteGrid items={marketingSites} />
        {items.length > 0 && (
        <ul className="creative creative--after">
          {items.map((c) => {
            const cover = c.media.find(hasMedia) ?? c.media[0];
            return (
              <li key={c.id} className="creative__item reveal">
                <button type="button" className="creative__btn" onClick={() => hasMedia(cover) && setOpen(c)} aria-label={`Open ${c.title}`}>
                  <MediaFrame id={cover} sizes="(max-width: 760px) 100vw, 33vw" fallbackLabel={c.title} />
                </button>
                <p className="creative__title">{c.title}</p>
                <p className="creative__meta">
                  {c.client} · {c.kind}
                </p>
              </li>
            );
          })}
        </ul>
        )}
      </div>
      {open && <Lightbox item={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

export default function Home() {
  usePageMeta();
  return (
    <>
      <Hero />
      <AiEnablement />
      <Tools />
      <Marketing />
      <Freelance />
    </>
  );
}
