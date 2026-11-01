import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SystemsMap from '../components/SystemsMap';
import MediaFrame, { hasMedia } from '../components/MediaFrame';
import { WebDevaMark } from '../components/Bubbles';
import { ArchiveLink, creative, CreativeItem, sites, tools } from '../content/projects';
import { Bullet, experience, skills } from '../content/experience';
import { awards, education, profile } from '../content/profile';
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

function Tools() {
  return (
    <section className="section" id="work" aria-labelledby="tools-h">
      <div className="wrap">
        <SectionHead
          id="tools-h"
          title="Tools & automations"
          note={
            <>
              Built at ARB Meetings & Events. Demos run on sample data; see all of them in the <Link to="/lab">lab</Link>.
            </>
          }
        />
        <ul className="archive">
          {tools.map((t) => (
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

function Sites() {
  return (
    <section className="section" id="sites" aria-labelledby="sites-h">
      <div className="wrap">
        <SectionHead
          id="sites-h"
          title="Websites"
          note={
            <>
              Through <WebDevaMark />, my freelance studio, plus the chronic disease convention site built at ARB.
            </>
          }
        />
        <ul className="sites">
          {sites.map((s) => {
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

function Creative() {
  const [open, setOpen] = useState<CreativeItem | null>(null);
  // In production, only show pieces whose media has been imported.
  const items = import.meta.env.DEV ? creative : creative.filter((c) => c.media.some(hasMedia));
  if (items.length === 0) return null;
  return (
    <section className="section" id="creative" aria-labelledby="creative-h">
      <div className="wrap">
        <SectionHead id="creative-h" title="Creative & campaigns" />
        <ul className="creative">
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
      </div>
      {open && <Lightbox item={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

function BulletItem({ b }: { b: Bullet }) {
  if (typeof b === 'string') return <li>{b}</li>;
  return (
    <li>
      {b.text}
      <ul>
        {b.sub.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </li>
  );
}

function Resume() {
  return (
    <section className="section" id="resume" aria-labelledby="resume-h">
      <div className="wrap">
        <SectionHead
          id="resume-h"
          title="Résumé"
          action={
            <a href={profile.resumePath} className="btn btn--sm" download>
              Download PDF <span className="arrow">↓</span>
            </a>
          }
        />

        <h3 className="aside-h">Experience</h3>
        <ol className="roles">
          {experience.map((r) => (
            <li key={r.id} className="role reveal">
              <p className="role__dates">{r.dates}</p>
              <div>
                <h4 className="role__title">{r.title}</h4>
                <p className="role__company">
                  {r.company}
                  {r.note && <span className="muted"> · {r.note}</span>}
                </p>
                <ul className="role__bullets">
                  {r.highlights.map((h) => (
                    <BulletItem key={typeof h === 'string' ? h : h.text} b={h} />
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="aside-h">Skills</h3>
        <dl className="skills reveal">
          {skills.map((g) => (
            <div key={g.group}>
              <dt>{g.group}</dt>
              <dd>{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>

        <div className="aside-grid">
          <div className="reveal">
            <h3 className="aside-h">Education</h3>
            <p>
              {education.degree}, {education.school} ({education.year})
            </p>
            <ul className="plain muted">
              {education.honors.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <h3 className="aside-h">Awards</h3>
            <ul className="plain">
              {awards.map((a) => (
                <li key={a.org}>
                  {a.org} {a.year}: {a.title}, “{a.project}”
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-h">
      <div className="wrap">
        <SectionHead id="contact-h" title="Contact" />
        <ul className="contact-list reveal">
          <li>
            <span className="aside-h">Email</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <span className="aside-h">Phone</span>
            <a href={profile.phoneHref}>{profile.phone}</a>
          </li>
          <li>
            <span className="aside-h">Location</span>
            {profile.location}
          </li>
          <li>
            <span className="aside-h">Résumé</span>
            <a href={profile.resumePath} download>
              Download PDF
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta();
  return (
    <>
      <Hero />
      <Tools />
      <Sites />
      <Creative />
      <Resume />
      <Contact />
    </>
  );
}
