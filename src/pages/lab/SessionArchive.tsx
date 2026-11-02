import { useEffect, useMemo, useRef, useState } from 'react';
import LabShell from '../../components/LabShell';

// Placeholder sessions for a placeholder event (Client D alias). The production archive streamed real recordings
// through pay-per-view hosting; this rebuild shows the interface with a placeholder player.
type Session = { id: string; day: string; time: string; track: string; title: string; speakers: string[]; length: string };

const SESSIONS: Session[] = [
  { id: 's1', day: 'Thursday, April 15', time: '8:45 – 9:00 AM', track: 'Welcome remarks', title: 'Welcome and Opening Remarks', speakers: ['Jane Doe', 'John Doe'], length: '14:52' },
  { id: 's2', day: 'Thursday, April 15', time: '9:00 – 9:35 AM', track: 'Keynote', title: 'Building Partnerships That Last', speakers: ['Dr. John Doe'], length: '34:10' },
  { id: 's3', day: 'Thursday, April 15', time: '9:45 – 10:30 AM', track: 'Panel', title: 'Measuring What Matters: Outcomes and Evidence', speakers: ['Jane Roe', 'Richard Roe', 'Mary Major'], length: '44:31' },
  { id: 's4', day: 'Thursday, April 15', time: '11:00 – 11:45 AM', track: 'Workshop', title: 'Designing Programs People Actually Use', speakers: ['Alex Sample'], length: '43:08' },
  { id: 's5', day: 'Thursday, April 15', time: '1:30 – 2:15 PM', track: 'Breakout', title: 'From Pilot to Policy: Scaling What Works', speakers: ['Dr. Alexandra Montgomery-Whitfield'], length: '41:27' },
  { id: 's6', day: 'Friday, April 16', time: '9:00 – 9:45 AM', track: 'Keynote', title: 'The Next Five Years', speakers: ['Jordan Example'], length: '45:00' },
  { id: 's7', day: 'Friday, April 16', time: '10:00 – 10:45 AM', track: 'Panel', title: 'Data, Technology, and the People Who Use It', speakers: ['Jane Doe', 'Sam Placeholder'], length: '38:44' },
  { id: 's8', day: 'Friday, April 16', time: '4:45 – 5:30 PM', track: 'Closing', title: 'Closing Remarks and Next Steps', speakers: ['John Doe'], length: '47:19' },
];

function Player({ session, onClose }: { session: Session; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    return () => d?.close();
  }, []);
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setT((v) => (v >= 100 ? 0 : v + 0.5)), 120);
    return () => window.clearInterval(id);
  }, [playing]);
  return (
    <dialog ref={ref} className="sa-player" aria-label={`Recording: ${session.title}`} onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      <div className="sa-player__screen">
        <div className="sa-player__slate">
          <span className="sa-player__track">{session.track}</span>
          <strong>{session.title}</strong>
          <span>{session.speakers.join(' · ')}</span>
        </div>
        <button type="button" className="sa-player__big" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? '❚❚' : '▶'}
        </button>
        <span className="sa-player__note">Placeholder player · sample content</span>
      </div>
      <div className="sa-player__controls">
        <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? '❚❚' : '▶'}
        </button>
        <div className="sa-player__bar" role="progressbar" aria-valuenow={Math.round(t)} aria-valuemin={0} aria-valuemax={100}>
          <i style={{ width: `${t}%` }} />
        </div>
        <span className="sa-player__time">{session.length}</span>
        <button type="button" onClick={onClose} aria-label="Close player">
          ✕
        </button>
      </div>
    </dialog>
  );
}

export default function SessionArchive() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<Session | null>(null);
  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return SESSIONS.filter((s) => !term || `${s.title} ${s.speakers.join(' ')} ${s.track}`.toLowerCase().includes(term));
  }, [q]);
  const days = [...new Set(results.map((s) => s.day))];

  return (
    <LabShell slug="session-archive">
      <div className="sa">
        <header className="sa__head">
          <p className="sa__event">Client D Conference 2027 · placeholder alias</p>
          <h2 className="sa__title">
            Session <span className="sa__play" aria-hidden="true">▶</span> Archive
          </h2>
          <p className="sa__lede">Watch the conference on demand. Keynotes, panels, and workshops, all in one place.</p>
        </header>
        <label className="sa__search">
          <span className="visually-hidden">Search by session title or speaker</span>
          <input type="search" placeholder="Search by session title or speaker…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <p className="sa__count">
          {results.length} {results.length === 1 ? 'recording' : 'recordings'}
        </p>
        {days.map((day) => (
          <section key={day} className="sa__day" aria-label={day}>
            <h3 className="sa__dayband">{day}</h3>
            <ul className="sa__list">
              {results
                .filter((s) => s.day === day)
                .map((s) => (
                  <li key={s.id} className="sa__card">
                    <div>
                      <p className="sa__meta">
                        <span>{s.time}</span>
                        <span className="sa__track">{s.track}</span>
                      </p>
                      <p className="sa__session">{s.title}</p>
                      <p className="sa__speakers">{s.speakers.join(' · ')}</p>
                    </div>
                    <button type="button" className="sa__watch" onClick={() => setOpen(s)}>
                      ▶ Watch
                    </button>
                  </li>
                ))}
            </ul>
          </section>
        ))}
        {results.length === 0 && <p className="muted">No sessions match “{q}”.</p>}
      </div>
      {open && <Player session={open} onClose={() => setOpen(null)} />}
    </LabShell>
  );
}
