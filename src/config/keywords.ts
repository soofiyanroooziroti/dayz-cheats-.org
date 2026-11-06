/** Primary keyword per core URL (null = no dedicated keyword). */
export const PAGE_KEYWORDS: Record<string, string | null> = {
  '/': 'dayz cheats',
  '/products/dayz-cheats/': 'cheats for dayz',
  '/products/dayz-cheats/dayz-cheats/': null,
  '/products/dayz-cheats/hwid-spoofer/': null,
  '/products/dayz-cheats/ugc/': 'ugc account recovery',
  '/blog/': null,
};

export const PRODUCT_H1: Record<string, string> = {
  'dayz-cheats': 'DayZ Cheats for Windows PC',
  'hwid-spoofer': 'HWID Spoofer',
  ugc: 'UGC Account recovery',
};

export const PRODUCT_PAGE_KEYWORDS: Record<string, string> = {
  ugc: 'ugc account recovery',
};

/** Reserved for future blog URLs — do not use on core product pages. */
export const RESERVED_BLOG_KEYWORDS = [
  'dayz hacks',
  'hwid spoofer dayz',
  'dayz aimbot',
  'esp',
  'dayz zombie esp',
  'dayz vehicle esp',
  'dayz loot esp',
  'dayz no clip',
  'dayz cheat menu',
] as const;

export function primaryKeywords(): string[] {
  return Object.values(PAGE_KEYWORDS).filter((k): k is string => Boolean(k));
}
