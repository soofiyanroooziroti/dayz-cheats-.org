import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { sitemapSerialize } from './src/config/sitemap.ts';
import { shipLocales } from './scripts/locale-ship.mjs';

/** Shown in HTML + used to bust search-index cache after deploy. */
const SITE_BUILD_ID =
  process.env.SITE_BUILD_ID ??
  new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

const SITE_URL =
  (process.env.PUBLIC_SITE_URL || process.env.SITE_URL || 'https://dayz-cheats.org').trim().replace(
    /\/$/,
    '',
  );

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: [...shipLocales],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/go/'),
      serialize: sitemapSerialize,
    }),
  ],
  vite: {
    define: {
      'import.meta.env.PUBLIC_SITE_BUILD_ID': JSON.stringify(SITE_BUILD_ID),
    },
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
      minify: 'esbuild',
      target: 'es2022',
      sourcemap: false,
      modulePreload: { polyfill: false },
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
