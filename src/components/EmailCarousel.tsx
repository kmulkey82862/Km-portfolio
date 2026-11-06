import { useState } from 'react';
import DeviceFrame from './DeviceFrame';
import { emailSets } from '../content/emails';

/** Click-through carousel of HTML emails, each rendered in a sandboxed desktop/mobile frame. */
export default function EmailCarousel({ set: setId }: { set: string }) {
  const set = emailSets.find((s) => s.id === setId);
  const [i, setI] = useState(0);
  if (!set || set.emails.length === 0) return null;
  const list = set.emails;
  const email = list[i];
  const go = (d: number) => setI((n) => (n + d + list.length) % list.length);
  const hid = `emails-${set.id}-h`;
  return (
    <section className="emails reveal" aria-labelledby={hid}>
      <div className="emails__head">
        <div>
          <p className="arbsites__org">{set.org}</p>
          <h3 id={hid} className="arbsites__title">
            {set.title}
          </h3>
        </div>
        <div className="emails__nav">
          <span className="muted">
            {i + 1} of {list.length}
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
        {list.map((e, k) => (
          <li key={e.file}>
            <button type="button" aria-pressed={k === i} onClick={() => setI(k)}>
              <span className="emails__type">{e.type}</span>
              {e.title}
            </button>
          </li>
        ))}
      </ul>
      <DeviceFrame key={email.file} title={email.title} src={`/emails/${email.file}`} />
      {set.note && <p className="emails__note">{set.note}</p>}
    </section>
  );
}
