import { DragEvent, useEffect, useMemo, useState } from 'react';
import LabShell from '../../components/LabShell';

type Spec = { id: string; label: string; w: number; h: number };
type Bg = 'transparent' | 'white' | 'black';
type Logo = { id: string; name: string; img: HTMLImageElement; box: { x: number; y: number; w: number; h: number } };

const PRESETS: Spec[] = [
  { id: 'app-tile', label: 'Event app sponsor tile', w: 600, h: 300 },
  { id: 'web-grid', label: 'Website sponsor grid', w: 400, h: 200 },
  { id: 'exhibitor', label: 'Exhibitor profile', w: 500, h: 500 },
  { id: 'email', label: 'Email footer', w: 300, h: 100 },
  { id: 'social', label: 'Social square', w: 1080, h: 1080 },
];

// Placeholder sponsor logos, with deliberately messy whitespace and aspect ratios, the way real files arrive.
const SAMPLE_SVGS: [string, string][] = [
  [
    'sponsor-a',
    `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="520"><rect width="1000" height="520" fill="#fff"/><rect x="170" y="190" width="140" height="140" rx="32" fill="#8fa6b6"/><text x="240" y="285" text-anchor="middle" font-family="Helvetica,Arial" font-weight="700" font-size="84" fill="#fff">A</text><text x="350" y="282" font-family="Helvetica,Arial" font-weight="700" font-size="72" fill="#24394a">Sponsor A</text></svg>`,
  ],
  [
    'sponsor-b',
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect x="220" y="130" width="160" height="160" rx="80" fill="#d58aa3"/><text x="300" y="235" text-anchor="middle" font-family="Helvetica,Arial" font-weight="700" font-size="90" fill="#fff">B</text><text x="300" y="400" text-anchor="middle" font-family="Helvetica,Arial" font-weight="700" font-size="56" fill="#5e1b3e">SPONSOR B</text><text x="300" y="450" text-anchor="middle" font-family="Helvetica,Arial" font-size="24" letter-spacing="6" fill="#5e1b3e">PLACEHOLDER</text></svg>`,
  ],
  [
    'sponsor-c',
    `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="300"><path d="M80 230 L150 80 L220 230 Z" fill="#772450"/><text x="270" y="195" font-family="Helvetica,Arial" font-size="96" fill="#772450">Sponsor C Placeholder Group</text></svg>`,
  ],
  [
    'sponsor-d',
    `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="720"><rect width="700" height="720" fill="#fff"/><circle cx="350" cy="250" r="110" fill="#7f7c1e"/><text x="350" y="285" text-anchor="middle" font-family="Helvetica,Arial" font-weight="700" font-size="100" fill="#fff">D</text><text x="350" y="480" text-anchor="middle" font-family="Helvetica,Arial" font-size="56" fill="#222">sponsor d</text></svg>`,
  ],
  [
    'sponsor-e',
    `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="440"><rect x="90" y="140" width="160" height="160" rx="20" fill="#d0342c" transform="rotate(-8 170 220)"/><text x="300" y="215" font-family="Helvetica,Arial" font-weight="700" font-size="76" fill="#0b0b0c">Sponsor E</text><text x="302" y="280" font-family="Helvetica,Arial" font-weight="300" font-size="44" fill="#55525a">Placeholder Logo Co.</text></svg>`,
  ],
];

const slug = (s: string) => s.toLowerCase().replace(/\.[^.]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'logo';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Bounding box of the "ink": non-transparent, non-near-white pixels. */
function trimBox(img: HTMLImageElement) {
  const w = img.naturalWidth || 512;
  const h = img.naturalHeight || 512;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d', { willReadFrequently: true })!;
  g.drawImage(img, 0, 0, w, h);
  let data: Uint8ClampedArray;
  try {
    data = g.getImageData(0, 0, w, h).data;
  } catch {
    return { x: 0, y: 0, w, h }; // canvas tainted (some browsers + SVG): skip trimming
  }
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const a = data[i + 3];
      const nearWhite = data[i] > 245 && data[i + 1] > 245 && data[i + 2] > 245;
      if (a > 12 && !nearWhite) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  if (x1 < 0) return { x: 0, y: 0, w, h };
  return { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}

function render(logo: Logo, spec: Spec, opts: { padding: number; bg: Bg; trim: boolean }) {
  const c = document.createElement('canvas');
  c.width = spec.w;
  c.height = spec.h;
  const g = c.getContext('2d')!;
  if (opts.bg !== 'transparent') {
    g.fillStyle = opts.bg === 'white' ? '#ffffff' : '#000000';
    g.fillRect(0, 0, spec.w, spec.h);
  }
  const src = opts.trim ? logo.box : { x: 0, y: 0, w: logo.img.naturalWidth || 512, h: logo.img.naturalHeight || 512 };
  const pad = (opts.padding / 100) * Math.min(spec.w, spec.h);
  const scale = Math.min((spec.w - 2 * pad) / src.w, (spec.h - 2 * pad) / src.h);
  const dw = src.w * scale;
  const dh = src.h * scale;
  g.imageSmoothingQuality = 'high';
  g.drawImage(logo.img, src.x, src.y, src.w, src.h, (spec.w - dw) / 2, (spec.h - dh) / 2, dw, dh);
  return c;
}

const toBlob = (c: HTMLCanvasElement, type: string) =>
  new Promise<Blob>((resolve, reject) => c.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), type, 0.92));

export default function LogoResizer() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [selected, setSelected] = useState<string[]>(['app-tile', 'web-grid', 'email']);
  const [custom, setCustom] = useState({ on: false, w: 800, h: 400 });
  const [padding, setPadding] = useState(10);
  const [bg, setBg] = useState<Bg>('transparent');
  const [trim, setTrim] = useState(true);
  const [preview, setPreview] = useState<string>('app-tile');
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);

  const specs = useMemo(() => {
    const list = PRESETS.filter((p) => selected.includes(p.id));
    if (custom.on) list.push({ id: 'custom', label: 'Custom', w: custom.w, h: custom.h });
    return list;
  }, [selected, custom]);

  const previewSpec = specs.find((s) => s.id === preview) ?? specs[0];

  useEffect(() => {
    if (specs.length && !specs.some((s) => s.id === preview)) setPreview(specs[0].id);
  }, [specs, preview]);

  const addFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
    const loaded = await Promise.all(
      list.map(async (f) => {
        const img = await loadImage(URL.createObjectURL(f));
        return { id: crypto.randomUUID(), name: slug(f.name), img, box: trimBox(img) };
      }),
    );
    setLogos((l) => [...l, ...loaded]);
  };

  const loadSamples = async () => {
    const loaded = await Promise.all(
      SAMPLE_SVGS.map(async ([name, svg]) => {
        const img = await loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);
        return { id: crypto.randomUUID(), name, img, box: trimBox(img) };
      }),
    );
    setLogos(loaded);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setOver(false);
    addFiles(e.dataTransfer.files);
  };

  const previews = useMemo(() => {
    if (!previewSpec) return [];
    return logos.map((l) => ({ id: l.id, name: l.name, url: render(l, previewSpec, { padding, bg, trim }).toDataURL('image/png') }));
  }, [logos, previewSpec, padding, bg, trim]);

  const downloadZip = async () => {
    setBusy(true);
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const type = bg === 'transparent' ? 'image/png' : 'image/jpeg';
      const ext = bg === 'transparent' ? 'png' : 'jpg';
      for (const spec of specs) {
        const folder = zip.folder(`${spec.w}x${spec.h}-${slug(spec.label)}`)!;
        for (const logo of logos) {
          folder.file(`${logo.name}.${ext}`, await toBlob(render(logo, spec, { padding, bg, trim }), type));
        }
      }
      const blob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `logos-${specs.length}-sizes.zip`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    } finally {
      setBusy(false);
    }
  };

  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const fileCount = logos.length * specs.length;

  return (
    <LabShell slug="logo-resizer">
      <div className="tool">
        <div className="tool__controls">
          <label
            className={`dropzone${over ? ' is-over' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={onDrop}
          >
            <input type="file" accept="image/*" multiple onChange={(e) => e.target.files && addFiles(e.target.files)} />
            <span>Drop logos here, or browse</span>
            <small>PNG, JPG, SVG, or WebP. Processed in your browser.</small>
          </label>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" className="btn btn--sm" onClick={loadSamples}>
              Load sample logos
            </button>
            {logos.length > 0 && (
              <button type="button" className="btn btn--sm" onClick={() => setLogos([])}>
                Clear
              </button>
            )}
          </div>

          <fieldset className="checks">
            <legend>Output sizes</legend>
            {PRESETS.map((p) => (
              <label key={p.id}>
                <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggle(p.id)} />
                <span>{p.label}</span>
                <code>
                  {p.w}×{p.h}
                </code>
              </label>
            ))}
            <label>
              <input type="checkbox" checked={custom.on} onChange={(e) => setCustom((c) => ({ ...c, on: e.target.checked }))} />
              <span>Custom</span>
              <span className="checks__custom">
                <input
                  type="number"
                  min={16}
                  max={4000}
                  value={custom.w}
                  aria-label="Custom width"
                  onChange={(e) => setCustom((c) => ({ ...c, w: Math.max(16, +e.target.value || 16), on: true }))}
                />
                ×
                <input
                  type="number"
                  min={16}
                  max={4000}
                  value={custom.h}
                  aria-label="Custom height"
                  onChange={(e) => setCustom((c) => ({ ...c, h: Math.max(16, +e.target.value || 16), on: true }))}
                />
              </span>
            </label>
          </fieldset>

          <label className="field">
            Padding: {padding}%
            <input type="range" min={0} max={30} value={padding} onChange={(e) => setPadding(+e.target.value)} />
          </label>
          <fieldset className="seg">
            <legend>Background</legend>
            {(['transparent', 'white', 'black'] as Bg[]).map((b) => (
              <label key={b}>
                <input type="radio" name="bg" checked={bg === b} onChange={() => setBg(b)} />
                <span>{b === 'transparent' ? 'Transparent (PNG)' : `${b[0].toUpperCase()}${b.slice(1)} (JPG)`}</span>
              </label>
            ))}
          </fieldset>
          <label className="check-inline">
            <input type="checkbox" checked={trim} onChange={(e) => setTrim(e.target.checked)} />
            Trim extra whitespace before fitting
          </label>
        </div>

        <div className="tool__preview">
          {specs.length > 1 && (
            <fieldset className="seg" style={{ marginBottom: 16 }}>
              <legend>Preview size</legend>
              {specs.map((s) => (
                <label key={s.id}>
                  <input type="radio" name="preview" checked={previewSpec?.id === s.id} onChange={() => setPreview(s.id)} />
                  <span>
                    {s.w}×{s.h}
                  </span>
                </label>
              ))}
            </fieldset>
          )}
          {logos.length === 0 ? (
            <div className="panel empty">
              <p>No logos yet. Drop some in, or load the sample set to see how messy files come out clean.</p>
            </div>
          ) : (
            <ul className={`logo-grid logo-grid--${bg}`}>
              {previews.map((p) => (
                <li key={p.id}>
                  <img src={p.url} alt={`${p.name} at ${previewSpec?.w}×${previewSpec?.h}`} style={{ aspectRatio: `${previewSpec?.w} / ${previewSpec?.h}` }} />
                  <span>{p.name}</span>
                  <button type="button" className="logo-grid__x" aria-label={`Remove ${p.name}`} onClick={() => setLogos((l) => l.filter((x) => x.id !== p.id))}>
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="tool__actions">
            <button type="button" className="btn btn--accent" disabled={!fileCount || busy} onClick={downloadZip}>
              {busy ? 'Zipping…' : `Download ${fileCount} files (.zip)`} <span className="arrow">↓</span>
            </button>
            <span className="muted">One folder per size, ready to upload.</span>
          </div>
        </div>
      </div>
    </LabShell>
  );
}
