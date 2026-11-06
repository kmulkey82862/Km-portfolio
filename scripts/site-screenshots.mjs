import fs from 'node:fs';
// Screenshots of the four live or archived sites. Usage: node scripts/site-screenshots.mjs <folder with site-cdc.png, site-adnet-2027.png, site-matt-chapin.png, site-web-deva.png>
import sharp from 'sharp';
const dir = process.argv[2];
const jsonPath = 'src/content/media.generated.json';
const media = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const alts = { 'site-cdc': 'American Chronic Disease Convention website, archived build', 'site-adnet-2027': 'AdNet 2027 Annual Conference website, archived build',
  'site-matt-chapin': 'Matt Chapin Music website', 'site-web-deva': 'Web Deva Digital website', 'site-component-bank': 'Web Deva component library' };
for (const id of Object.keys(alts)) {
  const src = `${dir}/${id}.png`;
  for (const f of fs.readdirSync('public/media')) if (f.startsWith(id + '-')) fs.rmSync('public/media/' + f);
  const meta = await sharp(src).metadata();
  for (const w of [480, 960, 1600]) {
    await sharp(src).resize({ width: w }).avif({ quality: 55 }).toFile(`public/media/${id}-${w}.avif`);
    await sharp(src).resize({ width: w }).webp({ quality: 78 }).toFile(`public/media/${id}-${w}.webp`);
  }
  const blur = await sharp(src).resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  media[id] = { type: 'image', alt: alts[id], width: meta.width, height: meta.height, src: `/media/${id}-960.webp`,
    srcset: { avif: [480, 960, 1600].map((w) => `/media/${id}-${w}.avif ${w}w`).join(', '), webp: [480, 960, 1600].map((w) => `/media/${id}-${w}.webp ${w}w`).join(', ') },
    blur: 'data:image/webp;base64,' + blur.toString('base64') };
  console.log(id, meta.width, meta.height);
}
fs.writeFileSync(jsonPath, JSON.stringify(media, null, 2) + '\n');
