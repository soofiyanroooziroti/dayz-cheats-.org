function normalizeSiteUrl(input: string): { url: string; host: string } {
  const trimmed = input.trim().replace(/\/+$/, '');
  const url = new URL(trimmed.includes('://') ? trimmed : `https://${trimmed}`);
  return { url: url.origin, host: url.hostname };
}

const fromEnv = import.meta.env.PUBLIC_SITE_URL?.trim();
const fallback = 'https://dayz-cheats.org';
const resolved = normalizeSiteUrl(fromEnv || fallback);

/** Public origin (https://…), no trailing slash — drives canonical, hreflang, sitemap. */
export const SITE_URL = resolved.url;
/** Hostname only — IndexNow, cookies, etc. */
export const SITE_DOMAIN = resolved.host;
export const PRODUCT_BASE = '/products/dayz-cheats/';
export const TITLE_PREFIX = 'DayZ cheats';
export const SUPPORT_EMAIL = '';
export const DISCORD_INVITE_URL = 'https://discord.com/invite/2gMnnaPWq';
