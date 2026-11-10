// Renders resume/resume.html to a two-page letter PDF.
//   NODE_PATH=$(npm root -g) node resume/build.mjs [output path, default public/Katelyn_Mulkey_Resume.pdf]
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');

const here = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] || path.join(here, '..', 'public', 'Katelyn_Mulkey_Resume.pdf');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file://' + path.join(here, 'resume.html'), { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
// Fail loudly if anything spills past the bottom of a page.
const spill = await page.evaluate(() =>
  [...document.querySelectorAll('.page')].map((p, i) => {
    const bottom = p.getBoundingClientRect().bottom;
    const last = [...p.querySelectorAll('.job, .cards, .edu, .tools, .summary')].map((e) => e.getBoundingClientRect().bottom);
    return { page: i + 1, room: Math.round(bottom - Math.max(...last)) };
  }),
);
console.log('space left at the bottom of each page (px):', spill);
await page.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log('wrote', out);
