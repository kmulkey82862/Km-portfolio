import { useState } from 'react';
import DeviceFrame from './DeviceFrame';
import { ARB_EMAIL_NOTE, arbEmails } from '../content/emails';

/** Click-through carousel of redacted HTML emails, each rendered in a sandboxed desktop/mobile frame. */
export default function EmailCarousel() {
  const [i, setI] = useState(0);
  if (arbEmails.length === 0) return null;
  const email = arbEmails[i];
  const go = (d: number) => setI((n) => (n + d + arbEmails.length) % arbEmails.length);
  return (
    <section className="emails reveal" aria-labelledby="emails-h">
      <div className="emails__head">
        <div>
          <p className="arbsites__org">Built for ARB Meetings & Events</p>
          <h3 id="emails-h" className="arbsites__title">
            Conference emails
          </h3>
        </div>
        <div className="emails__nav">
          <span className="muted">
            {i + 1} of {arbEmails.length}
          </span>
          <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous email">
            ←
          </button>
          <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next email">
            →
          </button>
        </div>
      </div>
      <ul className="emails__tabs">
        {arbEmails.map((e, k) => (
          <li key={e.file}>
            <button type="button" aria-pressed={k === i} onClick={() => setI(k)}>
              <span className="emails__type">{e.type}</span>
              {e.title}
            </button>
          </li>
        ))}
      </ul>
      <DeviceFrame key={email.file} title={email.title} src={`/emails/${email.file}`} />
      <p className="emails__note">{ARB_EMAIL_NOTE}</p>
    </section>
  );
}
