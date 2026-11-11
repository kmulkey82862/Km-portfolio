// Large animated GIFs -> animated WebP at display size (2x for sharpness).
import sharp from 'sharp';
const [src, out, width] = process.argv.slice(2);
await sharp(src, { animated: true, limitInputPixels: false }).resize({ width: Number(width) }).webp({ quality: Number(process.argv[5] || 72), effort: 5 }).toFile(out);
console.log('ok', out);
