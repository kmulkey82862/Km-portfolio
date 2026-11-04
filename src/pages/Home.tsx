import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import DigestPreview from '../components/DigestPreview';
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
    <section className="section" id="ai" aria-labelledby="ai-h">
      <div className="wrap">
        <Swatch
          id="ai-h"
          title="AI & automation"
          pattern="ticking"
          note="Rolling out AI across a team and connecting it to everyday business software, plus the digest automations built on top of it."
        />
        <WorkRows items={aiEnablement} />
        <div className="archive__sub reveal" id="digests">
          <h3 className="h-card">What the automations send</h3>
          <p className="shead__note">The three digests as they land in the inbox, rebuilt on sample data.</p>
        </div>
        <div className="reveal">
          <DigestPreview />
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
            {s.platform && <p className="site__platform">{s.platform}</p>}
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

function Websites() {
  return (
    <section className="section" id="websites" aria-labelledby="websites-h">
      <div className="wrap">
        <Swatch
          id="websites-h"
          title="Websites"
          pattern="herringbone"
          note={
            <>
              Conference websites built at ARB Meetings & Events, sites built through <WebDevaMark />, my freelance studio, and in-house site work. None of these come from a template: each is custom-built with Claude, with my own design, graphics, and motion work.
            </>
          }
        />
        <ArbSites />
        <h3 className="subhead reveal">Freelance · Web Deva</h3>
        <SiteGrid items={freelanceSites} />
        <DriveGallery groups={['comeaux-warranty', 'vermin-mother']} />
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
        <ul className="arbsites__list">
          {arbSites.sites.map((site) => (
            <li key={site.name} className="arbsite">
              <a href={site.url} target="_blank" rel="noopener noreferrer" className="arbtag">
                {site.name}
                {site.archived && <span className="arbtag__status">Archived build</span>}
                <span aria-hidden="true"> ↗</span>
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
              <p className="arbsite__platform">{site.platform}</p>
              <p className="arbsite__blurb">{site.blurb}</p>
            </li>
          ))}
        </ul>
        <p className="arbsites__note">{arbSites.note}</p>
      </div>
    </article>
  );
}

function Social() {
  return (
    <section className="section" id="social" aria-labelledby="social-h">
      <div className="wrap">
        <Swatch
          id="social-h"
          title="Social media & video"
          pattern="cabana"
          note="Posts, stories, reels, and promo videos for retail, music, and brand clients, including AI-assisted video."
        />
        <DriveGallery groups={['comeaux-social', 'smo', 'music', 'depostrike']} />
      </div>
    </section>
  );
}

function Email() {
  return (
    <section className="section" id="email" aria-labelledby="email-h">
      <div className="wrap">
        <Swatch id="email-h" title="Email" pattern="gingham" note="Conference emails built at ARB Meetings & Events, plus email banners and graphics from in-house roles." />
        <EmailCarousel />
        <DriveGallery groups={['comeaux-brand']} />
      </div>
    </section>
  );
}

function Design() {
  return (
    <section className="section" id="design" aria-labelledby="design-h">
      <div className="wrap">
        <Swatch id="design-h" title="Brand & design" pattern="linen" note="Brand identity, exhibition promo design, and infographics." />
        <DriveGallery groups={['cura', 'hnoc', 'comeaux-infographics']} folderLink />
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
      <Websites />
      <Social />
      <Email />
      <Design />
    </>
  );
}
