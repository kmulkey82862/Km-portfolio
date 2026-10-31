import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SystemsMap from '../components/SystemsMap';
import MediaFrame, { hasMedia } from '../components/MediaFrame';
import { WebDevaMark } from '../components/Bubbles';
import { metrics } from '../content/metrics';
import { caseStudies, creative, CreativeItem, sites } from '../content/projects';
import { labDemos } from '../content/lab';
import { experience, skills } from '../content/experience';
import { awards, capabilities, education, profile } from '../content/profile';
import { usePageMeta } from '../lib/usePageMeta';

function SmartLink({ href, to, children, className }: { href?: string; to?: string; children: React.ReactNode; className?: string }) {
  if (to) return <Link to={to} className={className}>{children}</Link>;
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Metrics() {
  return (
    <section className="section section--invert" id="results" aria-labelledby="results-h">
      <div className="wrap">
        <div className="section__head reveal">
          <div>
            <p className="eyebrow">Results</p>
            <h2 id="results-h" className="h-section">Numbers, with receipts.</h2>
          </div>
          <p>Every figure here comes from a campaign, report, or system I ran. Follow a number to the work behind it.</p>
        </div>
        <ul className="metrics">
          {metrics.map((m) => {
            const inner = (
              <>
                <span className="metric__value">{m.value}</span>
                <span className="metric__label">{m.label}</span>
                <span className="metric__context">{m.context}</span>
                <span className="metric__source">{m.source}</span>
              </>
            );
            return (
              <li key={m.label} className="metric reveal">
                {m.anchor ? (
                  <Link to={m.anchor.startsWith('#') ? `/${m.anchor}` : m.anchor} className="metric__link">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Systems() {
  return (
    <section className="section" id="systems" aria-labelledby="systems-h">
      <div className="wrap">
        <div className="section__head reveal">
          <div>
            <p className="eyebrow">AI enablement</p>
            <h2 id="systems-h" className="h-section">One hub, every system.</h2>
          </div>
          <p>
            At ARB I rolled out Claude Team to the whole company, then connected it to the tools we already used. The team got one place to ask
            about any client, and the busywork started running itself.
          </p>
        </div>
        <div className="reveal">
          <SystemsMap />
        </div>
        <ul className="capabilities reveal">
          {capabilities.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LabTeaser() {
  return (
    <section className="section" id="lab" aria-labelledby="lab-h">
      <div className="wrap">
        <div className="section__head reveal">
          <div>
            <p className="eyebrow">The lab</p>
            <h2 id="lab-h" className="h-section">Don’t take my word for it.</h2>
          </div>
          <p>Working versions of tools I built, rebuilt here with sample data so you can use them. Nothing leaves your browser.</p>
        </div>
        <ol className="lab-list">
          {labDemos.map((d, i) => (
            <li key={d.slug} className="reveal">
              <Link to={`/lab/${d.slug}`} className="lab-row">
                <span className="lab-row__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="lab-row__title">{d.title}</span>
                <span className="lab-row__blurb">{d.blurb}</span>
                <span className="lab-row__go" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-h">
      <div className="wrap">
        <div className="section__head reveal">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="work-h" className="h-section">Systems that shipped.</h2>
          </div>
          <p>Events were the context for this work, not the point. The point was fewer manual steps and clearer results.</p>
        </div>
        <div className="cases">
          {caseStudies.map((c) => (
            <article key={c.id} id={c.id} className="case reveal">
              {c.media && hasMedia(c.media) && <MediaFrame id={c.media} className="case__shot" sizes="(max-width: 860px) 100vw, 45vw" />}
              <p className="case__eyebrow">{c.eyebrow}</p>
              <h3 className="case__title">{c.title}</h3>
              <p className="case__summary">{c.summary}</p>
              {c.proof.length > 0 && (
                <ul className="case__proof">
                  {c.proof.map((p) => (
                    <li key={p.label}>
                      <SmartLink to={p.to} href={p.href}>
                        {p.label}
                      </SmartLink>
                      {p.status && <span className={`pill pill--${p.status}`}>{p.status === 'in-progress' ? 'In progress' : p.status}</span>}
                    </li>
                  ))}
                </ul>
              )}
              <ul className="chips">
                {c.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Sites() {
  return (
    <section className="section" id="sites" aria-labelledby="sites-h">
      <div className="wrap">
        <div className="section__head reveal">
          <div>
            <p className="eyebrow">
              Websites · <WebDevaMark />
            </p>
            <h2 id="sites-h" className="h-section">Sites I designed and built.</h2>
          </div>
          <p>{profile.webDeva.blurb}</p>
        </div>
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
                <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous">←</button>
                <span className="muted">
                  {i + 1} / {ids.length}
                </span>
                <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next">→</button>
              </>
            )}
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
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
        <div className="section__head reveal">
          <div>
            <p className="eyebrow">Creative & campaigns</p>
            <h2 id="creative-h" className="h-section">Brand, motion, and social.</h2>
          </div>
          <p>Campaign creative for museums, musicians, retailers, and startups, including AI-assisted video.</p>
        </div>
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

function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="exp-h">
      <div className="wrap">
        <div className="section__head reveal">
          <div>
            <p className="eyebrow">Experience</p>
            <h2 id="exp-h" className="h-section">Seven years of marketing, systems, and data.</h2>
          </div>
          <p>Agency, in-house, and startup roles, each one closer to the systems behind the marketing.</p>
        </div>
        <ol className="roles">
          {experience.map((r, i) => (
            <li key={r.id} className="role reveal">
              <details open={i === 0}>
                <summary>
                  <span className="role__dates">{r.dates}</span>
                  <span className="role__title">{r.title}</span>
                  <span className="role__company">{r.company}</span>
                  <span className="role__toggle" aria-hidden="true" />
                </summary>
                <div className="role__body">
                  {r.note && <p className="muted">{r.note}</p>}
                  <ul>
                    {r.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </details>
            </li>
          ))}
        </ol>

        <div className="aside-grid">
          {skills.map((g) => (
            <div key={g.group} className="reveal">
              <h3 className="aside-h">{g.group}</h3>
              <ul className="chips">
                {g.items.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="reveal">
            <h3 className="aside-h">Education</h3>
            <p>
              {education.degree}, {education.school}, {education.year}
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
                  {a.title} <span className="muted">· {a.org} {a.year} · “{a.project}”</span>
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
    <section className="section section--invert contact" id="contact" aria-labelledby="contact-h">
      <div className="wrap contact__grid">
        <div className="reveal">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-h" className="h-display">
            Let’s make AI <br />
            <span className="accent">stick</span> on your team.
          </h2>
        </div>
        <div className="contact__links reveal">
          <a href={`mailto:${profile.email}`} className="contact__email">
            {profile.email}
          </a>
          <a href={profile.phoneHref}>{profile.phone}</a>
          <span className="muted">
            {profile.location} · {profile.availability}
          </span>
          <div className="contact__ctas">
            <a href={profile.resumePath} className="btn btn--accent" download>
              Download resume <span className="arrow">↓</span>
            </a>
            <a href={`mailto:${profile.email}?subject=Let%E2%80%99s%20talk`} className="btn">
              Email me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta();
  return (
    <>
      <Hero />
      <Metrics />
      <Systems />
      <LabTeaser />
      <Work />
      <Sites />
      <Creative />
      <Experience />
      <Contact />
    </>
  );
}
