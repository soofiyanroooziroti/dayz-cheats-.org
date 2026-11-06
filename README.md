# dayz-cheats-.org

Astro static site for DayZ Cheats (dayz-cheats.org): i18n, products, blog, forum, FAQ, checkout.

## Commands

```bash
npm install
npm run build
npm run verify
```

## Site URL (canonical / sitemap)

Build with the **canonical origin** you want in HTML and `dist/sitemap.xml` (no trailing slash). Example for the Workers preview host:

```bash
export PUBLIC_SITE_URL=https://dayz-cheats-org.soofiyanroooziroti.workers.dev
npm run build
```

`scripts/finalize-sitemap.mjs` rewrites `<loc>` URLs and the `Sitemap:` line in `dist/robots.txt` to match. Production can use `https://dayz-cheats.org` the same way.
