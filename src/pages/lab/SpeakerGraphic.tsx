import { PointerEvent, useEffect, useRef, useState } from 'react';
import LabShell from '../../components/LabShell';
import { fitText } from '../../lib/fitText';

type Format = 'square' | 'landscape';
type Template = 'raspberry' | 'noir' | 'paper';
type Photo = CanvasImageSource & { width: number; height: number };

const FORMATS: Record<Format, { w: number; h: number; label: string }> = {
  square: { w: 1080, h: 1080, label: 'Instagram · 1080×1080' },
  landscape: { w: 1200, h: 627, label: 'LinkedIn · 1200×627' },
};

const TEMPLATES: Record<Template, { bg: string; ink: string; soft: string; accent: string; accentInk: string; ring: string; label: string }> = {
  raspberry: { bg: '#a3164f', ink: '#ffffff', soft: 'rgba(255,255,255,0.8)', accent: '#ffffff', accentInk: '#a3164f', ring: 'rgba(255,255,255,0.9)', label: 'Raspberry' },
  noir: { bg: '#0b0b0c', ink: '#f4f1f3', soft: 'rgba(244,241,243,0.72)', accent: '#e0457f', accentInk: '#0b0b0c', ring: '#e0457f', label: 'Noir' },
  paper: { bg: '#ffffff', ink: '#0b0b0c', soft: '#55525a', accent: '#a3164f', accentInk: '#ffffff', ring: '#a3164f', label: 'Paper' },
};

// Placeholder event and speakers (Client D is the alias used for this client across the portfolio).
// No real people or organizations appear in this demo.
const EVENT = 'Client D Conference 2027';
const LIVE_TOOL = 'https://fimcon.org/en/speaker-social';

type Speaker = { name: string; role: string; session: string; when: string; room: string };

const EXAMPLES: (Speaker & { template: Template; avatar: [string, string, string]; caption: string })[] = [
  {
    name: 'Jane Doe',
    role: 'Director, Sample Organization',
    session: 'Opening Remarks',
    when: 'Thu, Apr 15 · 9:00 AM',
    room: 'Ballroom A',
    template: 'raspberry',
    avatar: ['#e4edf3', '#8fa6b6', '#d58aa3'],
    caption: 'Short name, short session',
  },
  {
    name: 'Dr. John Doe',
    role: 'Chief Program Officer, Example Health Network',
    session: 'Building Partnerships That Last: Lessons From the Field',
    when: 'Thu, Apr 15 · 1:30 PM',
    room: 'Salon 2',
    template: 'noir',
    avatar: ['#f7dde6', '#c4527d', '#772450'],
    caption: 'Typical lengths',
  },
  {
    name: 'Dr. Alexandra Catherine Montgomery-Whitfield, MPH',
    role: 'Senior Vice President of Strategic Partnerships and Community Engagement, Example Regional Health Alliance',
    session:
      'From Pilot to Policy: What We Learned Scaling Community-Based Programs Across Multiple States, and What We Would Do Differently',
    when: 'Fri, Apr 16 · 4:45 PM',
    room: 'Grand Ballroom C',
    template: 'paper',
    avatar: ['#f2eed6', '#b5b23a', '#d58aa3'],
    caption: 'Long name, title, and session',
  },
];

/** rgba() from a #rrggbb colour. */
function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/**
 * A placeholder portrait so the demo works before anyone uploads a photo:
 * soft fields of colour behind a frosted-glass silhouette, with a little grain.
 * Abstract on purpose; no real person is depicted.
 */
function sampleAvatar([light, mid, deep]: [string, string, string]): HTMLCanvasElement {
  const S = 800;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d')!;

  const base = g.createLinearGradient(0, 0, S, S);
  base.addColorStop(0, light);
  base.addColorStop(1, mid);
  g.fillStyle = base;
  g.fillRect(0, 0, S, S);

  const field = (x: number, y: number, r: number, color: string, a: number) => {
    const rg = g.createRadialGradient(x, y, 0, x, y, r);
    rg.addColorStop(0, rgba(color, a));
    rg.addColorStop(1, rgba(color, 0));
    g.fillStyle = rg;
    g.fillRect(0, 0, S, S);
  };
  field(660, 120, 460, deep, 0.8);
  field(110, 640, 420, '#ffffff', 0.5);
  field(600, 720, 380, light, 0.7);
  field(170, 150, 320, mid, 0.55);
  field(400, 320, 300, '#ffffff', 0.4); // light behind the head

  // Soft points of light, like a lens out of focus.
  for (const [x, y, r, a] of [
    [150, 210, 70, 0.35],
    [690, 330, 54, 0.3],
    [600, 120, 34, 0.4],
    [110, 430, 40, 0.25],
    [710, 560, 80, 0.2],
  ]) {
    field(x, y, r, '#ffffff', a);
  }

  // Frosted-glass bust: one shape (head and shoulders), translucent white with a soft glow.
  const glass = g.createLinearGradient(0, 170, 0, S);
  glass.addColorStop(0, 'rgba(255,255,255,0.8)');
  glass.addColorStop(0.55, 'rgba(255,255,255,0.58)');
  glass.addColorStop(1, 'rgba(255,255,255,0.3)');
  g.save();
  g.shadowColor = 'rgba(255,255,255,0.75)';
  g.shadowBlur = 22;
  g.fillStyle = glass;
  g.beginPath();
  g.moveTo(30, S + 20);
  g.bezierCurveTo(40, 650, 190, 562, 316, 544);
  g.quadraticCurveTo(352, 532, 354, 476);
  g.lineTo(446, 476);
  g.quadraticCurveTo(448, 532, 484, 544);
  g.bezierCurveTo(610, 562, 760, 650, 770, S + 20);
  g.closePath();
  g.moveTo(532, 322);
  g.ellipse(400, 322, 132, 156, 0, 0, Math.PI * 2);
  g.fill();
  g.restore();
  // Highlight on the upper left of the head and a light sweep across the frame.
  const hi = g.createRadialGradient(348, 256, 0, 348, 256, 130);
  hi.addColorStop(0, 'rgba(255,255,255,0.55)');
  hi.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = hi;
  g.beginPath();
  g.ellipse(400, 322, 132, 156, 0, 0, Math.PI * 2);
  g.fill();
  const sweep = g.createLinearGradient(0, 0, S, S);
  sweep.addColorStop(0.3, 'rgba(255,255,255,0)');
  sweep.addColorStop(0.45, 'rgba(255,255,255,0.16)');
  sweep.addColorStop(0.6, 'rgba(255,255,255,0)');
  g.fillStyle = sweep;
  g.fillRect(0, 0, S, S);

  // Fine grain, seeded so every render matches.
  const img = g.getImageData(0, 0, S, S);
  let seed = 7;
  for (let i = 0; i < img.data.length; i += 4) {
    seed = (seed * 16807) % 2147483647;
    const n = ((seed / 2147483647) - 0.5) * 16;
    img.data[i] += n;
    img.data[i + 1] += n;
    img.data[i + 2] += n;
  }
  g.putImageData(img, 0, 0);
  return c;
}

/** Placeholder event mark: the Client D alias (lettered tile) plus a two-line wordmark. */
function drawLogo(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, bg: string, bold: string) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, size, size, size * 0.24);
  ctx.fill();
  ctx.fillStyle = bg;
  ctx.font = `800 ${size * 0.6}px ${bold}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('D', x + size / 2, y + size * 0.54);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = color;
  ctx.textBaseline = 'alphabetic';
  ctx.font = `700 ${size * 0.36}px ${bold}`;
  ctx.letterSpacing = `${size * 0.02}px`;
  const tx = x + size * 1.25;
  ctx.fillText('CLIENT D', tx, y + size * 0.46);
  ctx.font = `500 ${size * 0.28}px ${bold}`;
  ctx.letterSpacing = `${size * 0.06}px`;
  ctx.fillText('CONFERENCE 2027', tx, y + size * 0.9);
  ctx.restore();
}

/** Background design for each template, drawn under the photo and text. Kept low-contrast so text stays legible. */
function decorate(ctx: CanvasRenderingContext2D, tpl: Template, W: number, H: number, cx: number, cy: number, r: number, left: number) {
  const glow = (x: number, y: number, rad: number, color: string, a: number) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, rad);
    g.addColorStop(0, rgba(color, a));
    g.addColorStop(1, rgba(color, 0));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  };
  const rings = (color: string, alphas: number[], step: number) => {
    ctx.lineWidth = 1.5;
    alphas.forEach((a, i) => {
      ctx.strokeStyle = rgba(color, a);
      ctx.beginPath();
      ctx.arc(cx, cy, r + 14 + step * (i + 1), 0, Math.PI * 2);
      ctx.stroke();
    });
  };
  ctx.save();
  if (tpl === 'raspberry') {
    const base = ctx.createLinearGradient(0, 0, W, H);
    base.addColorStop(0, '#bd1f60');
    base.addColorStop(0.55, '#a3164f');
    base.addColorStop(1, '#6f0f3b');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, W, H);
    glow(cx, cy, r * 2.4, '#f3d2dc', 0.32);
    glow(0, H, Math.max(W, H) * 0.6, '#772450', 0.55);
    // A large blush disc offset behind the photo.
    ctx.fillStyle = 'rgba(243,210,220,0.17)';
    ctx.beginPath();
    ctx.arc(cx + r * 0.6, cy - r * 0.5, r * 1.2, 0, Math.PI * 2);
    ctx.fill();
    rings('#ffffff', [0.38, 0.24, 0.13, 0.06], r * 0.32);
    // A striped ribbon across the lower right corner, after the ticking fabric.
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(W * 0.7, H);
    ctx.lineTo(W, H * 0.74);
    ctx.lineTo(W, H * 0.86);
    ctx.lineTo(W * 0.83, H);
    ctx.closePath();
    ctx.fillStyle = 'rgba(243,210,220,0.9)';
    ctx.fill();
    ctx.clip();
    ctx.strokeStyle = 'rgba(163,22,79,0.32)';
    ctx.lineWidth = 2;
    for (let d = W * 0.5; d < W * 1.4; d += 14) {
      ctx.beginPath();
      ctx.moveTo(d, H);
      ctx.lineTo(d + H * 0.5, H * 0.5);
      ctx.stroke();
    }
    ctx.restore();
    // A small dot field in the lower right corner.
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    for (let x = W - 36; x > W - 36 - 26 * 7; x -= 26)
      for (let y = H - 36; y > H - 36 - 26 * 5; y -= 26) {
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
  } else if (tpl === 'noir') {
    glow(cx, cy, r * 2.7, '#e0457f', 0.5);
    // An oversized raspberry ring sweeping in from the lower left.
    ctx.strokeStyle = 'rgba(224,69,127,0.3)';
    ctx.lineWidth = Math.round(W * 0.022);
    ctx.beginPath();
    ctx.arc(W * 0.04, H * 1.02, Math.min(W, H) * 0.42, 0, Math.PI * 2);
    ctx.stroke();
    glow(0, H, Math.max(W, H) * 0.7, '#772450', 0.55);
    glow(W, 0, r * 1.4, '#c9d6df', 0.1);
    // Faint diagonal lines across the frame.
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let d = -H; d < W; d += 26) {
      ctx.beginPath();
      ctx.moveTo(d, H);
      ctx.lineTo(d + H, 0);
      ctx.stroke();
    }
    rings('#e0457f', [0.48, 0.28, 0.14], r * 0.34);
    // Crosshair marks in the corners, like registration marks on a print sheet.
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1.5;
    for (const [x, y] of [
      [28, 28],
      [W - 28, H - 28],
    ]) {
      ctx.beginPath();
      ctx.moveTo(x - 9, y);
      ctx.lineTo(x + 9, y);
      ctx.moveTo(x, y - 9);
      ctx.lineTo(x, y + 9);
      ctx.stroke();
    }
  } else {
    glow(cx, cy, r * 2.5, '#f3d2dc', 0.85);
    // Colour discs: blush behind the photo, icy blue in the lower right, olive accents.
    ctx.fillStyle = 'rgba(243,210,220,0.75)';
    ctx.beginPath();
    ctx.arc(cx + r * 0.55, cy - r * 0.45, r * 1.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(201,214,223,0.7)';
    ctx.beginPath();
    ctx.arc(W * 0.98, H * 0.98, Math.min(W, H) * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(127,124,30,0.55)';
    for (const [x, y, d] of [
      [cx - r * 1.2, cy + r * 0.95, 9],
      [cx - r * 1.05, cy + r * 1.12, 5],
      [cx - r * 1.32, cy + r * 1.16, 4],
    ]) {
      ctx.beginPath();
      ctx.arc(x, y, d, 0, Math.PI * 2);
      ctx.fill();
    }
    glow(W, H, Math.max(W, H) * 0.55, '#c9d6df', 0.6);
    glow(left + 40, H * 0.15, r * 0.9, '#e8e2c4', 0.5);
    // A faint gingham grid, after the fabrics on the portfolio.
    ctx.strokeStyle = 'rgba(163,22,79,0.05)';
    ctx.lineWidth = 1;
    for (let x = left - 20; x < W; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 24) {
      ctx.beginPath();
      ctx.moveTo(left - 20, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    rings('#a3164f', [0.42, 0.24, 0.11], r * 0.3);
  }
  ctx.restore();
}

type State = Speaker & { format: Format; template: Template; zoom: number; dx: number; dy: number };

function draw(canvas: HTMLCanvasElement, s: State, photo: Photo, family: string, bold: string) {
  const { w: W, h: H } = FORMATS[s.format];
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const t = TEMPLATES[s.template];
  const square = s.format === 'square';
  const pad = square ? 80 : 60;

  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, W, H);

  // Paper template: a raspberry band down the left edge carrying the event name.
  let left = pad;
  if (s.template === 'paper') {
    const band = square ? 92 : 76;
    ctx.fillStyle = t.accent;
    ctx.fillRect(0, 0, band, H);
    ctx.save();
    ctx.translate(band / 2 + 8, H - pad);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#ffffff';
    ctx.font = `600 ${square ? 22 : 18}px ${bold}`;
    ctx.letterSpacing = '6px';
    ctx.fillText(EVENT.toUpperCase(), 0, 0);
    ctx.restore();
    left = band + pad * 0.75;
  }

  // Photo in a circle with a thin ring.
  const r = square ? W * 0.19 : H * 0.3;
  const cx = square ? W - pad - r : left + r;
  const cy = square ? pad + r + 6 : H / 2;
  decorate(ctx, s.template, W, H, cx, cy, r, left);
  if (s.template === 'paper') {
    // Redraw the band so the background design sits behind it.
    const band = square ? 92 : 76;
    ctx.fillStyle = t.accent;
    ctx.fillRect(0, 0, band, H);
    ctx.save();
    ctx.translate(band / 2 + 8, H - pad);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#ffffff';
    ctx.font = `600 ${square ? 22 : 18}px ${bold}`;
    ctx.letterSpacing = '6px';
    ctx.fillText(EVENT.toUpperCase(), 0, 0);
    ctx.restore();
  }
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  const scale = Math.max((2 * r) / photo.width, (2 * r) / photo.height) * s.zoom;
  const pw = photo.width * scale;
  const ph = photo.height * scale;
  ctx.drawImage(photo, cx - pw / 2 + s.dx * r, cy - ph / 2 + s.dy * r, pw, ph);
  ctx.restore();
  ctx.strokeStyle = t.ring;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 14, 0, Math.PI * 2);
  ctx.stroke();

  // Text column.
  const tx = square ? left : cx + r + 52;
  const maxW = W - tx - pad;
  ctx.textBaseline = 'alphabetic';
  ctx.letterSpacing = '0px';

  drawLogo(ctx, tx, pad, square ? 60 : 44, t.accent, t.bg, bold);

  // "Speaker" badge
  let y = square ? cy + r + 78 : pad + 108;
  ctx.font = `700 ${square ? 18 : 15}px ${bold}`;
  ctx.letterSpacing = '4px';
  const badge = 'SPEAKER';
  const bw = ctx.measureText(badge).width + (square ? 36 : 28);
  const bh = square ? 38 : 30;
  ctx.fillStyle = t.accent;
  ctx.beginPath();
  ctx.roundRect(tx, y - bh + 8, bw, bh, bh / 2);
  ctx.fill();
  ctx.fillStyle = t.accentInk;
  ctx.fillText(badge, tx + (square ? 19 : 15), y - (square ? 4 : 3));
  ctx.letterSpacing = '0px';

  // Footer: date and room, pinned to the bottom of the column.
  const bottom = H - pad;
  ctx.fillStyle = t.accent;
  ctx.font = `600 ${square ? 24 : 18}px ${bold}`;
  const footer = fitText(ctx, `${s.when}  ·  ${s.room}`, { maxWidth: maxW, maxLines: 1, max: square ? 24 : 18, min: 13, weight: 600, family: bold });
  ctx.font = `600 ${footer.size}px ${bold}`;
  ctx.fillText(footer.lines[0] ?? '', tx, bottom);

  // Name, role, divider, session: each fitted to its own space.
  const name = fitText(ctx, s.name, { maxWidth: maxW, maxLines: 2, max: square ? 92 : 60, min: square ? 38 : 28, weight: 200, family });
  ctx.fillStyle = t.ink;
  ctx.font = `200 ${name.size}px ${family}`;
  y += 24 + name.size * 0.95;
  name.lines.forEach((l, i) => ctx.fillText(l, tx, y + i * name.size * 1.0));
  y += (name.lines.length - 1) * name.size * 1.0;

  const role = fitText(ctx, s.role, { maxWidth: maxW, maxLines: 2, max: square ? 28 : 21, min: 15, weight: 300, family });
  ctx.fillStyle = t.soft;
  ctx.font = `300 ${role.size}px ${family}`;
  y += role.size * 1.6;
  role.lines.forEach((l, i) => ctx.fillText(l, tx, y + i * role.size * 1.3));
  y += (role.lines.length - 1) * role.size * 1.3 + (square ? 34 : 22);

  ctx.strokeStyle = t.accent;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(tx, y);
  ctx.lineTo(tx + 56, y);
  ctx.stroke();

  const room = bottom - footer.size - (square ? 34 : 22) - (y + 16);
  let size = square ? 46 : 32;
  let lines: string[] = [];
  // Shrink until the session fits both the line limit and the space above the footer.
  for (;;) {
    const f = fitText(ctx, s.session, { maxWidth: maxW, maxLines: 4, max: size, min: 15, weight: 300, family });
    size = f.size;
    lines = f.lines;
    if (lines.length * size * 1.18 <= room || size <= 15) break;
    size -= 2;
  }
  ctx.fillStyle = t.ink;
  ctx.font = `300 ${size}px ${family}`;
  y += size * 1.25;
  lines.forEach((l, i) => ctx.fillText(l, tx, y + i * size * 1.18));
}

function fonts() {
  const css = getComputedStyle(document.documentElement);
  return {
    family: getComputedStyle(document.body).fontFamily,
    bold: css.getPropertyValue('--font-name').trim() || 'sans-serif',
  };
}

function ExampleCard({ ex, ready, onUse }: { ex: (typeof EXAMPLES)[number]; ready: boolean; onUse: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const { family, bold } = fonts();
    draw(ref.current, { ...ex, format: 'square', zoom: 1, dx: 0, dy: 0 }, sampleAvatar(ex.avatar), family, bold);
  }, [ex, ready]);
  return (
    <li className="sg-example">
      <button type="button" onClick={onUse} aria-label={`Edit the example: ${ex.caption}`}>
        <canvas ref={ref} role="img" aria-label={`Speaker graphic for ${ex.name}`} />
      </button>
      <span className="sg-example__caption">{ex.caption}</span>
    </li>
  );
}

export default function SpeakerGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const first = EXAMPLES[1];
  const [state, setState] = useState<State>({
    name: first.name,
    role: first.role,
    session: first.session,
    when: first.when,
    room: first.room,
    template: 'raspberry',
    format: 'square',
    zoom: 1,
    dx: 0,
    dy: 0,
  });
  const [avatarColors, setAvatarColors] = useState<[string, string, string]>(first.avatar);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [fontsReady, setFontsReady] = useState(false);
  const drag = useRef<{ x: number; y: number; dx: number; dy: number } | null>(null);

  useEffect(() => {
    Promise.all([document.fonts.load('200 40px "Helvetica Now Display"'), document.fonts.load('700 40px "Inter Tight Variable"')])
      .catch(() => {})
      .finally(() => document.fonts.ready.then(() => setFontsReady(true)));
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const { family, bold } = fonts();
    draw(canvasRef.current, state, photo ?? sampleAvatar(avatarColors), family, bold);
  }, [state, photo, avatarColors, fontsReady]);

  const set = <K extends keyof State>(k: K, v: State[K]) => setState((s) => ({ ...s, [k]: v }));

  const useExample = (ex: (typeof EXAMPLES)[number]) => {
    setState((s) => ({ ...s, name: ex.name, role: ex.role, session: ex.session, when: ex.when, room: ex.room, template: ex.template, zoom: 1, dx: 0, dy: 0 }));
    setAvatarColors(ex.avatar);
    setPhoto(null);
    document.getElementById('sg-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onFile = (file?: File) => {
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      setPhoto(img);
      setState((s) => ({ ...s, zoom: 1, dx: 0, dy: 0 }));
    };
    img.src = URL.createObjectURL(file);
  };

  const download = () => {
    canvasRef.current?.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `speaker-${state.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}-${state.format}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, 'image/png');
  };

  // Drag on the preview to reposition the photo.
  const onPointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, dx: state.dx, dy: state.dy };
  };
  const onPointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!drag.current) return;
    const k = 4 / e.currentTarget.getBoundingClientRect().width;
    const start = drag.current;
    setState((s) => ({ ...s, dx: start.dx + (e.clientX - start.x) * k, dy: start.dy + (e.clientY - start.y) * k }));
  };

  return (
    <LabShell slug="speaker-graphic">
      <section className="sg-story" aria-labelledby="sg-story-h">
        <div className="sg-story__text">
          <h2 id="sg-story-h" className="aside-h">
            How it came together
          </h2>
          <p>
            The request was one Canva template speakers could use to promote their sessions. I could see where that would lead: most speakers
            don’t have Canva accounts, and plenty would either ask me to make their graphic for them or not share at all. So I built something that
            works the first time, for everyone.
          </p>
          <ul>
            <li>
              I loaded the full program agenda, so every graphic carries the correct session title, speaker name, and the title each speaker
              prefers.
            </li>
            <li>
              I fine-tuned the dynamic layout with Claude over several rounds of specific feedback and QA, until short and long names and session
              titles all stayed inside the margins, aligned and sized correctly, with font sizes and line breaks adjusting automatically.
            </li>
            <li>
              I shared it directly with speakers through a simple page. Two clicks, and they were downloading a custom graphic ready to post.
            </li>
          </ul>
          <p>
            About 100 speakers used it, and it significantly boosted the buzz the event received on LinkedIn. The takeaway I carry forward: the
            fewer clicks something takes, the more people use it, so making adoption easy is worth prioritizing.
          </p>
        </div>
        <aside className="sg-story__live">
          <p className="sg-story__label">The real tool</p>
          <p className="muted">Built in-house for a conference. It’s still live for that event’s speakers.</p>
          <a href={LIVE_TOOL} target="_blank" rel="noopener noreferrer" className="btn btn--accent">
            Open the live tool <span className="arrow">↗</span>
          </a>
          <p className="muted sg-story__fine">Below is a rebuild with placeholder speakers you can try.</p>
        </aside>
      </section>

      <section aria-labelledby="sg-examples-h" className="sg-examples-wrap">
        <h2 id="sg-examples-h" className="aside-h">
          Same layout, very different amounts of text
        </h2>
        <ul className="sg-examples">
          {EXAMPLES.map((ex) => (
            <ExampleCard key={ex.name} ex={ex} ready={fontsReady} onUse={() => useExample(ex)} />
          ))}
        </ul>
        <p className="muted sg-examples__hint">Click an example to load it into the editor.</p>
      </section>

      <div className="tool" id="sg-editor">
        <form className="tool__controls" onSubmit={(e) => e.preventDefault()}>
          <label className="dropzone">
            <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} />
            <span>{photo ? 'Replace headshot' : 'Upload a headshot'}</span>
            <small>Stays in your browser. Drag the preview to reposition.</small>
          </label>
          <label className="field">
            Speaker name
            <input value={state.name} onChange={(e) => set('name', e.target.value)} />
          </label>
          <label className="field">
            Title & organization
            <input value={state.role} onChange={(e) => set('role', e.target.value)} />
          </label>
          <label className="field">
            Session title
            <textarea rows={3} style={{ fontSize: 15 }} value={state.session} onChange={(e) => set('session', e.target.value)} />
          </label>
          <div className="tool__row">
            <label className="field">
              Date & time
              <input value={state.when} onChange={(e) => set('when', e.target.value)} />
            </label>
            <label className="field">
              Room
              <input value={state.room} onChange={(e) => set('room', e.target.value)} />
            </label>
          </div>
          <fieldset className="seg">
            <legend>Template</legend>
            {(Object.keys(TEMPLATES) as Template[]).map((t) => (
              <label key={t}>
                <input type="radio" name="template" checked={state.template === t} onChange={() => set('template', t)} />
                <span>
                  <i style={{ background: TEMPLATES[t].bg }} /> {TEMPLATES[t].label}
                </span>
              </label>
            ))}
          </fieldset>
          <fieldset className="seg">
            <legend>Format</legend>
            {(Object.keys(FORMATS) as Format[]).map((f) => (
              <label key={f}>
                <input type="radio" name="format" checked={state.format === f} onChange={() => set('format', f)} />
                <span>{FORMATS[f].label}</span>
              </label>
            ))}
          </fieldset>
          <label className="field">
            Photo zoom
            <input type="range" min={1} max={2.5} step={0.01} value={state.zoom} onChange={(e) => set('zoom', +e.target.value)} />
          </label>
        </form>
        <div className="tool__preview">
          <canvas
            ref={canvasRef}
            className="tool__canvas"
            aria-label={`Preview: speaker graphic for ${state.name}`}
            role="img"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={() => (drag.current = null)}
            onPointerCancel={() => (drag.current = null)}
          />
          <div className="tool__actions">
            <button type="button" className="btn btn--accent" onClick={download}>
              Download PNG <span className="arrow">↓</span>
            </button>
            <span className="muted">Type a longer name or session: the text resizes to fit.</span>
          </div>
        </div>
      </div>
    </LabShell>
  );
}
