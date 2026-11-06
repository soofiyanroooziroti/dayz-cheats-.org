/**
 * One-time helper: write base *.webp next to wardogs *.png sources so blog paths
 * like /images/gameplay/wardogs-esp-forest.webp exist (optimize-images then adds -320 etc.).
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const dir = path.join(root, 'public', 'images', 'gameplay');

const files = fs.readdirSync(dir).filter((f) => /^wardogs-esp-.+\.png$/i.test(f));

for (const file of files) {
  const input = path.join(dir, file);
  const base = file.replace(/\.png$/i, '');
  const output = path.join(dir, `${base}.webp`);
  await sharp(input).webp({ quality: 82, effort: 4 }).toFile(output);
  console.log(`Wrote ${path.relative(root, output)}`);
}
