import { useEffect, useMemo, useRef, useState } from 'react';
import LabShell from '../../components/LabShell';
import DeviceFrame from '../../components/DeviceFrame';

// Fictional clients and work items, standing in for a Monday.com board,
// a shared inbox, and Zoom meeting summaries.
type Source = 'board' | 'inbox' | 'zoom';
type Item = { client: string; source: Source; title: string; status: 'done' | 'in-progress' | 'waiting' | 'due'; detail: string; due?: string };

const ITEMS: Item[] = [
  { client: 'Waffle Diplomacy Summit', source: 'board', title: 'Speaker graphics batch 2', status: 'done', detail: '38 of 41 speakers have downloaded their graphic. Sir Reginald asked for a larger font.' },
  { client: 'Waffle Diplomacy Summit', source: 'board', title: 'Attendee app content', status: 'in-progress', detail: 'Session listings loaded; syrup sponsor profiles 70% complete.', due: 'Fri' },
  { client: 'Waffle Diplomacy Summit', source: 'inbox', title: 'Hotel block extension', status: 'waiting', detail: 'Asked the Pancake Plaza Hotel to extend the block 5 days. Awaiting reply.' },
  { client: 'Waffle Diplomacy Summit', source: 'zoom', title: 'Weekly planning call', status: 'due', detail: 'Client to confirm keynote order and whether the butter sculpture fits through the door.', due: 'Wed' },
  { client: 'Big Hat Appreciation League', source: 'board', title: 'Early-bird email', status: 'done', detail: 'Sent to 6,240 members. 41% open, 9% click so far.' },
  { client: 'Big Hat Appreciation League', source: 'board', title: 'Sponsor prospectus', status: 'in-progress', detail: 'Draft v2 in review. The Top Hat tier needs a taller column.', due: 'Thu' },
  { client: 'Big Hat Appreciation League', source: 'inbox', title: 'Venue ceiling height', status: 'waiting', detail: 'Venue confirming ceiling height before Friday, for obvious reasons.' },
  { client: 'National Society of Competitive Napping', source: 'zoom', title: 'Kickoff call', status: 'done', detail: 'Goals, dates, and budget captured. Two attendees fell asleep, which was on brand.' },
  { client: 'National Society of Competitive Napping', source: 'board', title: 'Registration site build', status: 'in-progress', detail: 'Ticket types configured, including the Snooze Button Pass. Payment testing next.', due: 'Mon' },
  { client: 'National Society of Competitive Napping', source: 'inbox', title: 'Logo files', status: 'waiting', detail: 'Need vector logo files for the pillow signage and the app.' },
];

const STEPS: { source: Source | 'group' | 'write'; label: string }[] = [
  { source: 'board', label: 'Scanning project boards' },
  { source: 'inbox', label: 'Reading shared inbox threads' },
  { source: 'zoom', label: 'Pulling meeting summaries' },
  { source: 'group', label: 'Grouping by client and status' },
  { source: 'write', label: 'Writing the digest' },
];

const STATUS_LABEL: Record<Item['status'], string> = {
  done: 'Completed',
  'in-progress': 'In progress',
  waiting: 'Waiting on',
  due: 'Needs a decision',
};
const SOURCE_LABEL: Record<Source, string> = { board: 'Project board', inbox: 'Shared inbox', zoom: 'Meeting notes' };

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildEmail(clients: string[], cadence: 'daily' | 'weekly') {
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const sections = clients
    .map((client) => {
      const items = ITEMS.filter((i) => i.client === client);
      const order: Item['status'][] = ['due', 'waiting', 'in-progress', 'done'];
      const groups = order
        .map((st) => {
          const list = items.filter((i) => i.status === st);
          if (!list.length) return '';
          return `<tr><td style="padding:14px 0 4px;font:500 11px/1 Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:${st === 'due' ? '#a3164f' : '#8d8992'}">${STATUS_LABEL[st]}</td></tr>${list
            .map(
              (i) =>
                `<tr><td style="padding:6px 0 6px 14px;border-left:2px solid ${st === 'due' ? '#a3164f' : '#e6e2e5'};font:300 15px/1.5 Helvetica,Arial,sans-serif;color:#0b0b0c"><strong style="font-weight:500">${esc(i.title)}</strong>${i.due ? ` <span style="color:#a3164f">· due ${i.due}</span>` : ''}<br><span style="color:#55525a">${esc(i.detail)}</span><br><span style="font-size:12px;color:#8d8992">${SOURCE_LABEL[i.source]}</span></td></tr>`,
            )
            .join('')}`;
        })
        .join('');
      return `<tr><td style="padding:28px 0 0"><h2 style="margin:0;font:200 26px/1.2 Helvetica,Arial,sans-serif;color:#0b0b0c">${esc(client)}</h2></td></tr>${groups}`;
    })
    .join('');
  const total = ITEMS.filter((i) => clients.includes(i.client));
  const open = total.filter((i) => i.status !== 'done').length;
  const decisions = total.filter((i) => i.status === 'due').length;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Digest</title></head>
<body style="margin:0;background:#f6f4f5">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f4f5"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff">
<tr><td style="background:#a3164f;padding:28px 32px">
<div style="font:400 11px/1 Helvetica,Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#f7e6ed">${cadence === 'daily' ? 'Daily' : 'Weekly'} client digest</div>
<div style="font:200 32px/1.15 Helvetica,Arial,sans-serif;color:#ffffff;margin-top:10px">${date}</div>
</td></tr>
<tr><td style="padding:24px 32px 0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
<td style="font:200 34px/1 Helvetica,Arial,sans-serif;color:#0b0b0c">${open}<div style="font:400 11px/1.6 Helvetica,Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#8d8992">open items</div></td>
<td style="font:200 34px/1 Helvetica,Arial,sans-serif;color:#a3164f">${decisions}<div style="font:400 11px/1.6 Helvetica,Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#8d8992">need a decision</div></td>
<td style="font:200 34px/1 Helvetica,Arial,sans-serif;color:#0b0b0c">${clients.length}<div style="font:400 11px/1.6 Helvetica,Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#8d8992">clients</div></td>
</tr></table>
</td></tr>
<tr><td style="padding:0 32px 32px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${sections}</table></td></tr>
<tr><td style="padding:20px 32px;border-top:1px solid #e6e2e5;font:300 12px/1.6 Helvetica,Arial,sans-serif;color:#8d8992">Compiled automatically from project boards, shared inboxes, and meeting summaries. Reply to this email to ask a follow-up question.</td></tr>
</table></td></tr></table></body></html>`;
}

export default function ClientDigest() {
  const clients = useMemo(() => [...new Set(ITEMS.map((i) => i.client))], []);
  const [chosen, setChosen] = useState<string[]>(clients);
  const [cadence, setCadence] = useState<'daily' | 'weekly'>('daily');
  const [step, setStep] = useState(-1); // -1 idle, 0..n running, n done
  const [html, setHtml] = useState('');
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const run = () => {
    window.clearTimeout(timer.current);
    setHtml('');
    const tick = (n: number) => {
      setStep(n);
      if (n === STEPS.length) {
        setHtml(buildEmail(chosen, cadence));
        return;
      }
      timer.current = window.setTimeout(() => tick(n + 1), reduced ? 60 : 650);
    };
    tick(0);
  };

  const running = step >= 0 && step < STEPS.length;
  const counts = (src: Source) => ITEMS.filter((i) => i.source === src && chosen.includes(i.client)).length;

  return (
    <LabShell slug="client-digest">
      <div className="tool">
        <div className="tool__controls">
          <fieldset className="checks">
            <legend>Clients to include</legend>
            {clients.map((c) => (
              <label key={c}>
                <input
                  type="checkbox"
                  checked={chosen.includes(c)}
                  onChange={() => setChosen((list) => (list.includes(c) ? list.filter((x) => x !== c) : [...list, c]))}
                />
                <span>{c}</span>
                <code>{ITEMS.filter((i) => i.client === c).length} items</code>
              </label>
            ))}
          </fieldset>
          <fieldset className="seg">
            <legend>Cadence</legend>
            {(['daily', 'weekly'] as const).map((c) => (
              <label key={c}>
                <input type="radio" name="cadence" checked={cadence === c} onChange={() => setCadence(c)} />
                <span>{c === 'daily' ? 'Daily' : 'Weekly'}</span>
              </label>
            ))}
          </fieldset>
          <button type="button" className="btn btn--accent" onClick={run} disabled={running || chosen.length === 0}>
            {running ? 'Running…' : html ? 'Run again' : 'Run the digest'} <span className="arrow">→</span>
          </button>

          <ol className="pipeline" aria-live="polite">
            {STEPS.map((s, i) => {
              const state = step > i || step === STEPS.length ? 'done' : step === i ? 'active' : 'idle';
              const n = s.source === 'board' || s.source === 'inbox' || s.source === 'zoom' ? counts(s.source) : null;
              return (
                <li key={s.label} className={`pipeline__step is-${state}`}>
                  <span className="pipeline__dot" aria-hidden="true" />
                  <span>{s.label}</span>
                  {n !== null && state === 'done' && <span className="muted"> · {n} found</span>}
                  {state === 'active' && <span className="visually-hidden"> (running)</span>}
                </li>
              );
            })}
          </ol>
          <p className="muted" style={{ fontSize: 13.5 }}>
            In production this ran unattended in Claude on a schedule, read live project systems and shared inboxes, and checked in when the email went
            out.
          </p>
        </div>
        <div className="tool__preview">
          {html ? (
            <DeviceFrame title={`${cadence === 'daily' ? 'Daily' : 'Weekly'} client digest`} html={html} />
          ) : (
            <div className="panel empty" style={{ minHeight: 480 }}>
              <p>{running ? 'Working…' : 'Pick clients and run the digest to see the email it writes.'}</p>
            </div>
          )}
        </div>
      </div>
    </LabShell>
  );
}
