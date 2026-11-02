import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SystemsMap from '../components/SystemsMap';
import MediaFrame, { hasMedia } from '../components/MediaFrame';
import { WebDevaMark } from '../components/Bubbles';
import Swatch from '../components/Swatch';
import { aiEnablement, arbSites, ArchiveLink, freelanceSites, Site, ToolItem, tools } from '../content/projects';
import DriveGallery from '../components/DriveGallery';
import EmailCarousel from '../components/EmailCarousel';
import { usePageMeta } from '../lib/usePageMeta';
import { getMedia } from '../lib/media';

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
        <Swatch
          id="ai-h"
          title="AI enablement"
          pattern="ticking"
          note="Rolling out AI across a team and connecting it to everyday business software, plus the client digest automation. The diagram shows how I approach systems integration."
        />
        <WorkRows items={aiEnablement} />
        <div className="archive__sub reveal" id="systems">
          <h3 className="h-card">Systems integration</h3>
          <p className="shead__note">
            How I connect common types of business software to an AI knowledge base, and what that makes possible. Select a node to see its connections.
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
        <Swatch
          id="tools-h"
          title="Tools & automation"
          pattern="plaid"
          note={
            <>
              Internal tools built at ARB Meetings & Events: speaker graphics, logo resizing, and the session archive viewer. Demos run on sample data and are collected in the <Link to="/lab">lab</Link>.
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
        const local = getMedia(s.localPage);
        const href = local && 'src' in local ? local.src : s.url;
        return (
          <li key={s.name} className="site reveal">
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="site__link">
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
        <Swatch
          id="freelance-h"
          title="Freelance work"
          pattern="herringbone"
          note={
            <>
              Websites and interactive builds through <WebDevaMark />, my freelance studio, for musicians, consultants, and small businesses.
            </>
          }
        />
        <SiteGrid items={freelanceSites} />
      </div>
    </section>
  );
}

function ArbSites() {
  return (
    <article className="arbsites reveal">
      <div className="arbsites__shots">
        {arbSites.media.filter(hasMedia).map((id) => (
          <MediaFrame key={id} id={id} className="arbsites__shot" sizes="(max-width: 860px) 100vw, 30vw" />
        ))}
      </div>
      <div className="arbsites__body">
        <p className="arbsites__org">{arbSites.org}</p>
        <h3 className="arbsites__title">{arbSites.title}</h3>
        <p className="arbsites__blurb">{arbSites.blurb}</p>
        <ul className="arbsites__tags">
          {arbSites.sites.map((site) => (
            <li key={site.name}>
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="arbtag">
                {site.name}
                {site.status === 'in-progress' && <span className="arbtag__status">In progress</span>}
                <span aria-hidden="true"> ↗</span>
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Marketing() {
  return (
    <section className="section" id="marketing" aria-labelledby="marketing-h">
      <div className="wrap">
        <Swatch
          id="marketing-h"
          title="Marketing & creative"
          pattern="cabana"
          note="Event websites built at ARB, then social media, video, email graphics, and brand work from agency, in-house, and freelance roles."
        />
        <ArbSites />
        <EmailCarousel />
        <DriveGallery />
      </div>
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
