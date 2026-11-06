import { defineMiddleware } from 'astro:middleware';
import { resolveCheckoutPathRedirect } from './config/checkout-redirects.mjs';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // Retired Traditional Chinese locale: send everything to Simplified Chinese.
  if (pathname === '/zh-tw' || pathname.startsWith('/zh-tw/')) {
    const tail = pathname === '/zh-tw' ? '/' : pathname.slice('/zh-tw'.length);
    const targetPath = `/zh-cn${tail}`;
    const dest = new URL(targetPath + url.search, url.origin);
    return context.redirect(dest.toString(), 301);
  }

  const destination = resolveCheckoutPathRedirect(pathname);
  if (destination) {
    return context.redirect(destination, 302);
  }
  return next();
});
