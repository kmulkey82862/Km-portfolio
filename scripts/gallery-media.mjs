// Converts the gallery's source files into web versions in public/media/gallery/.
//   node scripts/gallery-media.mjs <folder of source files named by id>
// Images: <id>-600.webp (thumb) and <id>-1800.webp (viewer). HEIC goes through heic-convert.
// Videos: <id>.mp4 (H.264, max 1080 tall, no larger than needed) and <id>-600.webp poster.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';
import heicConvert from 'heic-convert';

const SRC = process.argv[2];
const OUT = path.resolve('public/media/gallery');
fs.mkdirSync(OUT, { recursive: true });
const items = fs.readFileSync('src/content/driveGallery.ts', 'utf8').matchAll(/(img|vid)\('([^']+)'/g);

for (const [, kind, id] of items) {
  const src = path.join(SRC, id);
  if (!fs.existsSync(src)) { console.log('missing', id); continue; }
  try {
    if (kind === 'vid') {
      const mp4 = path.join(OUT, `${id}.mp4`);
      if (!fs.existsSync(mp4))
        execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', src, '-vf', "scale='if(gt(ih,iw),min(720,iw),-2)':'if(gt(ih,iw),-2,min(720,ih))'",
          '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '96k', mp4]);
      const frame = path.join(OUT, `${id}-frame.png`);
      execFileSync(ffmpeg, ['-y', '-loglevel', 'error', '-ss', '0.5', '-i', mp4, '-frames:v', '1', frame]);
      await sharp(frame).resize({ width: 600, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(OUT, `${id}-600.webp`));
      fs.rmSync(frame);
    } else {
      let input = fs.readFileSync(src);
      const head = input.subarray(4, 12).toString();
      if (head.includes('ftypheic') || head.includes('ftypmif1') || head.includes('ftypheix')) input = Buffer.from(await heicConvert({ buffer: input, format: 'JPEG', quality: 0.9 }));
      const img = sharp(input, { limitInputPixels: false }).rotate();
      await img.clone().resize({ width: 600, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(OUT, `${id}-600.webp`));
      await img.clone().resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(OUT, `${id}-1800.webp`));
    }
    console.log('ok', kind, id);
  } catch (e) { console.log('FAIL', id, e.message.slice(0, 200)); }
}
