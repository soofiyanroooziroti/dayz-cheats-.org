const LOCALE_PREFIX = /^\/(fr|tr|pt-br|es|de|pl|th)(?=\/|$)/;

function barePath(pathname: string): string {
  const stripped = pathname.replace(LOCALE_PREFIX, '') || '/';
  if (stripped === '/') return '/';
  return stripped.endsWith('/') ? stripped : `${stripped}/`;
}

/** One descriptive alt per audited URL so the logo is not an empty image. */
export function logoAltForPath(pathname: string): string {
  const path = barePath(pathname);

  if (path === '/') return 'DayZ Cheats – logo';
  if (path === '/products/dayz-cheats/') return 'DayZ – logo';
  if (path === '/products/dayz-cheats/dayz-cheats/') return 'Player Esp – logo';
  if (path === '/blog/') return 'Guides – logo';
  if (path === '/forum/') return 'Forum – logo';
  if (path === '/faq/') return 'Faq – logo';
  if (path === '/support/') return 'Support – logo';
  return 'DayZ Cheats logo';
}
