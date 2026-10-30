/**
 * Find the largest font size (between min and max) at which `text` wraps into
 * at most `maxLines` lines no wider than `maxWidth`. Returns the size and lines.
 */
export function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  opts: { maxWidth: number; maxLines: number; max: number; min: number; weight: number | string; family: string },
): { size: number; lines: string[] } {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return { size: opts.max, lines: [] };
  for (let size = opts.max; size >= opts.min; size -= 1) {
    ctx.font = `${opts.weight} ${size}px ${opts.family}`;
    const lines = wrap(ctx, words, opts.maxWidth);
    if (lines && lines.length <= opts.maxLines) return { size, lines };
  }
  ctx.font = `${opts.weight} ${opts.min}px ${opts.family}`;
  const lines = wrap(ctx, words, opts.maxWidth, true) ?? [text];
  return { size: opts.min, lines: lines.slice(0, opts.maxLines) };
}

function wrap(ctx: CanvasRenderingContext2D, words: string[], maxWidth: number, force = false): string[] | null {
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width <= maxWidth) {
      line = test;
      continue;
    }
    if (!line || ctx.measureText(word).width > maxWidth) {
      if (!force) return null; // a single word is too wide at this size
    }
    if (line) lines.push(line);
    line = word;
  }
  if (line) lines.push(line);
  return lines;
}
