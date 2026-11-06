/**
 * Keep non-default locale codes in sync with src/i18n/config.ts (shipLocales).
 */
export const defaultLocale = 'en';

export const shipLocales = [
  'en',
  'fr',
  'it',
  'de',
  'es',
  'cs',
  'ru',
  'zh-cn',
  'ja',
  'pl',
  'pt-br',
];

export const nonDefaultShipLocales = shipLocales.filter((l) => l !== defaultLocale);

/** Human-readable names for translate.mjs prompts. */
export const langName = {
  fr: 'French',
  it: 'Italian',
  de: 'German',
  es: 'Spanish (Spain)',
  cs: 'Czech',
  ru: 'Russian',
  'zh-cn': 'Simplified Chinese',
  ja: 'Japanese',
  pl: 'Polish',
  'pt-br': 'Portuguese (Brazil)',
};

export function localeFromPathname(pathname) {
  const seg = pathname.split('/').filter(Boolean)[0]?.toLowerCase();
  if (seg && nonDefaultShipLocales.includes(seg)) return seg;
  return defaultLocale;
}
