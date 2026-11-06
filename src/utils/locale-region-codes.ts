import type { Locale } from '../i18n/locales';

/**
 * Compact region/market codes (US, FR, CZ, …) — used for flag filenames under `/public/images/flags/`.
 */
export const localeRegionCode: Record<Locale, string> = {
  en: 'US',
  fr: 'FR',
  it: 'IT',
  de: 'DE',
  es: 'ES',
  cs: 'CZ',
  ru: 'RU',
  'zh-cn': 'CN',
  /** Flag asset basename is `jp.svg` (locale code remains `ja`). */
  ja: 'JP',
  pl: 'PL',
  'pt-br': 'BR',
};

/** Public URL for the menu flag image (flat SVG, same basename as localeRegionCode lowercased). */
export function localeFlagSrc(code: Locale): string {
  const key = localeRegionCode[code].toLowerCase();
  return `/images/flags/${key}.svg`;
}
