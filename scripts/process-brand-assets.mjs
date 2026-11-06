/**
 * Build header logo (logo.webp, logo.png) from logo.jpg and favicons from favicon.jpg.
 * Source files at repo root: logo.jpg, favicon.jpg
 */
import sharp from 'sharp';
import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import pngToIco from 'png-to-ico';

const root = join(import.meta.dirname, '..');
const publicDir = join(root, 'public');

async function buildHeaderLogo() {
  const logoSrc = join(root, 'logo.jpg');
  if (!existsSync(logoSrc)) {
    console.warn('Missing logo.jpg at repo root — skipping logo.webp / logo.png.');
    return;
  }
  const outWebp = join(publicDir, 'logo.webp');
  const outPng = join(publicDir, 'logo.png');

  const fromLogo = sharp(logoSrc).resize(512, 512, { fit: 'cover', position: 'centre' });

  await fromLogo.clone().webp({ quality: 88 }).toFile(outWebp);
  await fromLogo.clone().png().toFile(outPng);
}

async function buildFavicons() {
  const src = join(root, 'favicon.jpg');
  if (!existsSync(src)) {
    console.warn('Missing favicon.jpg at repo root — skipping favicons.');
    return;
  }
  const base = sharp(src).resize(512, 512, { fit: 'cover', position: 'centre' });

  const sizes = [
    { name: 'favicon-16.png', size: 16 },
    { name: 'favicon-32.png', size: 32 },
    { name: 'favicon-48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
  ];

  const icoBuffers = [];
  for (const { name, size } of sizes) {
    const buf = await base.clone().resize(size, size).png().toBuffer();
    writeFileSync(join(publicDir, name), buf);
    if (size === 16 || size === 32 || size === 48) {
      icoBuffers.push(buf);
    }
  }

  writeFileSync(join(publicDir, 'favicon.ico'), await pngToIco(icoBuffers));
}

await buildHeaderLogo();
await buildFavicons();
console.log(
  'Brand assets: logo.webp + logo.png from logo.jpg; favicon-*.png + apple-touch-icon + favicon.ico from favicon.jpg',
);
