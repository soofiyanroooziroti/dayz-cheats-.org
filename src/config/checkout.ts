import { CHECKOUT_URLS } from './checkout-redirects.mjs';

export const CHECKOUT = CHECKOUT_URLS;

export type CheckoutProduct = keyof typeof CHECKOUT;

export const CHECKOUT_SLUGS: Record<CheckoutProduct, string> = {
  dayz: 'dayz',
  hwidSpoofer: 'hwid-spoofer',
  ugc: 'ugc',
};

export const CHECKOUT_SLUG_TO_PRODUCT = Object.fromEntries(
  Object.entries(CHECKOUT_SLUGS).map(([product, slug]) => [slug, product as CheckoutProduct]),
) as Record<string, CheckoutProduct>;

export function checkoutPath(product: CheckoutProduct = 'dayz'): string {
  return `/go/${CHECKOUT_SLUGS[product]}/`;
}

export const PRIMARY_CHECKOUT_PATH = checkoutPath('dayz');

export function checkoutForSlug(slug: string): string {
  switch (slug) {
    case 'hwid-spoofer':
      return checkoutPath('hwidSpoofer');
    case 'ugc':
    case 'ugc-account-recovery':
      return checkoutPath('ugc');
    case 'dayz-cheats':
    default:
      return checkoutPath('dayz');
  }
}

export function resolveCheckoutHref(href: string): string {
  if (!href.startsWith('http')) {
    return href.startsWith('/') ? href : `/${href}`;
  }

  for (const [product, url] of Object.entries(CHECKOUT) as [CheckoutProduct, string][]) {
    if (href === url || href.startsWith(`${url}?`) || href.startsWith(`${url}/`)) {
      return checkoutPath(product);
    }
  }

  if (href.includes('%2Fproducts%2Fdayz') || href.includes('/products/dayz')) {
    return checkoutPath('dayz');
  }
  if (href.includes('%2Fproducts%2Fhwid-spoofer') || href.includes('/products/hwid-spoofer')) {
    return checkoutPath('hwidSpoofer');
  }
  if (href.includes('%2Fproducts%2Fugc') || href.includes('/products/ugc')) {
    return checkoutPath('ugc');
  }

  return href;
}
