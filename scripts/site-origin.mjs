/**
 * Canonical site origin for builds (sitemap, robots, verify).
 * Match Astro `site` / `import.meta.env.PUBLIC_SITE_URL` (no trailing slash).
 */
export function getSiteOrigin() {
  const raw =
    process.env.PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    'https://dayz-cheats.org';
  return raw.replace(/\/$/, '');
}
