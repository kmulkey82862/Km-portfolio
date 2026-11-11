// Screenshots of the three tool demos, used as the images on the Tools cards.
//   npx vite preview --port 4176 &   (from a fresh build)
//   NODE_PATH=$(npm root -g) node scripts/tool-shots.mjs http://localhost:4176
// Writes public/media/tool-<id>-600.webp and -1200.webp.
import { createRequire } from 'node:module';
import sharp from 'sharp';

const { chromium } = createRequire(import.meta.url)('playwright');
const base = process.argv[2] || 'http://localhost:4176';

// Areas of each demo page, in CSS pixels at a 1300px-wide window.
const SHOTS = [
  { id: 'speaker', path: '/lab/speaker-graphic', clip: { x: 55, y: 962, width: 1190, height: 388 } },
  { id: 'logo', path: '/lab/logo-resizer', click: 'Load sample logos', clip: { x: 486, y: 484, width: 760, height: 316 } },
  { id: 'archive', path: '/lab/session-archive', clip: { x: 189, y: 436, width: 906, height: 700 } },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1300, height: 900 }, deviceScaleFactor: 2 });
for (const s of SHOTS) {
  await page.goto(base + s.path, { waitUntil: 'networkidle' });
  if (s.click) {
    await page.getByText(s.click).click();
    await page.waitForTimeout(2500);
  }
  await page.waitForTimeout(800);
  const png = await page.screenshot({ clip: s.clip, fullPage: true });
  for (const w of [600, 1200]) {
    await sharp(png).resize({ width: w }).webp({ quality: 82 }).toFile(`public/media/tool-${s.id}-${w}.webp`);
  }
  console.log('wrote tool-' + s.id);
}
await browser.close();
