import { getPageSeoForLocale, getTranslations, defaultLocale } from '../i18n';
import type { Locale } from '../i18n/locales';
import { SITE_URL, SITE_DOMAIN as INDEXNOW_HOST_NAME } from './site';

const baseT = getTranslations(defaultLocale);
export const SITE_ORIGIN = SITE_URL;

export const DEFAULT_OG_IMAGE = '/images/products/wardogs-menu-visuals.webp';

export const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID as string | undefined;

export const TWITTER_SITE = import.meta.env.PUBLIC_TWITTER_SITE as string | undefined;

export const TWITTER_CREATOR = import.meta.env.PUBLIC_TWITTER_CREATOR as string | undefined;

export function getOrganizationSameAs(): string[] {
  const raw = import.meta.env.PUBLIC_ORG_SAME_AS as string | undefined;
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export const INDEXNOW_KEY = import.meta.env.INDEXNOW_KEY as string | undefined;

export function canonicalUrl(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function resolvePageSeo(pathname: string, locale?: Locale | null): { title: string; description: string } {
  return getPageSeoForLocale(pathname, locale);
}

/** Truncate by Unicode code points so `.slice` never splits surrogate pairs (emoji). */
function sliceKeywordForTitle(keyword: string, maxCodePoints: number): string {
  if (maxCodePoints <= 0) return '';
  const chars = [...keyword];
  if (chars.length <= maxCodePoints) return keyword;
  return chars.slice(0, maxCodePoints).join('').trimEnd();
}

/** @param brand Pass `null` to omit `| brand` (blog seoTitle already reads as a full title). */
export function pageTitle(keyword: string, brand: string | null = 'hacks'): string {
  const max = 60;
  if (brand === null) {
    const k = keyword.trim();
    if (k.length <= max) return k;
    return sliceKeywordForTitle(k, max).trim();
  }
  const suffix = ` | ${brand}`;
  if (`${keyword}${suffix}`.length <= max) return `${keyword}${suffix}`;
  const trimmed = sliceKeywordForTitle(keyword, Math.max(20, max - suffix.length - 1)).trim();
  return `${trimmed}${suffix}`;
}

export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export const RSS_FEED_PATH = '/rss.xml';

export const INDEXNOW_HOST = INDEXNOW_HOST_NAME;
