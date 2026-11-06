/** Static path redirects (301). Keys are pathname without query/hash. */
export const PATH_REDIRECTS = new Map([
  ['/blog', '/blog/'],
  ['/about', '/about/'],
  ['/contact', '/support/'],
  ['/contact/', '/support/'],
  ['/support', '/support/'],
  ['/privacy', '/privacy/'],
  ['/terms', '/terms/'],
  ['/faq', '/faq/'],
  ['/cheats', '/products/dayz-cheats/'],
  ['/cheats/', '/products/dayz-cheats/'],
  ['/products/dota-2-cheats', '/products/dayz-cheats/'],
  ['/products/dota-2-cheats/', '/products/dayz-cheats/'],
  ['/products/dota-2-cheats/utilities', '/products/dayz-cheats/utilities/'],
  ['/products/dota-2-cheats/utilities/', '/products/dayz-cheats/utilities/'],
  ['/products/dota-2-cheats/account-recovery', '/products/dayz-cheats/ugc/'],
  ['/products/dota-2-cheats/account-recovery/', '/products/dayz-cheats/ugc/'],
  ['/products/dota-2-cheats/elite', '/products/dayz-cheats/dayz-cheats/'],
  ['/products/dota-2-cheats/elite/', '/products/dayz-cheats/dayz-cheats/'],
  ['/products/dayz-cheats/utilities', '/products/dayz-cheats/utilities/'],
  ['/products/dota-2-cheats/lite', '/products/dayz-cheats/dayz-cheats/'],
  ['/products/dota-2-cheats/lite/', '/products/dayz-cheats/dayz-cheats/'],
  ['/products/dota-2-cheats/pro', '/products/dayz-cheats/dayz-cheats/'],
  ['/products/dota-2-cheats/pro/', '/products/dayz-cheats/dayz-cheats/'],
  ['/products/dota-2-cheats/unlock-all', '/products/dayz-cheats/'],
  ['/products/dota-2-cheats/unlock-all/', '/products/dayz-cheats/'],
  ['/products/dota-2-cheats/hwid-spoofer', '/products/dayz-cheats/hwid-spoofer/'],
  ['/products/dota-2-cheats/hwid-spoofer/', '/products/dayz-cheats/hwid-spoofer/'],
  ['/forum/how-to-enable-the-dota-2-console', '/forum/'],
  ['/forum/how-to-enable-the-dota-2-console/', '/forum/'],
  ['/forum/can-custom-lobby-cheat-codes-be-used-in-ranked', '/forum/'],
  ['/forum/can-custom-lobby-cheat-codes-be-used-in-ranked/', '/forum/'],
  ['/forum/what-to-check-after-a-dota-2-patch', '/forum/ace-status-before-launch/'],
  ['/forum/what-to-check-after-a-dota-2-patch/', '/forum/ace-status-before-launch/'],
  ['/forum/dota-2-lite-or-pro-hero-scripts', '/forum/'],
  ['/forum/dota-2-lite-or-pro-hero-scripts/', '/forum/'],
  ['/forum/how-to-choose-dota-2-product-tier', '/forum/lifetime-includes-spoofer/'],
  ['/forum/how-to-choose-dota-2-product-tier/', '/forum/lifetime-includes-spoofer/'],
  ['/blog/dota-2-lite-vs-pro', '/blog/dayz-cheats-pricing/'],
  ['/blog/dota-2-lite-vs-pro/', '/blog/dayz-cheats-pricing/'],
  ['/blogs', '/blog/'],
  ['/blogs/', '/blog/'],
  ['/dayz-cheats', '/products/dayz-cheats/'],
  ['/dayz-cheats/', '/products/dayz-cheats/'],
  ['/reviews', '/forum/'],
  ['/reviews/', '/forum/'],
  ['/refunds', '/terms/'],
  ['/refunds/', '/terms/'],
  ['/features', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/player-esp', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/player-esp/', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/loot-esp', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/loot-esp/', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/vehicle-esp', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/vehicle-esp/', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/infected-esp', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/infected-esp/', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/aimbot', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/aimbot/', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/radar', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/radar/', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/streamproof', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/streamproof/', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/misc', '/products/dayz-cheats/dayz-cheats/#features'],
  ['/features/misc/', '/products/dayz-cheats/dayz-cheats/#features'],
]);

/** Paths that should not receive a forced trailing slash. */
export const TRAILING_SLASH_SKIP = /\.[a-z0-9]+$/i;

export function resolvePathRedirect(pathname) {
  const direct = PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/') && !TRAILING_SLASH_SKIP.test(pathname)) {
    return `${pathname}/`;
  }

  return null;
}
