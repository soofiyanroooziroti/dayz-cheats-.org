import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const source = path.join(publicDir, 'brand-logo.jpg');

if (!fs.existsSync(source)) {
  console.error('Missing public/brand-logo.jpg — add your Gemini logo there first.');
  process.exit(1);
}

const logoWebp = path.join(publicDir, 'logo.webp');

await sharp(source).resize(512, 512, { fit: 'cover', position: 'centre' }).webp({ quality: 86 }).toFile(logoWebp);

const sizes = [
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-32.png', size: 32 },
  { name: 'favicon-16.png', size: 16 },
  { name: 'favicon-48.png', size: 48 },
];

for (const { name, size } of sizes) {
  await sharp(source)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .png()
    .toFile(path.join(publicDir, name));
}

await sharp(source)
  .resize(32, 32, { fit: 'cover', position: 'centre' })
  .png()
  .toFile(path.join(publicDir, 'favicon.ico'));

console.log('Brand assets generated from brand-logo.jpg: logo.webp, favicons, apple-touch-icon.png');
