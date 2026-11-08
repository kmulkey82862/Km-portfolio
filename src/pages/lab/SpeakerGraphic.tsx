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

const EXAMPLES: (Speaker & { template: Template; avatar: [string, string]; caption: string })[] = [
  {
    name: 'Jane Doe',
    role: 'Director, Sample Organization',
    session: 'Opening Remarks',
    when: 'Thu, Apr 15 · 9:00 AM',
    room: 'Ballroom A',
    template: 'raspberry',
    avatar: ['#c9d6df', '#8fa6b6'],
    caption: 'Short name, short session',
  },
  {
    name: 'Dr. John Doe',
    role: 'Chief Program Officer, Example Health Network',
    session: 'Building Partnerships That Last: Lessons From the Field',
    when: 'Thu, Apr 15 · 1:30 PM',
    room: 'Salon 2',
    template: 'noir',
    avatar: ['#f3d2dc', '#d58aa3'],
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
    avatar: ['#e8e2c4', '#b5b23a'],
    caption: 'Long name, title, and session',
  },
];

/** A neutral silhouette so the demo works before anyone uploads a photo. */
function sampleAvatar([from, to]: [string, string]): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = c.height = 800;
  const g = c.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, 800, 800);
  grad.addColorStop(0, from);
  grad.addColorStop(1, to);
  g.fillStyle = grad;
  g.fillRect(0, 0, 800, 800);
  g.fillStyle = 'rgba(255,255,255,0.85)';
  g.beginPath();
  g.arc(400, 320, 150, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.ellipse(400, 820, 300, 280, 0, Math.PI, 0);
  g.fill();
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
  const [avatarColors, setAvatarColors] = useState<[string, string]>(first.avatar);
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
