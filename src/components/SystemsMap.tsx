import { KeyboardEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { systemNodes, SystemNode } from '../content/systems';

type Box = { x: number; y: number; w: number; h: number };
type Layout = { width: number; height: number; boxes: Record<string, Box>; vertical: boolean };

const inputs = systemNodes.filter((n) => n.side === 'in');
const outputs = systemNodes.filter((n) => n.side === 'out');
const hub = systemNodes.find((n) => n.side === 'hub')!;

function spread(count: number, start: number, end: number) {
  if (count === 1) return [(start + end) / 2];
  return Array.from({ length: count }, (_, i) => start + ((end - start) * i) / (count - 1));
}

function horizontalLayout(): Layout {
  const W = 1000, H = 580, nw = 210, nh = 52;
  const boxes: Record<string, Box> = {};
  spread(inputs.length, 50, H - 50).forEach((cy, i) => (boxes[inputs[i].id] = { x: 20, y: cy - nh / 2, w: nw, h: nh }));
  spread(outputs.length, 110, H - 110).forEach((cy, i) => (boxes[outputs[i].id] = { x: W - 20 - nw, y: cy - nh / 2, w: nw, h: nh }));
  boxes[hub.id] = { x: W / 2 - 95, y: H / 2 - 95, w: 190, h: 190 };
  return { width: W, height: H, boxes, vertical: false };
}

function verticalLayout(): Layout {
  const W = 420, H = 860, nw = 190, nh = 44, gap = 14;
  const boxes: Record<string, Box> = {};
  const col = (i: number) => (i % 2 === 0 ? (W - gap) / 2 - nw : (W + gap) / 2);
  inputs.forEach((n, i) => (boxes[n.id] = { x: col(i), y: 10 + Math.floor(i / 2) * (nh + gap), w: nw, h: nh }));
  boxes[hub.id] = { x: W / 2 - 80, y: H / 2 - 80, w: 160, h: 160 };
  outputs.forEach((n, i) => (boxes[n.id] = { x: col(i), y: H - 10 - nh - Math.floor((outputs.length - 1 - i) / 2) * (nh + gap), w: nw, h: nh }));
  return { width: W, height: H, boxes, vertical: true };
}

function edgePath(from: Box, to: Box, vertical: boolean, toHub: boolean) {
  if (vertical) {
    const x1 = from.x + from.w / 2, y1 = from.y + from.h;
    const x2 = to.x + to.w / 2, y2 = to.y;
    const my = (y1 + y2) / 2;
    return `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`;
  }
  const x1 = from.x + from.w, y1 = from.y + from.h / 2;
  const x2 = to.x, y2 = to.y + to.h / 2;
  // Edges meet the hub circle near its middle so they converge.
  const ty = toHub ? to.y + to.h / 2 + (y1 - (to.y + to.h / 2)) * 0.18 : y2;
  const fy = !toHub ? from.y + from.h / 2 + (y2 - (from.y + from.h / 2)) * 0.18 : y1;
  const mx = (x1 + x2) / 2;
  return `M${x1},${toHub ? y1 : fy} C${mx},${toHub ? y1 : fy} ${mx},${toHub ? ty : y2} ${x2},${toHub ? ty : y2}`;
}

function useVertical() {
  const query = '(max-width: 760px)';
  const [v, setV] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setV(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return v;
}

export default function SystemsMap() {
  const vertical = useVertical();
  const layout = useMemo(() => (vertical ? verticalLayout() : horizontalLayout()), [vertical]);
  const [selected, setSelected] = useState<string>(hub.id);
  const node = systemNodes.find((n) => n.id === selected)!;

  // Which nodes light up for the current selection.
  const active = useMemo(() => {
    const set = new Set<string>([selected, hub.id]);
    if (node.side === 'in') node.links?.forEach((id) => set.add(id));
    if (node.side === 'out') inputs.filter((i) => i.links?.includes(node.id)).forEach((i) => set.add(i.id));
    if (node.side === 'hub') systemNodes.forEach((n) => set.add(n.id));
    return set;
  }, [selected, node]);

  const onKey = (e: KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelected(id);
    }
  };

  const hubBox = layout.boxes[hub.id];
  const r = hubBox.w / 2;
  const hubCircle: Box = hubBox;

  const renderNode = (n: SystemNode) => {
    const b = layout.boxes[n.id];
    const isOn = active.has(n.id);
    const isSel = selected === n.id;
    if (n.side === 'hub') {
      return (
        <g
          key={n.id}
          className={`smap__hub${isSel ? ' is-selected' : ''}`}
          role="button"
          tabIndex={0}
          aria-pressed={isSel}
          aria-label={`${n.label}: show everything`}
          onClick={() => setSelected(n.id)}
          onKeyDown={(e) => onKey(e, n.id)}
        >
          <circle className="smap__halo" cx={b.x + r} cy={b.y + r} r={r + 18} />
          <circle cx={b.x + r} cy={b.y + r} r={r} />
          <text x={b.x + r} y={b.y + r - 6} textAnchor="middle" className="smap__hub-label">
            AI assistant
          </text>
          <text x={b.x + r} y={b.y + r + 18} textAnchor="middle" className="smap__hub-sub">
            knowledge base
          </text>
        </g>
      );
    }
    return (
      <g
        key={n.id}
        className={`smap__node smap__node--${n.side}${isOn ? ' is-on' : ''}${isSel ? ' is-selected' : ''}`}
        role="button"
        tabIndex={0}
        aria-pressed={isSel}
        aria-label={n.label}
        onClick={() => setSelected(n.id)}
        onKeyDown={(e) => onKey(e, n.id)}
      >
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={b.h / 2} />
        <text x={b.x + b.w / 2} y={b.y + b.h / 2 + 6} textAnchor="middle">
          {n.label}
        </text>
      </g>
    );
  };

  return (
    <div className="smap">
      <svg
        className="smap__svg"
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        role="group"
        aria-label="Systems integration: business software feeding an AI knowledge base, and what it produces"
      >
        <g aria-hidden="true">
          {inputs.map((n) => {
            const on = active.has(n.id) && (node.side !== 'out' || n.links?.includes(node.id));
            return (
              <path
                key={`e-${n.id}`}
                d={edgePath(layout.boxes[n.id], hubCircle, layout.vertical, true)}
                className={`smap__edge${on ? ' is-on' : ''}`}
              />
            );
          })}
          {outputs.map((n) => (
            <path
              key={`e-${n.id}`}
              d={edgePath(hubCircle, layout.boxes[n.id], layout.vertical, false)}
              className={`smap__edge smap__edge--out${active.has(n.id) ? ' is-on' : ''}`}
            />
          ))}
        </g>
        {!layout.vertical && (
          <g className="smap__labels" aria-hidden="true">
            <text x={120} y={14} textAnchor="middle">INPUTS</text>
            <text x={layout.width - 120} y={74} textAnchor="middle">OUTPUTS</text>
          </g>
        )}
        {systemNodes.map(renderNode)}
      </svg>
      <div className="smap__detail" aria-live="polite">
        <p className="smap__kicker">{node.side === 'in' ? 'Input' : node.side === 'out' ? 'Output' : 'The hub'}</p>
        <h3 className="h-card">{node.label}</h3>
        <p>{node.detail}</p>
        {node.demo && (
          <Link to={node.demo} className="btn btn--sm">
            Try the demo <span className="arrow">→</span>
          </Link>
        )}
        <p className="smap__hint">Select any node to trace what it connects to.</p>
      </div>
    </div>
  );
}
