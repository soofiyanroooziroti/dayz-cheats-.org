/**
 * Restore DayZ gameplay shots for blog hero images where appropriate.
 * Wardogs gameplay files stay removed; menu/spoofer covers stay where we never used gameplay.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src/content/blog');

/** English image + imageAlt keyed by slug (applied to every locale file of that slug). */
const bySlug = {
  'dayz-player-esp': {
    image: '/images/gameplay/dayz-player-esp-boxes-distance-labels.webp',
    imageAlt: 'DayZ ESP boxes and distance labels on players near a building',
  },
  'dayz-zombie-esp': {
    image: '/images/gameplay/dayz-health-esp-through-door.webp',
    imageAlt: 'DayZ ESP health readout through a doorway',
  },
  'dayz-skeleton-esp': {
    image: '/images/gameplay/dayz-skeleton-esp-close-range.webp',
    imageAlt: 'DayZ skeleton ESP with boxes at close range',
  },
  'dayz-health-esp': {
    image: '/images/gameplay/dayz-health-esp-through-door.webp',
    imageAlt: 'DayZ health ESP bars and skeleton boxes through a closed door',
  },
  'dayz-vehicle-esp': {
    image: '/images/gameplay/dayz-player-esp-multiple-players-distance.webp',
    imageAlt: 'DayZ world ESP with multiple players and distance labels outdoors',
  },
  'dayz-loot-esp': {
    image: '/images/gameplay/dayz-loot-esp-player-box.webp',
    imageAlt: 'DayZ loot ESP with item labels and a player box in a village',
  },
  'dayz-battleye-ban-risk': {
    image: '/images/gameplay/dayz-player-esp-multiple-players-distance.webp',
    imageAlt: 'DayZ outdoor session with player ESP distance labels',
  },
  'best-dayz-hacks-2026': {
    image: '/images/gameplay/dayz-loot-esp-player-box.webp',
    imageAlt: 'DayZ loot ESP and player markers overview',
  },
  'dayz-no-clip': {
    image: '/images/products/wardogs-menu-misc.webp',
    imageAlt: 'Steam loader Miscellaneous menu: no clip, crosshair, FPS limit, config save/load',
  },
  'dayz-cheat-menu': {
    image: '/images/products/wardogs-menu-misc.webp',
    imageAlt: 'Steam loader Miscellaneous menu: miscellaneous options and config controls',
  },
  'how-to-download-dayz': {
    image: '/images/products/wardogs-menu-misc.webp',
    imageAlt: 'Steam loader Miscellaneous menu: reference for loader download steps',
  },
  'dayz-cheats-pricing': {
    image: '/images/products/wardogs-menu-visuals.webp',
    imageAlt: 'Steam loader Visuals menu: cover for plans and pricing guide',
  },
  'dayz-aimbot-fov': {
    image: '/images/products/wardogs-menu-aimbot.webp',
    imageAlt: 'Steam loader Aimbot menu: FOV, bone, distance, and aim assist toggles',
  },
  'what-is-an-hwid-spoofer': {
    image: '/images/products/cs2-spoofer-hero.webp',
    imageAlt: 'HWID spoofer utility screen on Windows PC (hardware identity tools)',
  },
  'what-an-hwid-spoofer-does': {
    image: '/images/products/cs2-spoofer-hero.webp',
    imageAlt: 'HWID spoofer utility screen illustrating PC fingerprint and hardware flags',
  },
  'are-spoofer-and-ugc-necessary': {
    image: '/images/products/cs2-spoofer-hero.webp',
    imageAlt: 'HWID spoofer utility screen next to notes on optional spoofer and UGC keys',
  },
};

function splitFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) return null;
  const end = normalized.indexOf('\n---\n', 4);
  if (end === -1) return null;
  return {
    json: normalized.slice(4, end),
    body: normalized.slice(end + 5),
  };
}

function patchFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const parts = splitFrontmatter(raw);
  if (!parts) return;

  let data;
  try {
    data = JSON.parse(parts.json);
  } catch {
    return;
  }

  const slug = data.slug;
  const patchData = bySlug[slug];
  if (!patchData) return;

  data.image = patchData.image;
  data.imageAlt = patchData.imageAlt;
  const out = `---\n${JSON.stringify(data, null, 2)}\n---\n${parts.body}`;
  fs.writeFileSync(filePath, out, 'utf8');
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
console.log('Blog hero images: DayZ gameplay restored for ESP/overview posts; menu/spoofer unchanged elsewhere.');
