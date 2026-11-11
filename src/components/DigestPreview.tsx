import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DIGESTS, DigestId } from '../content/digests';

// The three automated digests shown as an inbox, so they read as email at a glance.
// Sample data; senders and times are illustrative.
const META: Record<DigestId, { from: string; initials: string; color: string; time: string; to: string; snippet: string }> = {
  team: {
    from: 'Team digest',
    initials: 'TD',
    color: '#8fa6b6',
    time: 'Mon 8:00 AM',
    to: 'Whole team',
    snippet: 'Every client, one page: what’s done, in progress, waiting, and needing a decision.',
  },
  inbox: {
    from: 'Inbox triage',
    initials: 'IT',
    color: '#d58aa3',
    time: '7:00 AM',
    to: 'Team',
    snippet: 'New requests logged, assigned to an owner, and checked against replies.',
  },
  chaos: {
    from: 'Chaos Brief',
    initials: 'CB',
    color: '#a3164f',
    time: '7:00 AM',
    to: 'Just me',
    snippet: 'Only what needs me, sorted before the day starts, with updates drafted.',
  },
};

const OLDER: { id: DigestId; subject: string; time: string }[] = [
  { id: 'chaos', subject: 'Katelyn’s Chaos Brief', time: 'Fri' },
  { id: 'inbox', subject: 'Shared Inbox Triage', time: 'Fri' },
  { id: 'team', subject: 'Weekly Team Digest', time: 'Last Mon' },
];

export default function DigestPreview() {
  const ids = Object.keys(DIGESTS) as DigestId[];
  const [active, setActive] = useState<DigestId>('team');
  const [opened, setOpened] = useState<Set<DigestId>>(new Set(['team']));
  const d = DIGESTS[active];
  const m = META[active];
  const open = (id: DigestId) => {
    setActive(id);
    setOpened((s) => new Set(s).add(id));
  };
  return (
    <div className="dpreview">
      <div className="inbox">
        <div className="inbox__bar">
          <span className="inbox__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="inbox__name">Inbox</span>
          <span className="inbox__count">{ids.length - opened.size} unread</span>
          <span className="inbox__search" aria-hidden="true">
            Search mail
          </span>
        </div>
        <div className="inbox__body">
          <div className="inbox__list" role="tablist" aria-label="Digests">
            {ids.map((id) => {
              const x = META[id];
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={active === id}
                  className={`inbox__item${opened.has(id) ? '' : ' is-unread'}`}
                  onClick={() => open(id)}
                >
                  <span className="inbox__avatar" style={{ background: x.color }} aria-hidden="true">
                    {x.initials}
                  </span>
                  <span className="inbox__meta">
                    <span className="inbox__row">
                      <b>{x.from}</b>
                      <time>{x.time}</time>
                    </span>
                    <span className="inbox__subject">{DIGESTS[id].label}</span>
                    <span className="inbox__snippet">{x.snippet}</span>
                  </span>
                </button>
              );
            })}
            {/* Last week's copies, for the look of a real inbox. Not clickable. */}
            {OLDER.map((o) => (
              <div key={o.subject + o.time} className="inbox__item inbox__item--old" aria-hidden="true">
                <span className="inbox__avatar" style={{ background: META[o.id].color }}>
                  {META[o.id].initials}
                </span>
                <span className="inbox__meta">
                  <span className="inbox__row">
                    <b>{META[o.id].from}</b>
                    <time>{o.time}</time>
                  </span>
                  <span className="inbox__subject">{o.subject}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="inbox__pane" role="tabpanel" aria-label={d.label}>
            <div className="inbox__head">
              <span className="inbox__avatar inbox__avatar--lg" style={{ background: m.color }} aria-hidden="true">
                {m.initials}
              </span>
              <div>
                <h4>{d.label}</h4>
                <p>
                  <b>{m.from}</b> to {m.to} · {m.time}
                </p>
              </div>
              <span className="inbox__cadence">{d.cadence}</span>
            </div>
            {/* No allow-scripts: the emails never need them. */}
            <iframe key={active} className="inbox__frame" title={d.label} sandbox="allow-popups" srcDoc={d.build()} loading="lazy" />
          </div>
        </div>
      </div>
      <p className="dpreview__why">{d.why}</p>
      <p className="muted dpreview__fine">
        Client names and people are placeholder aliases. <Link to="/lab/client-digest">What each digest reads and does →</Link>
      </p>
    </div>
  );
}
