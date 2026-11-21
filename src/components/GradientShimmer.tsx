import { createElement, useEffect, useMemo, useRef, type CSSProperties, type ElementType } from 'react';

/**
 * GradientShimmer: sweeps a multi-stop gradient highlight across plain text,
 * like light catching it. Ported from the Web Deva site (used on its Hero 2
 * with the "deva" preset). Driven by the Web Animations API; pauses while
 * scrolling, offscreen or in a hidden tab; holds still under reduced motion.
 * `children` must be a plain string.
 */

type Stop = { color: string; position: number };

export const gradientPresets: Record<string, Stop[]> = {
  // Web Deva brand sweep: olive, burnt orange, mulberry, violet
  deva: [
    { color: '#949000', position: 0 },
    { color: '#C0561E', position: 0.3 },
    { color: '#8B2E5D', position: 0.62 },
    { color: '#7C64C0', position: 1 },
  ],
};

const easingPresets = {
  smooth: 'cubic-bezier(0.45, 0, 0.55, 1)',
  gentle: 'cubic-bezier(0.76, 0, 0.24, 1)',
  snappy: 'cubic-bezier(0.3, 0, 0.2, 1)',
};

const BAND_CORE_RATIO = 0.44;
const MAX_SPREAD_PX = 48;
const SPREAD_MID_RATIO = 0.72;
const BASE_FONT_PX = 14;
const SCROLL_IDLE_MS = 120;

function buildBandGradient(stops: Stop[], angle: number) {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const first = sorted[0]?.color ?? 'white';
  const last = sorted[sorted.length - 1]?.color ?? 'white';
  const core = sorted
    .map((s) => `${s.color} calc(50% + var(--gs-spread-mid) * ${((s.position - 0.5) * 2 * BAND_CORE_RATIO).toFixed(4)})`)
    .join(', ');
  return [
    `linear-gradient(${angle}deg`,
    `var(--gs-base) calc(50% - var(--gs-spread))`,
    `color-mix(in oklab, var(--gs-base) 42%, ${first}) calc(50% - var(--gs-spread-mid))`,
    core,
    `color-mix(in oklab, var(--gs-base) 42%, ${last}) calc(50% + var(--gs-spread-mid))`,
    `var(--gs-base) calc(50% + var(--gs-spread)))`,
  ].join(', ');
}

function observeActive(el: Element, onChange: (active: boolean) => void) {
  let inView = true;
  let pageVisible = !document.hidden;
  let notScrolling = true;
  const compute = () => onChange(inView && pageVisible && notScrolling);
  const io = new IntersectionObserver(
    (entries) => {
      const e = entries[entries.length - 1];
      if (e) inView = e.isIntersecting;
      compute();
    },
    { rootMargin: '160px' },
  );
  io.observe(el);
  const onVis = () => {
    pageVisible = !document.hidden;
    compute();
  };
  document.addEventListener('visibilitychange', onVis);
  let t: ReturnType<typeof setTimeout>;
  const onScroll = () => {
    notScrolling = false;
    compute();
    clearTimeout(t);
    t = setTimeout(() => {
      notScrolling = true;
      compute();
    }, SCROLL_IDLE_MS);
  };
  window.addEventListener('scroll', onScroll, { passive: true, capture: true });
  return () => {
    io.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    window.removeEventListener('scroll', onScroll, { capture: true });
    clearTimeout(t);
  };
}

export default function GradientShimmer({
  children,
  gradient = 'deva',
  easing = 'smooth',
  duration = 5.5,
  spread = 2.2,
  angle = 105,
  pauseBetween = 1400,
  baseColor = 'currentColor',
  as = 'span',
  className,
  id,
}: {
  children: string;
  gradient?: keyof typeof gradientPresets | Stop[];
  easing?: keyof typeof easingPresets;
  duration?: number;
  spread?: number;
  angle?: number;
  pauseBetween?: number;
  baseColor?: string;
  as?: ElementType;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const stops = typeof gradient === 'string' ? gradientPresets[gradient] ?? gradientPresets.deva : gradient;
  const backgroundImage = useMemo(() => buildBandGradient(stops, angle), [stops, angle]);
  const initialSpread = Math.min(children.length * spread, MAX_SPREAD_PX);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!CSS.supports('background-clip', 'text') && !CSS.supports('-webkit-background-clip', 'text')) {
      el.style.removeProperty('background-image');
      el.style.removeProperty('-webkit-text-fill-color');
      return;
    }
    const measure = () => {
      const w = el.getBoundingClientRect().width || 96;
      const scale = (parseFloat(getComputedStyle(el).fontSize) || BASE_FONT_PX) / BASE_FONT_PX;
      const s = Math.min(children.length * spread * scale, MAX_SPREAD_PX * scale);
      const layer = Math.max(1, w + s * 2);
      el.style.setProperty('--gs-spread', `${s}px`);
      el.style.setProperty('--gs-spread-mid', `${s * SPREAD_MID_RATIO}px`);
      el.style.backgroundSize = `${layer}px 100%`;
      return { start: -s - layer / 2, end: w + s - layer / 2 };
    };
    const first = measure();
    // Park the band off to the left so the text reads in its base colour at rest
    el.style.backgroundPosition = `${first.start}px center`;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof el.animate !== 'function') return;

    let anim: Animation | null = null;
    let timer: ReturnType<typeof setTimeout>;
    let active = true;
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      const { start, end } = measure();
      const next = el.animate([{ backgroundPosition: `${start}px center` }, { backgroundPosition: `${end}px center` }], {
        duration: duration * 1000,
        easing: easingPresets[easing],
        fill: 'forwards',
      });
      if (!active) next.pause();
      anim?.cancel();
      anim = next;
      next.onfinish = () => {
        timer = setTimeout(run, pauseBetween);
      };
    };
    const stop = observeActive(el, (a) => {
      active = a;
      if (anim) {
        if (a) anim.play();
        else anim.pause();
      }
    });
    run();
    return () => {
      cancelled = true;
      anim?.cancel();
      clearTimeout(timer);
      stop();
    };
  }, [children, spread, duration, easing, pauseBetween]);

  const style = {
    position: 'relative',
    display: 'inline-block',
    backgroundImage,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundColor: 'var(--gs-base)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '--gs-base': baseColor,
    '--gs-spread': `${initialSpread}px`,
    '--gs-spread-mid': `${initialSpread * SPREAD_MID_RATIO}px`,
  } as CSSProperties;

  return createElement(as, { ref, className, id, style }, children);
}
