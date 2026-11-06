/**
 * npm run i18n:check — validate locale JSON against en.json + protected terms + astro hardcoded text.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import protectedTermsJson from './protected-terms.json' with { type: 'json' };
import { shipLocales, defaultLocale } from './locale-ship.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const i18nDir = path.join(root, 'src', 'i18n');
const srcDir = path.join(root, 'src');

const protectedTerms = [...protectedTermsJson];

function flatten(obj, prefix = '') {
  /** @type {Record<string, string>} */
  const out = {};
  if (obj == null || typeof obj !== 'object') return out;
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      if (typeof item === 'string') out[`${prefix}[${i}]`] = item;
      else Object.assign(out, flatten(item, `${prefix}[${i}]`));
    });
    return out;
  }
  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') out[next] = value;
    else if (value != null && typeof value === 'object') Object.assign(out, flatten(value, next));
  }
  return out;
}

function extractPlaceholders(s) {
  const m = s.match(/\{[^}]+\}/g);
  return m ? [...m].sort().join('|') : '';
}

function extractHtmlTags(s) {
  const m = s.match(/<\/?[a-z][^>]*>/gi);
  return m ? [...new Set(m)].sort().join('|') : '';
}

function extractUrls(s) {
  const m = s.match(/https?:\/\/[^\s"'<>]+|\/go\/[^\s"'<>]+|mailto:[^\s"'<>]+/gi);
  return m ? [...new Set(m)].sort().join('|') : '';
}

function isProtectedIdentical(enVal, locVal) {
  return enVal === locVal;
}

function protectedTermMissing(enVal, locVal, term) {
  if (!enVal.includes(term)) return false;
  return !locVal.includes(term);
}

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

/** @type {string[]} */
const errors = [];

const enPath = path.join(i18nDir, 'en.json');
if (!fs.existsSync(enPath)) {
  console.error('Missing en.json — run: npm run i18n:export-en');
  process.exit(1);
}

const enFlat = flatten(loadJson(enPath));
const enKeys = new Set(Object.keys(enFlat));

for (const locale of shipLocales) {
  if (locale === defaultLocale) continue;
  const file = path.join(i18nDir, `${locale}.json`);
  if (!fs.existsSync(file)) {
    errors.push(`${locale}.json: missing file`);
    continue;
  }
  const raw = loadJson(file);
  if (raw && typeof raw === 'object' && Object.keys(raw).length === 0) {
    continue;
  }
  const locFlat = flatten(raw);
  const locKeys = new Set(Object.keys(locFlat));

  for (const key of enKeys) {
    if (!locKeys.has(key)) errors.push(`${locale}.json: missing key "${key}"`);
    else if (!locFlat[key]?.trim()) errors.push(`${locale}.json: empty key "${key}"`);
  }
  for (const key of locKeys) {
    if (!enKeys.has(key)) errors.push(`${locale}.json: extra key "${key}"`);
  }

  for (const key of enKeys) {
    const enVal = enFlat[key];
    const locVal = locFlat[key];
    if (typeof locVal !== 'string') continue;

    const enPh = extractPlaceholders(enVal);
    const locPh = extractPlaceholders(locVal);
    if (enPh !== locPh) {
      errors.push(`${locale}.json: placeholder mismatch at "${key}" (en: ${enPh || 'none'} vs loc: ${locPh || 'none'})`);
    }

    const enHtml = extractHtmlTags(enVal);
    const locHtml = extractHtmlTags(locVal);
    if (enHtml !== locHtml) {
      errors.push(`${locale}.json: HTML tag mismatch at "${key}"`);
    }

    const enUrls = extractUrls(enVal);
    const locUrls = extractUrls(locVal);
    if (enUrls !== locUrls) {
      errors.push(`${locale}.json: URL mismatch at "${key}"`);
    }

    for (const term of protectedTerms) {
      if (protectedTermMissing(enVal, locVal, term)) {
        errors.push(`${locale}.json: protected term "${term}" missing or altered at "${key}"`);
      }
    }

    if (isProtectedIdentical(enVal, locVal)) {
      const hasProtected = protectedTerms.some((t) => enVal.includes(t));
      const isUrlOrCode =
        key.endsWith('.href') ||
        /^[\s/W:.$0-9#?=&%-]+$/.test(enVal) ||
        enVal.startsWith('http') ||
        enVal.includes('/go/') ||
        (enVal.startsWith('/') && !/\s/.test(enVal));
      if (!hasProtected && !isUrlOrCode && enVal.length > 2) {
        errors.push(`${locale}.json: still English (not protected) at "${key}"`);
      }
    }
  }
}

function listAstroFiles(dir, acc = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) {
      if (name.name === 'starwind') continue;
      listAstroFiles(full, acc);
    } else if (name.name.endsWith('.astro')) acc.push(path.relative(srcDir, full));
  }
  return acc;
}

const astroFiles = listAstroFiles(srcDir);
const hardcodedPattern =
  />\s*[A-Za-z][^<{]*[A-Za-z]\s*</;

for (const rel of astroFiles) {
  const full = path.join(srcDir, rel);
  const text = fs.readFileSync(full, 'utf8');
  const lines = text.split('\n');
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('*')) return;
    const base = rel.split(/[/\\]/).pop() ?? '';
    if (base === 'ProductHero.astro' || base === 'ProductPageHero.astro') return;
    if (
      trimmed.includes('t.') ||
      trimmed.includes('getTranslations') ||
      trimmed.includes('forumUi') ||
      trimmed.includes('productUi') ||
      trimmed.includes('compareCopy') ||
      trimmed.includes('utilitiesCopy')
    )
      return;
    if (trimmed.includes('---') || trimmed.includes('import ') || trimmed.includes('@apply')) return;
    if (trimmed.includes('aria-label={') || trimmed.includes('aria-labelledby={')) return;
    if (hardcodedPattern.test(line) && !line.includes('{') && !line.includes('t(')) {
      if (/>(Home|Test|TODO)</.test(line)) return;
      errors.push(`${rel}:${idx + 1}: possible hardcoded visible text (use t() / getTranslations)`);
    }
  });
}

if (errors.length) {
  console.error(`i18n:check failed with ${errors.length} issue(s):\n`);
  for (const e of errors.slice(0, 200)) console.error(`  - ${e}`);
  if (errors.length > 200) console.error(`  … and ${errors.length - 200} more`);
  process.exit(1);
}

console.log('i18n:check passed.');
