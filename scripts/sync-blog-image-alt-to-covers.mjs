/**
 * Set blog frontmatter imageAlt to match product-menu or spoofer cover images
 * (fixes stale gameplay-focused alt text after hero image path changes).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src/content/blog');

/** English alt text keyed by post slug. */
const altBySlug = {
  'dayz-player-esp':
    'Steam loader Visuals menu: player ESP options (box, skeleton, health, name, distance)',
  'dayz-zombie-esp':
    'Steam loader Visuals menu: infected ESP and related player ESP rows',
  'dayz-skeleton-esp':
    'Steam loader Visuals menu: skeleton and box options under player ESP',
  'dayz-health-esp':
    'Steam loader Visuals menu: health bar and health text toggles for survivors',
  'dayz-vehicle-esp':
    'Steam loader World menu: vehicle ESP, animals, and world toggles',
  'dayz-loot-esp':
    'Steam loader World menu: helicrash, items, and other world ESP rows',
  'dayz-aimbot-fov':
    'Steam loader Aimbot menu: FOV, bone, distance, and aim assist toggles',
  'best-dayz-hacks-2026':
    'Steam loader Aimbot menu: feature groups for a 2026 plan comparison',
  'dayz-no-clip':
    'Steam loader Misc menu: no clip, crosshair, FPS limit, and config save/load',
  'dayz-cheat-menu':
    'Steam loader Misc menu: miscellaneous options and config controls',
  'how-to-download-dayz':
    'Steam loader Misc menu: reference image for loader download steps',
  'dayz-battleye-ban-risk':
    'Steam loader Misc menu: context image for BattlEye and loader risk notes',
  'dayz-cheats-pricing':
    'Steam loader Visuals menu: cover image for plans and pricing guide',
  'what-is-an-hwid-spoofer':
    'HWID spoofer utility screen on Windows PC (hardware identity tools)',
  'what-an-hwid-spoofer-does':
    'HWID spoofer utility screen illustrating PC fingerprint and hardware flags',
  'are-spoofer-and-ugc-necessary':
    'HWID spoofer utility screen next to notes on optional spoofer and UGC keys',
};

function patchFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  if (!raw.startsWith('---\n')) return;

  const second = raw.indexOf('\n---\n', 4);
  if (second === -1) return;

  const jsonBlock = raw.slice(4, second);
  let data;
  try {
    data = JSON.parse(jsonBlock);
  } catch {
    return;
  }

  const slug = data.slug;
  if (!slug || !altBySlug[slug]) return;

  const img = data.image;
  if (typeof img !== 'string' || !img.startsWith('/images/products/')) return;

  data.imageAlt = altBySlug[slug];
  const next =
    '---\n' + JSON.stringify(data, null, 2) + '\n---\n' + raw.slice(second + 5);
  fs.writeFileSync(filePath, next, 'utf8');
}

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (name.endsWith('.md')) patchFile(p);
  }
}

walk(blogDir);
console.log('Blog imageAlt synced for menu/spoofer covers.');
