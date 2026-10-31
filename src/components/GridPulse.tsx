import { CSSProperties, useEffect, useRef } from 'react';

/*
  GridPulse: a fine grid that takes colour where the pointer passes and lets it
  go a moment later, with a few cells lighting on their own so the field is
  never dead. Ported from the Web Deva site, with the spectrum narrowed to a
  raspberry-to-amber sunset band so it stays on brand here.

  Decoration only: hidden from assistive tech, transparent to the pointer,
  drawn on one canvas that sleeps when nothing is lit, paused off screen, and
  still for readers who ask for reduced motion. Text marked `data-grid-avoid`
  dims the cells around it so copy stays readable.
*/

const HUE_TOP = 334; // raspberry
const HUE_SPAN = 40; // ...down to coral
const TINTS = [92, 89, 85, 81];
const TINTS_DARK = [30, 25, 21, 17];
const FAINT = 0.12;
const FADE = 2.2;
const PAD = 6;
const FADE_IN = 160;
const FADE_OUT = 750;

const easeOut = (t: number) => 1 - (1 - t) ** 2;
const easeIn = (t: number) => t * t;

type Cell = { col: number; row: number; colour: string; dim: number; born: number; until: number };

export default function GridPulse({
  cell = 28,
  reach = 2.6,
  ambient = 2,
  maxLit = 180,
  avoid = '[data-grid-avoid]',
  style,
}: {
  cell?: number;
  reach?: number;
  ambient?: number;
  maxLit?: number;
  avoid?: string;
  style?: CSSProperties;
}) {
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = box.current;
    const paper = canvas.current;
    const ctx = paper?.getContext('2d');
    if (!el || !paper || !ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cols = 1, rows = 1, width = 0, height = 0;
    let clear: DOMRect[] = [];
    let tints = TINTS;
    const cells = new Map<string, Cell>();

    const readTheme = () => {
      const set = document.documentElement.dataset.theme;
      const dark = set ? set === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      tints = dark ? TINTS_DARK : TINTS;
    };

    const measureText = () => {
      const bounds = el.getBoundingClientRect();
      clear = [...document.querySelectorAll(avoid)].flatMap((node) => {
        const range = document.createRange();
        range.selectNodeContents(node);
        const lines = [...range.getClientRects()].filter((r) => r.width > 0 && r.height > 0);
        const boxes = lines.length ? lines : [node.getBoundingClientRect()];
        return boxes.map((r) => new DOMRect(r.left - bounds.left - PAD, r.top - bounds.top - PAD, r.width + PAD * 2, r.height + PAD * 2));
      });
    };

    const measure = () => {
      width = el.clientWidth;
      height = el.clientHeight;
      cols = Math.max(1, Math.ceil(width / cell));
      rows = Math.max(1, Math.ceil(height / cell));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      paper.width = Math.round(width * dpr);
      paper.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      readTheme();
      measureText();
      wake();
    };

    const brightness = (col: number, row: number) => {
      const x = col * cell + cell / 2;
      const y = row * cell + cell / 2;
      let nearest = Infinity;
      for (const r of clear) {
        const dx = Math.max(r.left - x, 0, x - r.right);
        const dy = Math.max(r.top - y, 0, y - r.bottom);
        nearest = Math.min(nearest, Math.hypot(dx, dy));
        if (nearest === 0) break;
      }
      if (nearest === Infinity) return 1;
      return FAINT + (1 - FAINT) * Math.min(1, nearest / (FADE * cell));
    };

    const ink = (row: number) => {
      const t = rows > 1 ? Math.min(1, row / (rows - 1)) : 0;
      const hue = (HUE_TOP + t * HUE_SPAN) % 360;
      const tint = tints[Math.floor(Math.random() * tints.length)];
      return `hsl(${Math.round(hue)} 78% ${tint}%)`;
    };

    let frame = 0;
    const draw = (now: number) => {
      frame = 0;
      ctx.clearRect(0, 0, width, height);
      for (const [key, c] of cells) {
        let alpha: number;
        if (now < c.until) alpha = easeOut(Math.min(1, (now - c.born) / FADE_IN));
        else {
          const t = (now - c.until) / FADE_OUT;
          if (t >= 1) {
            cells.delete(key);
            continue;
          }
          alpha = 1 - easeIn(t);
        }
        ctx.globalAlpha = alpha * c.dim;
        ctx.fillStyle = c.colour;
        ctx.fillRect(c.col * cell + 1, c.row * cell + 1, cell - 1, cell - 1);
      }
      ctx.globalAlpha = 1;
      if (cells.size > 0) frame = requestAnimationFrame(draw);
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const light = (col: number, row: number, hold: number) => {
      if (col < 0 || row < 0 || col >= cols || row >= rows || cells.size >= maxLit) return;
      const key = `${col},${row}`;
      const now = performance.now();
      const lit = cells.get(key);
      if (lit && now < lit.until) return;
      let born = now;
      if (lit) {
        const faded = 1 - easeIn(Math.min(1, (now - lit.until) / FADE_OUT));
        born = now - (1 - Math.sqrt(1 - faded)) * FADE_IN;
      }
      cells.set(key, { col, row, colour: lit?.colour ?? ink(row), dim: brightness(col, row), born, until: now + hold });
      wake();
    };

    let pending = 0;
    let at: { x: number; y: number } | null = null;
    const paint = () => {
      pending = 0;
      if (!at) return;
      const cx = Math.floor(at.x / cell);
      const cy = Math.floor(at.y / cell);
      const span = Math.ceil(reach);
      for (let dy = -span; dy <= span; dy++) {
        for (let dx = -span; dx <= span; dx++) {
          const away = Math.hypot(dx, dy);
          if (away > reach || Math.random() > 1 - away / (reach + 0.6)) continue;
          light(cx + dx, cy + dy, 260 + Math.random() * 900);
        }
      }
    };
    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      at = { x: e.clientX - b.left, y: e.clientY - b.top };
      if (!pending) pending = requestAnimationFrame(paint);
    };

    let visible = true;
    let beat = 0;
    const drift = () => {
      beat = window.setTimeout(drift, 1400 + Math.random() * 1800);
      if (!visible || document.hidden) return;
      for (let i = 0; i < ambient; i++) light(Math.floor(Math.random() * cols), Math.floor(Math.random() * rows), 900 + Math.random() * 1600);
    };
    beat = window.setTimeout(drift, 500);

    const sight = new IntersectionObserver(([entry]) => (visible = entry?.isIntersecting ?? true));
    sight.observe(el);
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    const theme = new MutationObserver(readTheme);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const scheme = window.matchMedia('(prefers-color-scheme: dark)');
    scheme.addEventListener('change', readTheme);
    measure();
    document.fonts?.ready.then(measureText).catch(() => {});
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      sight.disconnect();
      resize.disconnect();
      theme.disconnect();
      scheme.removeEventListener('change', readTheme);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pending);
      clearTimeout(beat);
      window.removeEventListener('pointermove', onMove);
    };
  }, [cell, reach, ambient, maxLit, avoid]);

  return (
    <div ref={box} className="gridpulse" aria-hidden="true" style={{ ['--cell' as string]: `${cell}px`, ...style }}>
      <canvas ref={canvas} />
    </div>
  );
}
