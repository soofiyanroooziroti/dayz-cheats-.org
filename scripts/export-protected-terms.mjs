/**
 * Sync scripts/protected-terms.json from src/i18n/protected.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const mod = await import(pathToFileURL(path.join(root, 'src', 'i18n', 'protected.ts')).href);
const terms = mod.PROTECTED_TERMS ?? mod.default;
if (!Array.isArray(terms)) {
  console.error('export-protected-terms: PROTECTED_TERMS not found');
  process.exit(1);
}
const out = path.join(root, 'scripts', 'protected-terms.json');
fs.writeFileSync(out, `${JSON.stringify(terms, null, 2)}\n`);
console.log(`Wrote ${terms.length} protected terms → scripts/protected-terms.json`);
