#!/usr/bin/env node
/**
 * import-media: copy chosen files from local Google Drive sync folders into
 * public/media, optimized for the web, and write src/content/media.generated.json.
 *
 *   npm run import-media            import everything in media.config.json
 *   npm run import-media -- --only hnoc-1,hnoc-2
 *   npm run import-media -- --force re-process even if outputs are fresh
 *   npm run import-media -- --dry   show what would happen
 *
 * Paths in media.config.json may start with a root alias like "drive:" or
 * "local:". Aliases resolve from media.config.json "roots", where values can
 * reference environment variables (${DRIVE_ROOT}). Put machine-specific
 * values in .env.local, which is git-ignored.
 *
 * Images  -> AVIF + WebP at several widths, plus a tiny blur placeholder.
 * HEIC    -> decoded first, then treated like any image.
 * Video   -> poster frame (WebP) and, if "loop" is set, a short muted MP4 loop.
 *            Full-length video should be hosted externally ("full": url).
 * PDF/HTML-> copied as-is (HTML is shown in sandboxed iframes).
 */
import { readFile, writeFile, mkdir, stat, copyFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public', 'media');
const MANIFEST = path.join(ROOT, 'src', 'content', 'media.generated.json');
const CONFIG = path.join(ROOT, 'media.config.json');

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.tif', '.tiff', '.avif']);
const HEIC_EXT = new Set(['.heic', '.heif']);
const VIDEO_EXT = new Set(['.mp4', '.mov', '.m4v', '.webm']);
const WIDTHS = [480, 960, 1600];

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const only = (() => {
  const i = args.indexOf('--only');
  return i >= 0 ? new Set(args[i + 1].split(',')) : null;
})();
const FORCE = flag('force');
const DRY = flag('dry');

async function loadEnvLocal() {
  const file = path.join(ROOT, '.env.local');
  if (!existsSync(file)) return;
  for (const line of (await readFile(file, 'utf8')).split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

function expandEnv(value) {
  return value.replace(/\$\{([A-Z0-9_]+)\}/g, (_, name) => {
    if (!process.env[name]) throw new Error(`Environment variable ${name} is not set (add it to .env.local)`);
    return process.env[name];
  });
}

function resolveSource(src, roots) {
  const m = src.match(/^([a-z]+):(.*)$/);
  if (m && roots[m[1]]) return path.join(expandEnv(roots[m[1]]), m[2]);
  return path.isAbsolute(src) ? src : path.join(ROOT, src);
}

const slug = (s) =>
  s.toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function isFresh(source, outputs) {
  if (FORCE) return false;
  const srcTime = (await stat(source)).mtimeMs;
  for (const out of outputs) {
    if (!existsSync(out) || (await stat(out)).mtimeMs < srcTime) return false;
  }
  return true;
}

function ffmpegPath() {
  if (process.env.FFMPEG_PATH) return Promise.resolve(process.env.FFMPEG_PATH);
  return import('ffmpeg-static').then((m) => m.default || 'ffmpeg').catch(() => 'ffmpeg');
}

function run(cmd, cmdArgs) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, cmdArgs, { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => (err += d));
    p.on('error', reject);
    p.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}\n${err.slice(-800)}`))));
  });
}

async function probeVideo(ffmpeg, file) {
  // ffmpeg prints stream info to stderr; parse width/height from it.
  return new Promise((resolve) => {
    const p = spawn(ffmpeg, ['-i', file], { stdio: ['ignore', 'ignore', 'pipe'] });
    let err = '';
    p.stderr.on('data', (d) => (err += d));
    p.on('close', () => {
      const m = err.match(/Video:.*?(\d{2,5})x(\d{2,5})/);
      resolve(m ? { width: +m[1], height: +m[2] } : { width: 1920, height: 1080 });
    });
  });
}

async function processImage(sharp, item, source) {
  let input = source;
  const ext = path.extname(source).toLowerCase();
  if (HEIC_EXT.has(ext)) {
    const convert = (await import('heic-convert')).default;
    input = Buffer.from(await convert({ buffer: await readFile(source), format: 'JPEG', quality: 0.92 }));
  }
  const base = sharp(input, { animated: false }).rotate();
  const meta = await base.metadata();
  const fullW = meta.autoOrient?.width ?? meta.width;
  const fullH = meta.autoOrient?.height ?? meta.height;
  const widths = WIDTHS.filter((w) => w < fullW).concat(Math.min(fullW, WIDTHS.at(-1)));
  const unique = [...new Set(widths)].sort((a, b) => a - b);

  const outputs = unique.flatMap((w) => ['avif', 'webp'].map((f) => path.join(OUT_DIR, `${item.id}-${w}.${f}`)));
  if (!(await isFresh(source, outputs)) && !DRY) {
    for (const w of unique) {
      const resized = base.clone().resize({ width: w, withoutEnlargement: true });
      await resized.clone().avif({ quality: 55, effort: 4 }).toFile(path.join(OUT_DIR, `${item.id}-${w}.avif`));
      await resized.clone().webp({ quality: 80 }).toFile(path.join(OUT_DIR, `${item.id}-${w}.webp`));
    }
  }
  const blurBuf = DRY ? null : await base.clone().resize(24).blur().webp({ quality: 40 }).toBuffer();
  const set = (f) => unique.map((w) => `/media/${item.id}-${w}.${f} ${w}w`).join(', ');
  const mid = unique.find((w) => w >= 960) ?? unique.at(-1);
  return {
    type: 'image',
    alt: item.alt ?? '',
    width: fullW,
    height: fullH,
    src: `/media/${item.id}-${mid}.webp`,
    srcset: { avif: set('avif'), webp: set('webp') },
    ...(blurBuf ? { blur: `data:image/webp;base64,${blurBuf.toString('base64')}` } : {}),
  };
}

async function processVideo(sharp, item, source) {
  const ffmpeg = await ffmpegPath();
  const posterJpg = path.join(OUT_DIR, `${item.id}-poster.jpg`);
  const posterWebp = path.join(OUT_DIR, `${item.id}-poster.webp`);
  const loopOut = path.join(OUT_DIR, `${item.id}-loop.mp4`);
  const outputs = [posterWebp, ...(item.loop ? [loopOut] : [])];
  const { width, height } = await probeVideo(ffmpeg, source);

  if (!(await isFresh(source, outputs)) && !DRY) {
    const at = String(item.posterAt ?? 1);
    await run(ffmpeg, ['-y', '-ss', at, '-i', source, '-frames:v', '1', '-q:v', '2', posterJpg]);
    await sharp(posterJpg).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(posterWebp);
    if (item.loop) {
      const { start = 0, duration = 8 } = typeof item.loop === 'object' ? item.loop : {};
      await run(ffmpeg, [
        '-y', '-ss', String(start), '-t', String(duration), '-i', source,
        '-an', '-vf', "scale='min(1280,iw)':-2", '-c:v', 'libx264', '-preset', 'slow',
        '-crf', '28', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', loopOut,
      ]);
    }
  }
  return {
    type: 'video',
    alt: item.alt ?? '',
    width,
    height,
    poster: `/media/${item.id}-poster.webp`,
    ...(item.loop ? { loop: `/media/${item.id}-loop.mp4` } : {}),
    ...(item.full ? { full: item.full } : {}),
  };
}

async function processCopy(item, source, type) {
  const name = `${item.id}${path.extname(source).toLowerCase()}`;
  const out = path.join(OUT_DIR, type === 'html' ? 'html' : '', name);
  if (!(await isFresh(source, [out])) && !DRY) {
    await mkdir(path.dirname(out), { recursive: true });
    await copyFile(source, out);
  }
  return { type, alt: item.alt ?? '', src: `/media/${type === 'html' ? 'html/' : ''}${name}` };
}

// Expand folder entries: { "id": "smo", "folder": "drive:...", "match": "\\.png$", "limit": 6 }
async function expandItems(items, roots) {
  const out = [];
  for (const item of items) {
    if (!item.folder) {
      out.push(item);
      continue;
    }
    const dir = resolveSource(item.folder, roots);
    const re = item.match ? new RegExp(item.match, 'i') : null;
    const files = (await readdir(dir)).filter((f) => !f.startsWith('.') && (!re || re.test(f))).sort();
    files.slice(0, item.limit ?? Infinity).forEach((f, i) => {
      out.push({ ...item, folder: undefined, id: `${item.id}-${i + 1}`, src: path.join(dir, f), alt: item.alt ? `${item.alt} (${i + 1})` : slug(f) });
    });
  }
  return out;
}

async function main() {
  await loadEnvLocal();
  if (!existsSync(CONFIG)) {
    console.error('No media.config.json found. Copy media.config.example.json to media.config.json and edit it.');
    process.exit(1);
  }
  const config = JSON.parse(await readFile(CONFIG, 'utf8'));
  const roots = config.roots ?? {};
  const manifest = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, 'utf8')) : {};
  const sharp = (await import('sharp')).default;
  await mkdir(OUT_DIR, { recursive: true });

  // Filter before expanding so folder entries for roots you haven't configured are skipped.
  const chosen = (config.items ?? []).filter((i) => !only || only.has(i.id) || [...only].some((o) => o.startsWith(`${i.id}-`)));
  const items = (await expandItems(chosen, roots)).filter((i) => !only || only.has(i.id) || only.has(i.id.replace(/-\d+$/, '')));
  let ok = 0;
  const failures = [];

  for (const item of items) {
    let source;
    try {
      source = resolveSource(item.src, roots);
      if (!existsSync(source)) throw new Error(`not found: ${source}`);
      const ext = path.extname(source).toLowerCase();
      let entry;
      if (IMAGE_EXT.has(ext) || HEIC_EXT.has(ext)) entry = await processImage(sharp, item, source);
      else if (VIDEO_EXT.has(ext)) entry = await processVideo(sharp, item, source);
      else if (ext === '.pdf') entry = await processCopy(item, source, 'pdf');
      else if (ext === '.html' || ext === '.htm') entry = await processCopy(item, source, 'html');
      else throw new Error(`unsupported file type ${ext}`);
      if (item.posterFor) entry.poster = item.posterFor;
      manifest[item.id] = entry;
      ok++;
      console.log(`${DRY ? '[dry] ' : ''}✓ ${item.id}  ←  ${path.basename(source)}`);
    } catch (err) {
      failures.push(item.id);
      console.warn(`✗ ${item.id}: ${err.message}`);
    }
  }

  if (!DRY) {
    const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
    await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');
  }
  console.log(`\n${ok} imported, ${failures.length} failed${failures.length ? `: ${failures.join(', ')}` : ''}.`);
  if (failures.length) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
