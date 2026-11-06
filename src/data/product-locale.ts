import type { Locale } from '../i18n/locales';
import { isLocale } from '../i18n/locales';
import type { ProductFeatureGroup, ProductOverview, ProductSlide, SystemRequirement } from './product-types';
import type { CatalogKind, ProductLocalePack } from './product-locale-types';

export type { CatalogKind, ProductLocalePack } from './product-locale-types';

const packs: Partial<Record<Locale, ProductLocalePack>> = {};

const productLocaleModules = import.meta.glob<{ default: ProductLocalePack }>('../i18n/product/*.json', {
  eager: true,
});

for (const [path, mod] of Object.entries(productLocaleModules)) {
  const match = path.match(/\/product\/([^/]+)\.json$/);
  if (!match) continue;
  const code = match[1];
  if (!isLocale(code)) continue;
  packs[code as Locale] = mod.default;
}

export function acquisitionCopy(locale: Locale, productName: string) {
  const pack = packs[locale];
  if (!pack) return null;
  return {
    title: pack.howToGet.replace('{name}', productName),
    steps: pack.steps.map((step, index) => ({
      num: String(index + 1).padStart(2, '0'),
      title: step.title,
      desc: step.desc,
    })),
  };
}

export function localizeBundle<T extends {
  images: ProductSlide[];
  overview: ProductOverview;
  body: { type: 'h2' | 'p'; text: string }[];
  goodToKnow: string;
  limitations: string;
  systemRequirements: SystemRequirement[];
  featureGroups?: ProductFeatureGroup[];
  fullFeatures: string[];
}>(locale: Locale, kind: CatalogKind, source: T): T {
  const bundle = packs[locale]?.[kind];
  if (!bundle) return source;
  if (source.featureGroups && bundle.groupNames && bundle.descs) {
    const optionCount = source.featureGroups.reduce((sum, group) => sum + group.items.length, 0);
    if (bundle.groupNames.length !== source.featureGroups.length || bundle.descs.length !== optionCount) {
      return source;
    }
  }
  const next = structuredClone(source);
  next.overview = bundle.overview;
  next.body = bundle.body;
  next.goodToKnow = bundle.goodToKnow;
  next.limitations = bundle.limitations;
  if (bundle.slides?.length) {
    const sourceImages = source.images;
    const slideCount = Math.max(sourceImages.length, bundle.slides.length);
    next.images = Array.from({ length: slideCount }, (_, index) => {
      const base = sourceImages[index] ?? sourceImages[sourceImages.length - 1];
      const text = bundle.slides[index] ?? {};
      return {
        ...base,
        ...text,
        src: base?.src ?? sourceImages[0]?.src ?? '',
      };
    });
  }
  next.systemRequirements = next.systemRequirements.map((req, index) => ({
    ...req,
    text: bundle.requirements[index] ?? req.text,
  }));
  if (bundle.features) next.fullFeatures = bundle.features;
  if (next.featureGroups && bundle.descs && bundle.groupNames) {
    const optionCount = next.featureGroups.reduce((sum, group) => sum + group.items.length, 0);
    if (bundle.groupNames.length !== next.featureGroups.length || bundle.descs.length !== optionCount) {
      return next;
    }
    let cursor = 0;
    next.featureGroups = next.featureGroups.map((group, groupIndex) => ({
      ...group,
      name: bundle.groupNames?.[groupIndex] ?? group.name,
      items: group.items.map((item) => ({
        ...item,
        desc: bundle.descs?.[cursor++] ?? item.desc,
      })),
    }));
    if (!bundle.features) {
      next.fullFeatures = next.featureGroups.flatMap((group) => group.items.map((item) => item.name));
    }
  }
  return next;
}
