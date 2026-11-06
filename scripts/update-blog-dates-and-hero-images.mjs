/**
 * Set canonical blog dates (dateIso) and locale-specific display dates.
 * Assign each post a distinct hero image from existing gameplay + product assets.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src/content/blog');

/**
 * Newest-first puts cheat posts above HWID/UGC.
 * Cheats: 2026-08-29 → 2026-11-06. HWID/UGC stay in mid-August.
 */
const dateIsoBySlug = {
  'how-to-download-dayz': '2026-11-06',
  'dayz-cheats-pricing': '2026-11-03',
  'dayz-limit-fps': '2026-11-01',
  'dayz-cheat-menu': '2026-10-30',
  'dayz-no-clip': '2026-10-26',
  'dayz-esp-traces': '2026-10-25',
  'dayz-loot-esp': '2026-10-22',
  'dayz-friends-esp': '2026-10-18',
  'dayz-vehicle-esp': '2026-10-17',
  'dayz-health-esp': '2026-10-12',
  'dayz-item-in-hands': '2026-10-10',
  'dayz-skeleton-esp': '2026-10-06',
  'dayz-filled-box': '2026-10-02',
  'dayz-zombie-esp': '2026-09-28',
  'dayz-animal-esp': '2026-09-26',
  'dayz-player-esp': '2026-09-20',
  'dayz-aimbot-fov': '2026-09-12',
  'best-dayz-hacks-2026': '2026-09-04',
  'dayz-battleye-ban-risk': '2026-08-29',
  'what-an-hwid-spoofer-does': '2026-08-22',
  'what-is-an-hwid-spoofer': '2026-08-18',
  'are-spoofer-and-ugc-necessary': '2026-08-15',
};

const localeHtmlLang = {
  en: 'en-US',
  fr: 'fr',
  it: 'it',
  de: 'de',
  es: 'es',
  cs: 'cs',
  ru: 'ru',
  'zh-cn': 'zh-CN',
  ja: 'ja',
  pl: 'pl',
  'pt-br': 'pt-BR',
};

/** Each menu screenshot is used once. Gameplay shots cover the rest; a few are reused once. */
const MENU_IMAGES = new Set([
  '/images/products/wardogs-menu-visuals.webp',
  '/images/products/wardogs-menu-world.webp',
  '/images/products/wardogs-menu-aimbot.webp',
  '/images/products/wardogs-menu-misc.webp',
]);
const SPOOFER_HERO = '/images/products/cs2-spoofer-hero.webp';
const UGC_HERO = '/images/products/ugc-account-recovery.webp';

const heroBySlug = {
  'dayz-player-esp': {
    image: '/images/gameplay/dayz-player-esp-boxes-distance-labels.webp',
    imageAlt: 'DayZ ESP boxes and distance labels on players near a building',
  },
  'dayz-zombie-esp': {
    image: '/images/gameplay/dayz-skeleton-esp-close-range.webp',
    imageAlt: 'DayZ skeleton ESP with boxes at close range',
  },
  'dayz-skeleton-esp': {
    image: '/images/gameplay/dayz-skeleton-esp-through-walls-indoor.webp',
    imageAlt: 'DayZ skeleton ESP showing players through walls indoors',
  },
  'dayz-health-esp': {
    image: '/images/gameplay/dayz-health-esp-through-door.webp',
    imageAlt: 'DayZ health ESP bars and skeleton boxes through a closed door',
  },
  'dayz-vehicle-esp': {
    image: '/images/gameplay/dayz-player-esp-multiple-players-distance.webp',
    imageAlt: 'DayZ player ESP showing several players with distance readouts',
  },
  'dayz-loot-esp': {
    image: '/images/gameplay/dayz-loot-esp-player-box.webp',
    imageAlt: 'DayZ loot ESP with item labels and a player box in a village',
  },
  'dayz-esp-traces': {
    image: '/images/gameplay/dayz-esp-multiple-targets-doorway.webp',
    imageAlt: 'DayZ ESP tracking multiple targets outside a doorway',
  },
  'dayz-friends-esp': {
    image: '/images/gameplay/dayz-esp-skeleton-box-doorway.webp',
    imageAlt: 'DayZ ESP skeleton and box on a target at a doorway',
  },
  'dayz-filled-box': {
    image: '/images/gameplay/dayz-esp-players-red-house-skeleton.webp',
    imageAlt: 'DayZ skeleton ESP on players next to a red house',
  },
  'best-dayz-hacks-2026': {
    image: '/images/gameplay/dayz-esp-village-town-labels.webp',
    imageAlt: 'DayZ ESP overlay with player marker and loot labels in a village',
  },
  'dayz-battleye-ban-risk': {
    image: '/images/gameplay/dayz-esp-low-light-skeleton-prone.webp',
    imageAlt: 'DayZ skeleton ESP showing a prone player in low light',
  },
  'dayz-cheat-menu': {
    image: '/images/gameplay/dayz-esp-target-beside-building.webp',
    imageAlt: 'DayZ ESP box on a target beside a red building',
  },
  'dayz-item-in-hands': {
    image: '/images/products/wardogs-menu-visuals.webp',
    imageAlt: 'Steam loader Visuals menu with player ESP rows including inventory',
  },
  'dayz-animal-esp': {
    image: '/images/products/wardogs-menu-world.webp',
    imageAlt: 'Steam loader World menu with animal ESP, vehicles, and helicrash',
  },
  'dayz-aimbot-fov': {
    image: '/images/products/wardogs-menu-aimbot.webp',
    imageAlt: 'Steam loader Aimbot menu: FOV, aim distance, bone, and line to target',
  },
  'dayz-no-clip': {
    image: '/images/products/wardogs-menu-misc.webp',
    imageAlt: 'Steam loader Miscellaneous menu: no clip, crosshair, FPS limit, and config',
  },
  'what-is-an-hwid-spoofer': {
    image: SPOOFER_HERO,
    imageAlt: 'HWID spoofer utility on Windows PC',
  },
  'are-spoofer-and-ugc-necessary': {
    image: UGC_HERO,
    imageAlt: 'UGC account recovery workspace',
  },
  'dayz-cheats-pricing': {
    image: '/images/gameplay/dayz-player-esp-boxes-distance-labels.webp',
    imageAlt: 'DayZ ESP boxes and distance labels on players near a building',
  },
  'how-to-download-dayz': {
    image: '/images/gameplay/dayz-loot-esp-player-box.webp',
    imageAlt: 'DayZ loot ESP with item labels and a player box in a village',
  },
  'what-an-hwid-spoofer-does': {
    image: '/images/gameplay/dayz-esp-village-town-labels.webp',
    imageAlt: 'DayZ ESP overlay with player marker and loot labels in a village',
  },
  'dayz-limit-fps': {
    image: '/images/gameplay/dayz-skeleton-esp-close-range.webp',
    imageAlt: 'DayZ skeleton ESP with boxes at close range',
  },
};

function assertHeroes() {
  const counts = new Map();
  for (const [slug, { image }] of Object.entries(heroBySlug)) {
    if (/-\d+\.webp$/i.test(image) || /phoenix/i.test(image)) {
      throw new Error(`Disallowed hero ${image} on ${slug}`);
    }
    const gameplay = image.startsWith('/images/gameplay/dayz-');
    const allowed = gameplay || MENU_IMAGES.has(image) || image === SPOOFER_HERO || image === UGC_HERO;
    if (!allowed) throw new Error(`Not an allowed hero ${image} on ${slug}`);
    counts.set(image, (counts.get(image) ?? 0) + 1);
  }
  for (const menu of MENU_IMAGES) {
    if (counts.get(menu) !== 1) throw new Error(`Menu ${menu} must be used once, got ${counts.get(menu) ?? 0}`);
  }
  if (counts.get(SPOOFER_HERO) !== 1) throw new Error('Spoofer hero must be used once');
  if (counts.get(UGC_HERO) !== 1) throw new Error('UGC hero must be used once');
  const gameplayCounts = [...counts.entries()].filter(([image]) => image.startsWith('/images/gameplay/dayz-'));
  if (gameplayCounts.length !== 12) {
    throw new Error(`Expected 12 DayZ gameplay files, got ${gameplayCounts.length}`);
  }
  for (const [image, count] of gameplayCounts) {
    if (count > 2) throw new Error(`Gameplay image used more than twice: ${image}`);
  }
}

function formatDateForLocale(locale, dateIso) {
  const tag = localeHtmlLang[locale] ?? 'en-US';
  const d = new Date(`${dateIso}T12:00:00Z`);
  try {
    return new Intl.DateTimeFormat(tag, { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
  } catch {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
  }
}

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

function localeFromPath(filePath) {
  const rel = path.relative(blogDir, filePath);
  const first = rel.split(path.sep)[0];
  return first || 'en';
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
  const hero = heroBySlug[slug];
  const dateIso = dateIsoBySlug[slug];
  if (!hero || !dateIso) return;

  const locale = localeFromPath(filePath);
  const imageChanged = data.image !== hero.image;
  data.image = hero.image;
  if (locale === 'en' || imageChanged || !data.imageAlt) data.imageAlt = hero.imageAlt;
  data.date = formatDateForLocale(locale, dateIso);
  data.dateIso = dateIso;

  const bodyBlocks = data.body;
  const keyOrder = ['tag', 'title', 'seoTitle', 'slug', 'image', 'imageAlt', 'desc', 'date', 'dateIso', 'readTime', 'author'];
  const ordered = {};
  for (const k of keyOrder) {
    if (data[k] !== undefined) ordered[k] = data[k];
  }
  for (const k of Object.keys(data)) {
    if (keyOrder.includes(k) || k === 'body') continue;
    ordered[k] = data[k];
  }
  ordered.body = bodyBlocks;

  const out = `---\n${JSON.stringify(ordered, null, 2)}\n---\n${parts.body}`;
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

assertHeroes();
walk(blogDir);
console.log('Blog heroes: 12 DayZ shots, 4 menus once each, spoofer once, UGC once, gameplay reused at most once.');
