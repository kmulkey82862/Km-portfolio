import { Bullet, experience, expertise, selectedWork, skills } from '../content/experience';
import { awards, education, profile } from '../content/profile';
import { usePageMeta } from '../lib/usePageMeta';
import Swatch from '../components/Swatch';

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

export default function Resume() {
  usePageMeta('Résumé');
  return (
    <section className="page" aria-labelledby="resume-h">
      <div className="wrap">
        <Swatch id="resume-h" title="Résumé" pattern="linen" level={1} note={profile.summary}>
          <a href={profile.resumePath} className="btn btn--sm" download>
            Download PDF <span className="arrow">↓</span>
          </a>
        </Swatch>

        <p className="resume__contact muted">
          {profile.location} · {profile.workStyle}
        </p>

        <h3 className="aside-h">Expertise</h3>
        <ul className="expertise reveal">
          {expertise.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>

        <h3 className="aside-h">Platforms & tools</h3>
        <dl className="skills reveal">
          {skills.map((g) => (
            <div key={g.group}>
              <dt>{g.group}</dt>
              <dd>{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>

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
                {r.groups?.map((g) => (
                  <div key={g.heading} className="role__group">
                    <p className="role__group-h">{g.heading}</p>
                    <ul className="role__bullets">
                      {g.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                {r.highlights && (
                  <ul className="role__bullets">
                    {r.highlights.map((h) => (
                      <BulletItem key={typeof h === 'string' ? h : h.text} b={h} />
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>

        <h3 className="aside-h">Selected work</h3>
        <ul className="selwork reveal">
          {selectedWork.map((w) => (
            <li key={w.href}>
              <a href={w.href} target="_blank" rel="noopener noreferrer">
                {w.label} ↗<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
              <span className="muted">{w.display}</span>
            </li>
          ))}
        </ul>

        <div className="aside-grid">
          <div className="reveal">
            <h3 className="aside-h">Education</h3>
            <p>
              {education.degree}
              <br />
              {education.school}, {education.year}
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
                  {a.org}, {a.year}
                  <br />
                  <span className="muted">{a.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

