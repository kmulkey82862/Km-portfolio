// Where the digests come from: everyday work sources feed scheduled Claude tasks,
// which write three short briefs. Generic labels only; no client systems are named.

type Icon = 'board' | 'inbox' | 'meeting' | 'chat' | 'calendar' | 'notes' | 'clock';

const SOURCES: { label: string; icon: Icon; color: string }[] = [
  { label: 'Project board', icon: 'board', color: '#8fa6b6' },
  { label: 'Shared inboxes', icon: 'inbox', color: '#d58aa3' },
  { label: 'Meeting summaries', icon: 'meeting', color: '#772450' },
  { label: 'Team chat', icon: 'chat', color: '#7f7c1e' },
  { label: 'Calendars', icon: 'calendar', color: '#8fa6b6' },
  { label: 'Client notes', icon: 'notes', color: '#d58aa3' },
  { label: 'Time tracker', icon: 'clock', color: '#772450' },
];

const OUTPUTS: { title: string; who: string; initials: string; color: string }[] = [
  { title: 'Weekly Team Digest', who: 'Whole team · weekly', initials: 'TD', color: '#8fa6b6' },
  { title: 'Shared Inbox Triage', who: 'Team · daily', initials: 'IT', color: '#d58aa3' },
  { title: 'Katelyn’s Chaos Brief', who: 'Just me · daily', initials: 'CB', color: '#a3164f' },
];

/** Small line icons drawn in a 20×20 box. */
function Glyph({ name }: { name: Icon }) {
  const p = { fill: 'none', stroke: '#fff', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'board':
      return (
        <g {...p}>
          <rect x="2.5" y="3.5" width="15" height="13" rx="2" />
          <path d="M7.5 3.5v13M12.5 3.5v13M3 8h4M8 10h4M13 7h4" />
        </g>
      );
    case 'inbox':
      return (
        <g {...p}>
          <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
          <path d="M3 5.5l7 5.5 7-5.5" />
        </g>
      );
    case 'meeting':
      return (
        <g {...p}>
          <rect x="2" y="5.5" width="11" height="9" rx="2" />
          <path d="M13 9l5-3v8l-5-3z" />
        </g>
      );
    case 'chat':
      return (
        <g {...p}>
          <path d="M3 5.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8l-4 3v-3.2a2 2 0 0 1-1-1.8z" />
        </g>
      );
    case 'calendar':
      return (
        <g {...p}>
          <rect x="2.5" y="4" width="15" height="13" rx="2" />
          <path d="M2.5 8.5h15M6.5 2.5v3M13.5 2.5v3" />
        </g>
      );
    case 'notes':
      return (
        <g {...p}>
          <path d="M5 2.5h7l3.5 3.5v11.5H5z" />
          <path d="M12 2.5V6h3.5M7.5 10h6M7.5 13h6" />
        </g>
      );
    case 'clock':
      return (
        <g {...p}>
          <circle cx="10" cy="10" r="7.5" />
          <path d="M10 6v4.3l2.8 1.7" />
        </g>
      );
  }
}

const W = 1120;
const H = 470;
const SRC_W = 236;
const SRC_H = 48;
const srcY = (i: number) => 22 + i * 62;
const HUB = { x: 470, y: 160, w: 190, h: 150 };
const OUT_X = 856;
const OUT_W = 264;
const OUT_H = 78;
const outY = (i: number) => 74 + i * 116;

export default function SourcesDiagram() {
  const hubMidY = HUB.y + HUB.h / 2;
  return (
    <figure className="flow" aria-label="Diagram: project boards, inboxes, meeting summaries, team chat, calendars, client notes, and a time tracker feed scheduled Claude tasks, which send three digests.">
      {/* Wide screens: one diagram */}
      <svg className="flow__svg" viewBox={`0 0 ${W} ${H}`} role="presentation">
        <defs>
          <linearGradient id="flow-hub" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c21f62" />
            <stop offset="1" stopColor="#772450" />
          </linearGradient>
        </defs>
        {SOURCES.map((s, i) => {
          const y = srcY(i) + SRC_H / 2;
          return (
            <path
              key={s.label}
              className="flow__line"
              d={`M${SRC_W} ${y} C ${SRC_W + 130} ${y}, ${HUB.x - 120} ${hubMidY}, ${HUB.x} ${hubMidY}`}
            />
          );
        })}
        {OUTPUTS.map((o, i) => {
          const y = outY(i) + OUT_H / 2;
          return (
            <path
              key={o.title}
              className="flow__line flow__line--out"
              d={`M${HUB.x + HUB.w} ${hubMidY} C ${HUB.x + HUB.w + 110} ${hubMidY}, ${OUT_X - 110} ${y}, ${OUT_X} ${y}`}
            />
          );
        })}
        {SOURCES.map((s, i) => (
          <g key={s.label} transform={`translate(0 ${srcY(i)})`}>
            <rect className="flow__node" width={SRC_W} height={SRC_H} rx="12" />
            <circle cx="26" cy={SRC_H / 2} r="15" fill={s.color} />
            <g transform={`translate(16 ${SRC_H / 2 - 10})`}>
              <Glyph name={s.icon} />
            </g>
            <text className="flow__label" x="52" y={SRC_H / 2 + 5}>
              {s.label}
            </text>
          </g>
        ))}
        <g transform={`translate(${HUB.x} ${HUB.y})`}>
          <rect width={HUB.w} height={HUB.h} rx="22" fill="url(#flow-hub)" />
          <rect x="8" y="8" width={HUB.w - 16} height={HUB.h - 16} rx="16" fill="none" stroke="rgba(255,255,255,0.28)" />
          <text className="flow__hub-kicker" x={HUB.w / 2} y="52" textAnchor="middle">
            SCHEDULED TASKS
          </text>
          <text className="flow__hub" x={HUB.w / 2} y="88" textAnchor="middle">
            Claude
          </text>
          <text className="flow__hub-sub" x={HUB.w / 2} y="114" textAnchor="middle">
            reads · condenses · routes
          </text>
        </g>
        {OUTPUTS.map((o, i) => (
          <g key={o.title} transform={`translate(${OUT_X} ${outY(i)})`}>
            <rect className="flow__node flow__node--out" width={OUT_W} height={OUT_H} rx="14" />
            <circle cx="36" cy={OUT_H / 2} r="19" fill={o.color} />
            <text className="flow__initials" x="36" y={OUT_H / 2 + 4.5} textAnchor="middle">
              {o.initials}
            </text>
            <text className="flow__out" x="66" y={OUT_H / 2 - 3}>
              {o.title}
            </text>
            <text className="flow__who" x="66" y={OUT_H / 2 + 17}>
              {o.who}
            </text>
          </g>
        ))}
      </svg>

      {/* Narrow screens: the same flow, stacked */}
      <div className="flow__stack" aria-hidden="true">
        <ul className="flow__chips">
          {SOURCES.map((s) => (
            <li key={s.label}>
              <svg viewBox="0 0 30 30" width="26" height="26">
                <circle cx="15" cy="15" r="15" fill={s.color} />
                <g transform="translate(5 5)">
                  <Glyph name={s.icon} />
                </g>
              </svg>
              {s.label}
            </li>
          ))}
        </ul>
        <span className="flow__arrow">↓</span>
        <div className="flow__hubchip">
          <small>Scheduled tasks</small>
          <b>Claude</b>
        </div>
        <span className="flow__arrow">↓</span>
        <ul className="flow__outs">
          {OUTPUTS.map((o) => (
            <li key={o.title}>
              <span style={{ background: o.color }}>{o.initials}</span>
              <b>{o.title}</b>
              <small>{o.who}</small>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
