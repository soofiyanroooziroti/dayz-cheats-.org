/** Checkout destinations (Zadeyo affiliate). */
export const CHECKOUT_URLS = {
  dayz: 'https://zadeyo.com/go/SOOFIYAN?to=%2Fproducts%2Fdayz',
  hwidSpoofer: 'https://zadeyo.com/go/SOOFIYAN?to=%2Fproducts%2Fhwid-spoofer',
  ugc: 'https://zadeyo.com/go/SOOFIYAN?to=%2Fproducts%2Fugc',
};

export const DISCORD_INVITE_URL = 'https://discord.com/invite/2gMnnaPWq';

export const CHECKOUT_PATH_REDIRECTS = new Map([
  ['/go/discord', DISCORD_INVITE_URL],
  ['/go/discord/', DISCORD_INVITE_URL],
  ['/go/dayz', CHECKOUT_URLS.dayz],
  ['/go/dayz/', CHECKOUT_URLS.dayz],
  ['/go/delta-force', CHECKOUT_URLS.dayz],
  ['/go/delta-force/', CHECKOUT_URLS.dayz],
  ['/go/hwid-spoofer', CHECKOUT_URLS.hwidSpoofer],
  ['/go/hwid-spoofer/', CHECKOUT_URLS.hwidSpoofer],
  ['/go/ugc', CHECKOUT_URLS.ugc],
  ['/go/ugc/', CHECKOUT_URLS.ugc],
]);

export function resolveCheckoutPathRedirect(pathname) {
  const direct = CHECKOUT_PATH_REDIRECTS.get(pathname);
  if (direct) return direct;

  if (pathname !== '/' && !pathname.endsWith('/')) {
    return CHECKOUT_PATH_REDIRECTS.get(`${pathname}/`) ?? null;
  }

  return null;
}
