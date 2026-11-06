/**
 * Chunked JSON translation for large i18n / seo files.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  protectContent,
  restoreContent,
  placeholdersRestored,
  scrubForbiddenClaims,
  stripCodeFences,
} from './gemini-protect.mjs';

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const CHUNK_MAX_KEYS = Number(process.env.TRANSLATE_JSON_CHUNK_KEYS ?? 40);
const CHUNK_PARSE_RETRIES = Number(process.env.TRANSLATE_CHUNK_PARSE_RETRIES ?? 5);
/** If "1", chunk validation also requires glossary keep-list terms (strict; many false failures). Default off — gemini-protect placeholders + npm run i18n:check cover terms. */
const CHUNK_VALIDATE_GLOSSARY = process.env.TRANSLATE_CHUNK_VALIDATE_GLOSSARY === '1';

let glossaryKeep = null;

function loadGlossaryKeep() {
  if (glossaryKeep) return glossaryKeep;
  const file = path.join(projectRoot, 'src/i18n/glossary.json');
  try {
    const { keep } = JSON.parse(fs.readFileSync(file, 'utf8'));
    glossaryKeep = Array.isArray(keep) ? keep : [];
  } catch {
    glossaryKeep = [];
  }
  return glossaryKeep;
}

/** Count object keys recursively (array elements counted by their subtree). */
export function countJsonKeys(value) {
  if (value === null || typeof value !== 'object') return 0;
  if (Array.isArray(value)) {
    return value.reduce((sum, item) => sum + countJsonKeys(item), 0);
  }
  let n = Object.keys(value).length;
  for (const v of Object.values(value)) {
    n += countJsonKeys(v);
  }
  return n;
}

/** Split a JSON object into chunks of ~maxKeys keys (structure preserved). */
export function splitJsonIntoChunks(obj, maxKeys = CHUNK_MAX_KEYS) {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return [obj];
  }
  const chunks = [];
  let batch = {};
  let batchCount = 0;

  const flush = () => {
    if (batchCount > 0) {
      chunks.push(batch);
      batch = {};
      batchCount = 0;
    }
  };

  for (const [key, val] of Object.entries(obj)) {
    const n = 1 + countJsonKeys(val);
    if (n > maxKeys) {
      flush();
      const inner = splitJsonIntoChunks(val, maxKeys);
      for (const part of inner) {
        chunks.push({ [key]: part });
      }
      continue;
    }
    if (batchCount + n > maxKeys) flush();
    batch[key] = val;
    batchCount += n;
  }
  flush();
  return chunks.length ? chunks : [obj];
}

export function deepMergeTranslated(base, part) {
  const out = structuredClone(base);
  for (const [k, v] of Object.entries(part)) {
    if (
      v &&
      typeof v === 'object' &&
      !Array.isArray(v) &&
      out[k] &&
      typeof out[k] === 'object' &&
      !Array.isArray(out[k])
    ) {
      out[k] = deepMergeTranslated(out[k], v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

function keyPathSet(obj, prefix = '') {
  const set = new Set();
  if (obj === null || typeof obj !== 'object') return set;
  if (Array.isArray(obj)) {
    obj.forEach((el, i) => {
      for (const p of keyPathSet(el, `${prefix}[${i}]`)) set.add(p);
    });
    return set;
  }
  for (const key of Object.keys(obj)) {
    const p = prefix ? `${prefix}.${key}` : key;
    set.add(p);
    for (const sub of keyPathSet(obj[key], p)) set.add(sub);
  }
  return set;
}

export function sameJsonStructure(a, b) {
  const sa = [...keyPathSet(a)].sort().join('\n');
  const sb = [...keyPathSet(b)].sort().join('\n');
  return sa === sb;
}

const PLACEHOLDER_RE = /\[\[T\d+\]\]|\{[^}]+\}|%\d*\$?[sdif]|%\w|%\./gi;

function collectPlaceholdersFromStrings(obj, out = []) {
  if (typeof obj === 'string') {
    const matches = obj.match(PLACEHOLDER_RE);
    if (matches) out.push(...matches);
    return out;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) collectPlaceholdersFromStrings(item, out);
    return out;
  }
  if (obj && typeof obj === 'object') {
    for (const v of Object.values(obj)) collectPlaceholdersFromStrings(v, out);
  }
  return out;
}

function collectGlossaryHits(obj, terms) {
  const hits = [];
  const blob = JSON.stringify(obj);
  for (const term of terms) {
    if (term && blob.includes(term)) hits.push(term);
  }
  return hits;
}

/** Glossary terms must survive translation (ESP, loader, FOV, etc.), including compounds like Spieler-ESP. */
function translatedBlobIncludesTerm(translatedBlob, term) {
  if (translatedBlob.includes(term)) return true;
  if (/^[A-Za-z0-9\s$./-]+$/.test(term) && term.length >= 2) {
    return translatedBlob.toLowerCase().includes(term.toLowerCase());
  }
  return false;
}

export function validateTranslatedChunk(sourceChunk, translatedChunk) {
  if (!sameJsonStructure(sourceChunk, translatedChunk)) {
    return { ok: false, reason: 'structure keys mismatch' };
  }
  const translatedBlob = JSON.stringify(translatedChunk);
  const placeholders = [...new Set(collectPlaceholdersFromStrings(sourceChunk))];
  for (const ph of placeholders) {
    if (!translatedBlob.includes(ph)) {
      return { ok: false, reason: `missing placeholder ${ph}` };
    }
  }
  // Glossary: optional at chunk level. Requiring every English tech term in every chunk caused
  // constant "missing glossary term X" when the model used acceptable local wording; that forced
  // slow per-string fallback. Protected tokens are handled by gemini-protect + i18n:check.
  if (CHUNK_VALIDATE_GLOSSARY) {
    const glossary = loadGlossaryKeep();
    for (const term of collectGlossaryHits(sourceChunk, glossary)) {
      if (!translatedBlobIncludesTerm(translatedBlob, term)) {
        return { ok: false, reason: `missing glossary term ${term}` };
      }
    }
  }
  return { ok: true };
}

function walkStringLeaves(obj, path, leaves) {
  if (typeof obj === 'string') {
    leaves.push({ path: [...path], value: obj });
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => walkStringLeaves(item, [...path, i], leaves));
    return;
  }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      walkStringLeaves(v, [...path, k], leaves);
    }
  }
}

function setAtPath(root, pathParts, value) {
  let cur = root;
  for (let i = 0; i < pathParts.length - 1; i++) {
    cur = cur[pathParts[i]];
  }
  cur[pathParts[pathParts.length - 1]] = value;
}

/** Gemini sometimes appends prose after a valid JSON object — parse the first object only. */
function extractFirstJsonObject(raw) {
  const start = raw.indexOf('{');
  if (start < 0) throw new SyntaxError('no JSON object in Gemini response');
  let depth = 0;
  let inString = false;
  let escape = false;
  for (let i = start; i < raw.length; i++) {
    const c = raw[i];
    if (inString) {
      if (escape) escape = false;
      else if (c === '\\') escape = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') {
      inString = true;
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return raw.slice(start, i + 1);
    }
  }
  throw new SyntaxError('unclosed JSON object in Gemini response');
}

function parseGeminiJson(text, map) {
  let out = stripCodeFences(text);
  out = scrubForbiddenClaims(restoreContent(out, map));
  if (!placeholdersRestored(out, map)) {
    throw new Error('placeholder restore incomplete');
  }
  try {
    return JSON.parse(out);
  } catch {
    return JSON.parse(extractFirstJsonObject(out));
  }
}

async function translateSingleString(value, locale, langName, geminiGenerate, sleep, delayMs) {
  const payload = { text: value };
  const raw = JSON.stringify(payload);
  const { text: protectedText, map } = protectContent(raw);
  const prompt = `Translate the JSON value "text" from English to ${langName} (${locale}).
Return ONLY valid JSON: {"text":"..."}.
Keep every [[T#]] placeholder, {curly} placeholders, %s style tokens, and HTML tags exactly as in the source string.
Never use the words "undetected" or "safe".

JSON:
${protectedText}`;
  let lastErr;
  for (let attempt = 0; attempt < CHUNK_PARSE_RETRIES; attempt++) {
    try {
      const response = await geminiGenerate(prompt, { jsonMode: true });
      const parsed = parseGeminiJson(response, map);
      if (typeof parsed?.text !== 'string') throw new Error('single-string translate missing text field');
      return parsed.text;
    } catch (err) {
      lastErr = err;
      await sleep(delayMs * (attempt + 1));
    }
  }
  throw lastErr ?? new Error('single-string translate failed');
}

async function translateChunkOneByOne(sourceChunk, locale, langName, geminiGenerate, sleep, delayMs) {
  const out = structuredClone(sourceChunk);
  const leaves = [];
  walkStringLeaves(out, [], leaves);
  for (const { path: leafPath, value } of leaves) {
    if (typeof value !== 'string' || !value.trim()) continue;
    try {
      const translated = await translateSingleString(value, locale, langName, geminiGenerate, sleep, delayMs);
      setAtPath(out, leafPath, translated);
    } catch (err) {
      const key = leafPath.join('.') || '(root)';
      console.warn(`translate: keeping English for ${key} (${err.message})`);
      setAtPath(out, leafPath, value);
    }
    await sleep(delayMs);
  }
  const check = validateTranslatedChunk(sourceChunk, out);
  if (!check.ok) {
    console.warn(
      `translate: per-string chunk finished with ${check.reason}; keeping best-effort strings for this chunk`,
    );
  }
  return out;
}

async function translateOneChunk({
  sourceChunk,
  locale,
  langName,
  buildPrompt,
  geminiGenerate,
  sleep,
  delayMs,
  chunkLabel,
}) {
  const chunkStr = JSON.stringify(sourceChunk, null, 2);
  const { text: protectedText, map } = protectContent(chunkStr);
  const prompt = buildPrompt(locale, protectedText);
  let lastParseErr;

  for (let attempt = 0; attempt < CHUNK_PARSE_RETRIES; attempt++) {
    try {
      const response = await geminiGenerate(prompt, { jsonMode: true });
      const parsed = parseGeminiJson(response, map);
      const check = validateTranslatedChunk(sourceChunk, parsed);
      if (!check.ok) {
        throw new Error(check.reason);
      }
      return parsed;
    } catch (err) {
      lastParseErr = err;
      await sleep(delayMs * (attempt + 1));
    }
  }

  console.error(
    `translate: ${chunkLabel} chunk parse/validate failed after ${CHUNK_PARSE_RETRIES} tries (${lastParseErr?.message}); keys ${JSON.stringify(Object.keys(sourceChunk))}; falling back to per-string translate`,
  );

  try {
    return await translateChunkOneByOne(sourceChunk, locale, langName, geminiGenerate, sleep, delayMs);
  } catch (err) {
    console.error(
      `translate: ${chunkLabel} one-by-one fallback failed: ${err.message}; chunk ${JSON.stringify(sourceChunk).slice(0, 500)}`,
    );
    throw err;
  }
}

/**
 * Translate a parsed JSON document in chunks; returns merged object (does not write disk).
 */
export async function translateJsonDocument({
  sourceObj,
  locale,
  langName,
  buildPrompt,
  geminiGenerate,
  sleep,
  delayMs,
  fileLabel,
  maxKeys = CHUNK_MAX_KEYS,
}) {
  const chunks = splitJsonIntoChunks(sourceObj, maxKeys);
  let merged = {};

  for (let i = 0; i < chunks.length; i++) {
    const chunkLabel = `${fileLabel} chunk ${i + 1}/${chunks.length}`;
    console.log(`translate: ${chunkLabel}…`);
    const translated = await translateOneChunk({
      sourceChunk: chunks[i],
      locale,
      langName,
      buildPrompt,
      geminiGenerate,
      sleep,
      delayMs,
      chunkLabel,
    });
    merged = deepMergeTranslated(merged, translated);
    await sleep(delayMs);
  }

  if (!sameJsonStructure(sourceObj, merged)) {
    throw new Error(`${fileLabel}: merged output structure does not match source`);
  }

  return merged;
}
