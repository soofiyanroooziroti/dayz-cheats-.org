import { defaultLocale } from '../../i18n/locales';
import { getBlogPostsForLocale } from './loader';
import type { BlogPostFull } from './types';

/** English posts from src/content/blog/en/*.md (used by i18n export + legacy imports). */
export const blogPosts: BlogPostFull[] = getBlogPostsForLocale(defaultLocale);
