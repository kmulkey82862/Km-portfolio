import { FormEvent, useMemo, useState } from 'react';
import LabShell from '../../components/LabShell';
import { merge, parseCsv, toCsv, uniqueCodes } from '../../lib/codes';

// Fictional invitees. example.org addresses are reserved for documentation.
const FIRST = ['Avery', 'Jordan', 'Morgan', 'Riley', 'Casey', 'Quinn', 'Reese', 'Skyler', 'Dakota', 'Emerson', 'Rowan', 'Harper', 'Sage', 'Parker', 'Blake', 'Hayden', 'Kendall', 'Logan', 'Marlowe', 'Finley', 'Tatum', 'Ellis', 'Remy', 'Shea'];
const LAST = ['Boudreaux', 'Landry', 'Thibodeaux', 'Guidry', 'Hebert', 'Fontenot', 'Broussard', 'Arceneaux', 'Melancon', 'Robichaux', 'Doucet', 'LeBlanc'];
const ORGS = ['State Medicaid Office', 'Bayou Health Partners', 'Crescent Care Network', 'Delta Policy Institute', 'Gulf Coast Public Health', 'Pelican Health Plan'];

const SAMPLE_CSV = [
  'first_name,last_name,email,organization',
  ...FIRST.map((f, i) => {
    const l = LAST[(i * 5) % LAST.length];
    return `${f},${l},${f.toLowerCase()}.${l.toLowerCase()}@example.org,${ORGS[i % ORGS.length]}`;
  }),
].join('\n');

const DEFAULT_SUBJECT = 'Your complimentary registration, {{first_name}}';
const DEFAULT_BODY = `Hi {{first_name}},

As a guest of the Gulf Coast Health Summit, your registration is on us.

Use this code at checkout: {{code}}
Register here: {{link}}

Codes are single-use and reserved for {{organization}} until April 1.

See you in New Orleans,
The Summit Team`;

const REMINDERS = [
  { day: 3, name: 'Reminder 1' },
  { day: 7, name: 'Reminder 2' },
  { day: 10, name: 'Final notice' },
];
const DEADLINE = 12;

type Invitee = {
  first_name: string;
  last_name: string;
  email: string;
  organization: string;
  code: string;
  redeemedDay: number | null;
  reminders: number;
};

export default function RegistrationCodes() {
  const [csv, setCsv] = useState(SAMPLE_CSV);
  const [prefix, setPrefix] = useState('GCHS27-');
  const [length, setLength] = useState(6);
  const [subject, setSubject] = useState(DEFAULT_SUBJECT);
  const [body, setBody] = useState(DEFAULT_BODY);
  const [invitees, setInvitees] = useState<Invitee[]>([]);
  const [day, setDay] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);
  const [check, setCheck] = useState('');
  const [checkResult, setCheckResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [error, setError] = useState('');

  const generate = () => {
    setError('');
    const rows = parseCsv(csv).filter((r) => r.email);
    if (!rows.length) {
      setError('Add at least one invitee with an email column.');
      return;
    }
    try {
      const codes = uniqueCodes(rows.length, length, prefix);
      setInvitees(
        rows.map((r, i) => ({
          first_name: r.first_name ?? '',
          last_name: r.last_name ?? '',
          email: r.email,
          organization: r.organization ?? '',
          code: codes[i],
          redeemedDay: null,
          reminders: 0,
        })),
      );
      setDay(0);
      setSelected(0);
      setCheckResult(null);
      setLog([`Day 0 · ${rows.length} unique codes generated and merged into personalized invitations`]);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const advance = (days = 1) => {
    let list = invitees;
    let d = day;
    const entries: string[] = [];
    for (let n = 0; n < days && d < DEADLINE; n++) {
      d += 1;
      // Redemption odds decay over time, with a bump the day after each reminder.
      const bump = REMINDERS.some((r) => r.day === d - 1) ? 0.16 : 0;
      const p = Math.max(0.03, 0.2 * Math.exp(-d / 4)) + bump;
      let redeemed = 0;
      list = list.map((inv) => {
        if (inv.redeemedDay === null && Math.random() < p) {
          redeemed++;
          return { ...inv, redeemedDay: d };
        }
        return inv;
      });
      if (redeemed) entries.push(`Day ${d} · ${redeemed} registered with their code`);
      const reminder = REMINDERS.find((r) => r.day === d);
      if (reminder) {
        const pending = list.filter((i) => i.redeemedDay === null);
        list = list.map((inv) => (inv.redeemedDay === null ? { ...inv, reminders: inv.reminders + 1 } : inv));
        entries.push(`Day ${d} · ${reminder.name} sent to ${pending.length} who haven’t registered`);
      }
      if (d === DEADLINE) entries.push(`Day ${d} · Deadline. Unused codes released back to inventory`);
    }
    setInvitees(list);
    setDay(d);
    setLog((l) => [...entries.reverse(), ...l]);
  };

  const redeemed = invitees.filter((i) => i.redeemedDay !== null).length;
  const remindersSent = invitees.reduce((n, i) => n + i.reminders, 0);
  const nextReminder = REMINDERS.find((r) => r.day > day);
  const current = invitees[selected];

  const merged = useMemo(() => {
    if (!current) return null;
    const { first_name, last_name, email, organization, code } = current;
    const fields = { first_name, last_name, email, organization, code, link: `https://example.org/register?code=${code}` };
    return { subject: merge(subject, fields), body: merge(body, fields) };
  }, [current, subject, body]);

  const statusOf = (i: Invitee) => {
    if (i.redeemedDay !== null) return { label: `Registered · day ${i.redeemedDay}`, cls: 'live' };
    if (i.reminders > 0) return { label: REMINDERS[i.reminders - 1].name + ' sent', cls: 'in-progress' };
    return { label: 'Invited', cls: '' };
  };

  const onCheck = (e: FormEvent) => {
    e.preventDefault();
    const code = check.trim().toUpperCase();
    const inv = invitees.find((i) => i.code === code);
    if (!inv) setCheckResult({ ok: false, msg: 'Code not recognized.' });
    else if (inv.redeemedDay !== null) setCheckResult({ ok: false, msg: `Already used by ${inv.first_name} on day ${inv.redeemedDay}.` });
    else {
      setInvitees((list) => list.map((i) => (i.code === code ? { ...i, redeemedDay: day } : i)));
      setCheckResult({ ok: true, msg: `Valid. ${inv.first_name} ${inv.last_name} is registered at no charge.` });
      setLog((l) => [`Day ${day} · ${inv.first_name} ${inv.last_name} redeemed ${code} at checkout`, ...l]);
    }
  };

  const exportCsv = () => {
    const rows = invitees.map((i) => ({
      first_name: i.first_name,
      last_name: i.last_name,
      email: i.email,
      organization: i.organization,
      code: i.code,
      status: statusOf(i).label,
      reminders_sent: i.reminders,
    }));
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([toCsv(rows)], { type: 'text/csv' }));
    a.download = 'comp-registration-codes.csv';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  return (
    <LabShell slug="registration-codes">
      <ol className="steps">
        <li className="step">
          <div className="step__head">
            <span className="step__n">1</span>
            <h2 className="h-card">Invitees and codes</h2>
          </div>
          <div className="step__grid">
            <label className="field">
              Invitee list (CSV: first_name, last_name, email, organization)
              <textarea rows={9} value={csv} onChange={(e) => setCsv(e.target.value)} spellCheck={false} />
            </label>
            <div className="tool__controls">
              <div className="tool__row">
                <label className="field">
                  Code prefix
                  <input value={prefix} onChange={(e) => setPrefix(e.target.value.toUpperCase())} />
                </label>
                <label className="field">
                  Random characters
                  <input type="number" min={4} max={12} value={length} onChange={(e) => setLength(Math.min(12, Math.max(4, +e.target.value || 4)))} />
                </label>
              </div>
              <p className="muted" style={{ fontSize: 13.5, margin: 0 }}>
                Codes skip look-alike characters (0/O, 1/I/L) and are checked for collisions.
              </p>
              <button type="button" className="btn btn--accent" onClick={generate}>
                {invitees.length ? 'Regenerate codes' : 'Generate codes'} <span className="arrow">→</span>
              </button>
              {error && <p role="alert" className="accent">{error}</p>}
            </div>
          </div>
        </li>

        {invitees.length > 0 && (
          <>
            <li className="step">
              <div className="step__head">
                <span className="step__n">2</span>
                <h2 className="h-card">Personalized email</h2>
              </div>
              <div className="step__grid">
                <div className="tool__controls">
                  <label className="field">
                    Subject
                    <input value={subject} onChange={(e) => setSubject(e.target.value)} />
                  </label>
                  <label className="field">
                    Body (merge tags: {'{{first_name}} {{code}} {{link}} {{organization}}'})
                    <textarea rows={10} value={body} onChange={(e) => setBody(e.target.value)} />
                  </label>
                </div>
                {merged && (
                  <div className="mail">
                    <div className="mail__head">
                      <div>
                        <span className="muted">To</span> {current.first_name} {current.last_name} &lt;{current.email}&gt;
                      </div>
                      <div>
                        <span className="muted">Subject</span> {merged.subject}
                      </div>
                    </div>
                    <div className="mail__body">{merged.body}</div>
                    <div className="mail__foot muted">Previewing invitee {selected + 1} of {invitees.length}. Select a row below to switch.</div>
                  </div>
                )}
              </div>
            </li>

            <li className="step">
              <div className="step__head">
                <span className="step__n">3</span>
                <h2 className="h-card">Track redemptions and reminders</h2>
              </div>
              <div className="stat-row">
                <div className="stat">
                  <b>{invitees.length}</b>
                  <span>Invited</span>
                </div>
                <div className="stat">
                  <b className="accent">{Math.round((redeemed / invitees.length) * 100)}%</b>
                  <span>Registered ({redeemed})</span>
                  <div className="bar">
                    <i style={{ width: `${(redeemed / invitees.length) * 100}%` }} />
                  </div>
                </div>
                <div className="stat">
                  <b>{invitees.length - redeemed}</b>
                  <span>Still pending</span>
                </div>
                <div className="stat">
                  <b>{remindersSent}</b>
                  <span>Reminders sent</span>
                </div>
              </div>
              <div className="sim-bar">
                <span>
                  <b>Day {day}</b> of {DEADLINE}
                  {nextReminder && day < DEADLINE && <span className="muted"> · next: {nextReminder.name} on day {nextReminder.day}</span>}
                </span>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn--sm" disabled={day >= DEADLINE} onClick={() => advance(1)}>
                    Advance a day
                  </button>
                  <button type="button" className="btn btn--sm btn--accent" disabled={day >= DEADLINE} onClick={() => advance(DEADLINE)}>
                    Run to deadline
                  </button>
                  <button type="button" className="btn btn--sm" onClick={exportCsv}>
                    Export CSV
                  </button>
                </div>
              </div>
              <div className="step__grid step__grid--wide">
                <div className="table-wrap" style={{ maxHeight: 420 }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Invitee</th>
                        <th>Organization</th>
                        <th>Code</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invitees.map((i, idx) => {
                        const st = statusOf(i);
                        return (
                          <tr
                            key={i.code}
                            className={idx === selected ? 'is-selected' : undefined}
                            onClick={() => setSelected(idx)}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setSelected(idx)}
                            aria-selected={idx === selected}
                          >
                            <td>
                              {i.first_name} {i.last_name}
                            </td>
                            <td className="muted">{i.organization}</td>
                            <td>
                              <code>{i.code}</code>
                            </td>
                            <td>
                              <span className={`pill${st.cls ? ` pill--${st.cls}` : ''}`}>{st.label}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="tool__controls">
                  <form className="panel" onSubmit={onCheck}>
                    <p className="panel__h">Checkout validation</p>
                    <label className="field">
                      Try a code (copy one from the table)
                      <input value={check} onChange={(e) => setCheck(e.target.value)} placeholder={invitees[0]?.code} spellCheck={false} />
                    </label>
                    <button type="submit" className="btn btn--sm" style={{ marginTop: 12 }}>
                      Apply code
                    </button>
                    {checkResult && (
                      <p role="status" className={checkResult.ok ? 'ok' : 'accent'} style={{ marginTop: 12, fontSize: 14 }}>
                        {checkResult.msg}
                      </p>
                    )}
                  </form>
                  <div className="panel">
                    <p className="panel__h">Activity</p>
                    <ul className="log">
                      {log.map((l, i) => (
                        <li key={log.length - i}>{l}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </>
        )}
      </ol>
    </LabShell>
  );
}
