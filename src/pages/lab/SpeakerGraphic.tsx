import { PointerEvent, useEffect, useRef, useState } from 'react';
import LabShell from '../../components/LabShell';
import { fitText } from '../../lib/fitText';

type Format = 'square' | 'landscape';
type Template = 'raspberry' | 'noir' | 'paper';

const FORMATS: Record<Format, { w: number; h: number; label: string }> = {
  square: { w: 1080, h: 1080, label: 'Instagram · 1080×1080' },
  landscape: { w: 1200, h: 627, label: 'LinkedIn · 1200×627' },
};

const TEMPLATES: Record<Template, { bg: string; ink: string; soft: string; accent: string; ring: string; label: string }> = {
  raspberry: { bg: '#a3164f', ink: '#ffffff', soft: 'rgba(255,255,255,0.78)', accent: '#ffffff', ring: 'rgba(255,255,255,0.9)', label: 'Raspberry' },
  noir: { bg: '#0b0b0c', ink: '#f4f1f3', soft: 'rgba(244,241,243,0.7)', accent: '#e0457f', ring: '#e0457f', label: 'Noir' },
  paper: { bg: '#ffffff', ink: '#0b0b0c', soft: '#55525a', accent: '#a3164f', ring: '#a3164f', label: 'Paper' },
};

// Fictional sample speaker. No real person's data appears in any demo.
const SAMPLE = {
  event: 'Gulf Coast Health Summit 2027',
  name: 'Dr. Jordan Rivera',
  role: 'Director of Community Programs, Bayou Health Partners',
  session: 'Scaling Community Care with the Data You Already Have',
  when: 'Thu, Apr 15 · 10:30 AM',
};

/** A neutral silhouette so the demo works before anyone uploads a photo. */
function sampleAvatar(): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = c.height = 800;
  const g = c.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, 800, 800);
  grad.addColorStop(0, '#d9d3d7');
  grad.addColorStop(1, '#9e96a0');
  g.fillStyle = grad;
  g.fillRect(0, 0, 800, 800);
  g.fillStyle = '#efeaed';
  g.beginPath();
  g.arc(400, 320, 150, 0, Math.PI * 2);
  g.fill();
  g.beginPath();
  g.ellipse(400, 820, 300, 280, 0, Math.PI, 0);
  g.fill();
  return c;
}

type State = typeof SAMPLE & { format: Format; template: Template; zoom: number; dx: number; dy: number };

function draw(canvas: HTMLCanvasElement, s: State, photo: CanvasImageSource & { width: number; height: number }, family: string) {
  const { w: W, h: H } = FORMATS[s.format];
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const t = TEMPLATES[s.template];
  const square = s.format === 'square';
  const pad = square ? 84 : 64;

  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, W, H);

  // Paper template echoes the vertical-name motif: event name runs up the left edge.
  let left = pad;
  if (s.template === 'paper') {
    ctx.fillStyle = t.accent;
    ctx.fillRect(0, 0, square ? 96 : 80, H);
    ctx.save();
    ctx.translate(square ? 60 : 50, H - pad);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#ffffff';
    ctx.font = `400 ${square ? 24 : 20}px ${family}`;
    ctx.letterSpacing = '6px';
    ctx.fillText(s.event.toUpperCase(), 0, 0);
    ctx.restore();
    left = (square ? 96 : 80) + pad * 0.8;
  }

  // Photo in a circle, with a thin ring.
  const r = square ? W * 0.2 : H * 0.33;
  const cx = square ? W - pad - r : left + r;
  const cy = square ? pad + r : H / 2;
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
  ctx.arc(cx, cy, r + 16, 0, Math.PI * 2);
  ctx.stroke();

  // Text column.
  const tx = square ? left : cx + r + 56;
  const maxW = square ? W - tx - pad : W - tx - pad;
  ctx.textBaseline = 'alphabetic';
  ctx.letterSpacing = '0px';

  if (s.template !== 'paper') {
    ctx.fillStyle = t.soft;
    ctx.font = `400 ${square ? 22 : 18}px ${family}`;
    ctx.letterSpacing = '5px';
    const ev = fitText(ctx, s.event.toUpperCase(), { maxWidth: square ? W - 2 * pad - 2 * r - 40 : maxW, maxLines: 2, max: square ? 22 : 18, min: 14, weight: 400, family });
    ev.lines.forEach((l, i) => ctx.fillText(l, square ? pad : tx, (square ? pad + 24 : pad + 18) + i * ev.size * 1.5));
    ctx.letterSpacing = '0px';
  }

  let y = square ? cy + r + 96 : pad + 110;
  ctx.fillStyle = t.accent;
  ctx.font = `500 ${square ? 20 : 16}px ${family}`;
  ctx.letterSpacing = '4px';
  ctx.fillText('SPEAKER', tx, y);
  ctx.letterSpacing = '0px';

  const name = fitText(ctx, s.name, { maxWidth: maxW, maxLines: 2, max: square ? 92 : 64, min: square ? 44 : 32, weight: 200, family });
  ctx.fillStyle = t.ink;
  ctx.font = `200 ${name.size}px ${family}`;
  y += name.size * 1.05;
  name.lines.forEach((l, i) => ctx.fillText(l, tx, y + i * name.size * 1.02));
  y += (name.lines.length - 1) * name.size * 1.02;

  const role = fitText(ctx, s.role, { maxWidth: maxW, maxLines: 2, max: square ? 28 : 22, min: 16, weight: 300, family });
  ctx.fillStyle = t.soft;
  ctx.font = `300 ${role.size}px ${family}`;
  y += role.size * 1.7;
  role.lines.forEach((l, i) => ctx.fillText(l, tx, y + i * role.size * 1.3));
  y += (role.lines.length - 1) * role.size * 1.3 + (square ? 40 : 26);

  ctx.strokeStyle = t.accent;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(tx, y);
  ctx.lineTo(tx + 64, y);
  ctx.stroke();

  const bottom = H - pad;
  const sessionRoom = bottom - (square ? 54 : 44) - (y + 20);
  const session = fitText(ctx, s.session, { maxWidth: maxW, maxLines: 3, max: square ? 46 : 32, min: 18, weight: 300, family });
  // Shrink further if three lines would collide with the date line.
  let size = session.size;
  let lines = session.lines;
  while (lines.length * size * 1.18 > sessionRoom && size > 16) {
    const next = fitText(ctx, s.session, { maxWidth: maxW, maxLines: 3, max: size - 2, min: 16, weight: 300, family });
    size = next.size;
    lines = next.lines;
  }
  ctx.fillStyle = t.ink;
  ctx.font = `300 ${size}px ${family}`;
  y += size * 1.3;
  lines.forEach((l, i) => ctx.fillText(l, tx, y + i * size * 1.18));

  ctx.fillStyle = t.accent;
  ctx.font = `400 ${square ? 24 : 18}px ${family}`;
  ctx.fillText(s.when, tx, bottom);
}

export default function SpeakerGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<State>({ ...SAMPLE, format: 'square', template: 'raspberry', zoom: 1, dx: 0, dy: 0 });
  const [photo, setPhoto] = useState<(CanvasImageSource & { width: number; height: number }) | null>(null);
  const [fontsReady, setFontsReady] = useState(false);
  const drag = useRef<{ x: number; y: number; dx: number; dy: number } | null>(null);
  const avatar = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    document.fonts.load('200 40px "Inter Tight Variable"').finally(() => document.fonts.ready.then(() => setFontsReady(true)));
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    avatar.current ??= sampleAvatar();
    const family = getComputedStyle(document.body).fontFamily;
    draw(canvasRef.current, state, photo ?? avatar.current, family);
  }, [state, photo, fontsReady]);

  const set = <K extends keyof State>(k: K, v: State[K]) => setState((s) => ({ ...s, [k]: v }));

  const onFile = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setPhoto(img);
      setState((s) => ({ ...s, zoom: 1, dx: 0, dy: 0 }));
    };
    img.src = url;
  };

  const download = () => {
    canvasRef.current?.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `speaker-${state.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${state.format}.png`;
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
    const rect = e.currentTarget.getBoundingClientRect();
    const k = 4 / rect.width;
    setState((s) => ({ ...s, dx: drag.current!.dx + (e.clientX - drag.current!.x) * k, dy: drag.current!.dy + (e.clientY - drag.current!.y) * k }));
  };

  return (
    <LabShell slug="speaker-graphic">
      <div className="tool">
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
            <textarea rows={2} style={{ fontFamily: 'inherit', fontSize: 15 }} value={state.session} onChange={(e) => set('session', e.target.value)} />
          </label>
          <div className="tool__row">
            <label className="field">
              Date & time
              <input value={state.when} onChange={(e) => set('when', e.target.value)} />
            </label>
            <label className="field">
              Event
              <input value={state.event} onChange={(e) => set('event', e.target.value)} />
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
            <span className="muted">Try a very long name or session title: the type resizes to fit.</span>
          </div>
        </div>
      </div>
    </LabShell>
  );
}
