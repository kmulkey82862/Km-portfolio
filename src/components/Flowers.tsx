// Little hand-drawn flowers for the hero. Original SVGs, decorative only.

const RASPBERRY = '#a3164f';
const BLUSH = '#f3c4d2';
const MULBERRY = '#772450';
const OLIVE = '#7f7c1e';
const CHARTREUSE = '#b5b23a';
const ICY = '#b9cbd8';

export function Rose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 150" aria-hidden="true">
      <path d="M60 78 C 58 100, 62 122, 56 148" stroke={OLIVE} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M58 112 C 40 104, 28 108, 22 120 C 38 124, 50 120, 58 112 Z" fill={OLIVE} />
      <path d="M60 98 C 76 88, 92 92, 98 104 C 82 110, 70 106, 60 98 Z" fill={CHARTREUSE} />
      <circle cx="60" cy="48" r="34" fill={RASPBERRY} />
      <path d="M30 44 C 34 22, 58 12, 78 20 C 92 26, 96 44, 90 58" fill="none" stroke={MULBERRY} strokeWidth="3" strokeLinecap="round" />
      <path d="M60 48 m -4 0 a 4 4 0 1 1 8 0 a 9 9 0 1 1 -18 0 a 15 15 0 1 1 30 2 a 21 21 0 1 1 -40 -6" fill="none" stroke={BLUSH} strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

export function Daisy({ className, petal = BLUSH, center = CHARTREUSE }: { className?: string; petal?: string; center?: string }) {
  const petals = Array.from({ length: 9 }, (_, i) => i * 40);
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <g transform="translate(50 50)">
        {petals.map((a) => (
          <ellipse key={a} cx="0" cy="-24" rx="10" ry="20" fill={petal} stroke={MULBERRY} strokeWidth="1.4" transform={`rotate(${a})`} />
        ))}
        <circle r="13" fill={center} stroke={OLIVE} strokeWidth="2" />
        <circle cx="-4" cy="-3" r="2" fill={OLIVE} />
        <circle cx="4" cy="2" r="2" fill={OLIVE} />
        <circle cx="-1" cy="5" r="1.6" fill={OLIVE} />
      </g>
    </svg>
  );
}

export function Tulip({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 140" aria-hidden="true">
      <path d="M40 60 C 42 90, 36 112, 40 138" stroke={OLIVE} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M40 120 C 24 100, 14 96, 8 100 C 14 116, 28 122, 40 120 Z" fill={CHARTREUSE} />
      <path d="M16 28 L 26 44 L 40 22 L 54 44 L 64 28 C 66 50, 58 66, 40 66 C 22 66, 14 50, 16 28 Z" fill={ICY} stroke="#7d93a3" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function Sparkle({ className, color = RASPBERRY }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 2 C 22 14, 26 18, 38 20 C 26 22, 22 26, 20 38 C 18 26, 14 22, 2 20 C 14 18, 18 14, 20 2 Z" fill={color} />
    </svg>
  );
}
