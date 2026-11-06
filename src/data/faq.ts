import type { IconName } from '../components/icons/types';
import { normalizeInternalPath, productPath, ROUTES, localizedPath, localizedRoutes, cheatPath } from '../utils/path-core';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const cheats = link('DayZ Cheats', productPath('dayz-cheats'));
const productsHub = link('products page', ROUTES.products);
const hwid = link('HWID Spoofer', productPath('hwid-spoofer'));
const ugc = link('UGC Account recovery', productPath('ugc'));

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'status',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Where do I check if the loader is current?',
    a: 'Read dayz-cheats.org after a DayZ or BattlEye update. A banner from yesterday is not a current build. Leave the loader closed until the page matches this client.',
  },
  {
    id: 'season-3',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'Update 1.30 is out. When do I open the loader?',
    a: 'Update 1.30 and Badlands shipped on Steam on October 15, 2026. Read the status page after that client, and after every later hotfix, before you launch. A saved config from an older build is not a current check. A ban is still possible.',
    aHtml: `Update 1.30 and Badlands shipped on Steam on October 15, 2026. Read the ${link('status page', '/status/')} after that client, and after every later hotfix, before you launch. A saved config from an older build is not a current check. A ban is still possible.`,
  },
  {
    id: 'season-2',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'What did Update 1.30 change for the loader menu?',
    a: 'The Steam client added Nasdara, the Jana 50 and Enduro, electronic code locks, a base-upgrade widget, and new inventory icons. The published loader menu is still aimbot, player ESP, infected ESP, world ESP, item ESP, miscellaneous, and config. New bikes fall under Vehicle ESP. They are not extra toggles on this page.',
    aHtml: `The Steam client added Nasdara, the Jana 50 and Enduro, electronic code locks, a base-upgrade widget, and new inventory icons. The published loader menu is still aimbot, player ESP, infected ESP, world ESP, item ESP, miscellaneous, and config. New bikes fall under Vehicle ESP. They are not extra toggles on this page. The ${link('status page', '/status/')} is the note to read before you launch.`,
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: 'Checkout opens the portal with the loader for the product you paid for. Save a config after you tune it. HVCI, core isolation, TPM, and secure boot stay on.',
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can I get banned?',
    a: 'Yes. BattlEye can act on the account. Nothing on this site is a guarantee that a session stays clean.',
  },
  {
    id: 'hwid-ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'What is an HWID flag, and does the cheat key fix it?',
    a: `A hardware flag follows the PC. New accounts can fail on that machine and work on another. That is the ${hwid}, sold separately. It does not undo an account-only restriction, and lifetime on ${cheats} does not include it.`,
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which PCs are supported?',
    a: 'Windows 10 or 11 on Intel or AMD, with HVCI, core isolation, TPM, and secure boot on. macOS and Linux are not supported.',
  },
  {
    id: 'license-move',
    topic: 'products',
    icon: 'faqLicenseMove',
    q: 'Can I move a key to another PC?',
    a: 'Open support with the order email. A machine that fails new accounts is an HWID Spoofer purchase, not a free move of the cheat key.',
  },
  {
    id: 'products-page',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'What is for sale?',
    a: `${cheats}, the ${hwid}, and ${ugc} are listed on the ${productsHub}. DayZ Cheats and UGC are $35 for 31 days or $150 lifetime. The HWID spoofer is $50 for 31 days or $150 lifetime. They are three checkouts.`,
  },
  {
    id: 'plans-same-price',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'Does $150 lifetime include the spoofer?',
    a: 'No. Lifetime on DayZ Cheats is that product only. The HWID spoofer and UGC recovery are separate keys with their own monthly and lifetime prices. A monthly start does not promise a credit toward lifetime.',
    scopes: ['dayz-cheats', 'hwid-spoofer', 'ugc'],
  },
  {
    id: 'aim-vs-camera',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What does Customizable FOV change?',
    a: 'It sets how wide the aim cone is. That control sits under Aimbot Options. FOV Style only changes whether the cone draws as a solid or a gradient.',
    scopes: ['dayz-cheats'],
  },
  {
    id: 'esp-clutter',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'Why does player ESP cover the fight?',
    a: 'Player ESP Options includes box, filled box, head dot, skeleton, health bar, name, distance, inventory, item in hands, and traces. Turn off the labels you are not reading, or lower Max Distance.',
    scopes: ['dayz-cheats'],
  },
  {
    id: 'not-dma',
    topic: 'scripts',
    icon: 'faqExternalLoader',
    q: 'Is this a DMA card?',
    a: 'No. DayZ Cheats is a Windows loader from checkout. A DMA device is a different product and is not what this key delivers. Do not run a file that arrived from a search result.',
    scopes: ['dayz-cheats'],
  },
  {
    id: 'ugc-scope',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'What does UGC Account recovery do?',
    a: `${ugc} is an appeal workspace: templates, evidence lists, and follow-up. It is not a guaranteed unban, and it is not the HWID spoofer.`,
    scopes: ['ugc'],
  },
  {
    id: 'spoofer-scope',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'When is the HWID spoofer the right buy?',
    a: `Use ${hwid} when a new account fails on one PC and works on another. It does not fix an account-only restriction. Buy ${ugc} for that case instead.`,
    scopes: ['hwid-spoofer'],
  },
  {
    id: 'stickiness-vs-smooth',
    topic: 'scripts',
    icon: 'faqExternalLoader',
    q: 'Where do I save the menu after I change it?',
    a: 'Config Options has Save Config and Load Config. Limit FPS and Menu Language (English or Chinese) are in that same group.',
    scopes: ['dayz-cheats'],
  },
  {
    id: 'visible-check',
    topic: 'scripts',
    icon: 'faqWhatIsEsp',
    q: 'Can the aimbot skip infected or animals?',
    a: 'Ignore under Aimbot Options can skip players, infected, animals, or a mix of those. Bone then picks nearest, head, neck, or pelvis.',
    scopes: ['dayz-cheats'],
  },
  {
    id: 'ignore-knocked',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What does the bone setting choose?',
    a: 'Bone under Aimbot Options is nearest, head, neck, or pelvis.',
    scopes: ['dayz-cheats'],
  },
  {
    id: 'bone-and-filter',
    topic: 'scripts',
    icon: 'faqExternalLoader',
    q: 'What is in World ESP Options?',
    a: 'Animal ESP, health as text or a bar, vehicle ESP, and helicrash.',
    scopes: ['dayz-cheats'],
  },
  {
    id: 'controller-binds',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Does the menu include a controller bind?',
    a: 'No. Aimbot Options has toggle, FOV, aim distance, ignore, bone, FOV style, and a line to the target.',
    scopes: ['dayz-cheats'],
  },
  {
    id: 'squad-read',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'How do I mark a player without every label?',
    a: 'Player ESP Options can use a corner box or a full box, a head dot, a skeleton, a name, and a distance. Friends is a separate toggle. Inventory and item in hands are optional.',
    scopes: ['dayz-cheats'],
  },
  {
    id: 'loot-price-floor',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'How do item labels work?',
    a: 'Item ESP Options has item quality, quality as text or a bar, battle mode, and show only when hovering.',
    scopes: ['dayz-cheats'],
  },
  {
    id: 'scale-and-crosshair',
    topic: 'scripts',
    icon: 'faqExternalLoader',
    q: 'Where are the crosshair and third person toggles?',
    a: 'Miscellaneous Options includes a crosshair and thirdperson unlock, plus no clip, always day, local position, and no grass.',
    scopes: ['dayz-cheats'],
  },
  {
    id: 'combat-mode',
    topic: 'scripts',
    icon: 'faqExternalLoader',
    q: 'Does Battle Mode turn the aimbot off?',
    a: 'Battle Mode is under Item ESP Options, next to show only when hovering. Toggle Aimbot is a separate switch under Aimbot Options.',
    scopes: ['dayz-cheats'],
  },
  {
    id: 'encryption-bypass',
    topic: 'setup',
    icon: 'faqStatus',
    q: 'What is in Miscellaneous Options?',
    a: 'No clip, always day, local position, thirdperson unlock, no grass, and a crosshair.',
    scopes: ['dayz-cheats'],
  },
  {
    id: 'blog-default-1',
    topic: 'blog',
    icon: 'faqBlogDefault1',
    q: 'Are blog guides official product documentation?',
    a: `Articles explain workflows and link to ${cheats}. The feature list on that page is the checkout source of truth.`,
  },
  {
    id: 'blog-default-2',
    topic: 'blog',
    icon: 'faqBlogDefault2',
    q: 'Need help applying this guide?',
    a: 'Open support with your order email and the article title. Include the exact loader text if something fails.',
  },
  {
    id: 'blog-default-3',
    topic: 'blog',
    icon: 'faqBlogDefault3',
    q: 'Will settings in this article work next patch?',
    a: 'Re-check after every DayZ or BattlEye update. Reload a saved config instead of copying old slider values from a post.',
  },
  {
    id: 'blog-plan-start',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'Which plan should I start with?',
    a: 'Start with the 31-day key if you want to try one product before paying once. DayZ Cheats and UGC are $35 for 31 days or $150 lifetime. The HWID spoofer is $50 for 31 days or $150 lifetime. A 31-day purchase does not include a credit toward lifetime, and a lifetime key on one product does not include the others.',
  },
  {
    id: 'blog-plan-upgrade',
    topic: 'plans',
    icon: 'faqLicenseMove',
    q: 'Can I upgrade a 31-day key to lifetime?',
    a: 'There is no automatic upgrade. Lifetime is a separate checkout on the same product. The $35 or $50 you already paid is not credited toward the $150 lifetime price.',
  },
  {
    id: 'blog-plan-expire',
    topic: 'plans',
    icon: 'faqAfterBuy',
    q: 'What happens when a plan expires?',
    a: 'A 31-day key stops when that period ends. Buy another 31-day key or a lifetime key on that same product to keep access. Lifetime does not renew. An expired key does not move to a different product.',
  },
  {
    id: 'blog-plan-status',
    topic: 'plans',
    icon: 'faqStatus',
    q: 'Where do I check the current loader status?',
    a: 'Read the status page before you launch. Updated means the note was refreshed. It is not a claim that a session stays clean.',
    aHtml: `Read the ${link('status page', '/status/')} before you launch. Updated means the note was refreshed. It is not a claim that a session stays clean.`,
  },
  {
    id: 'blog-plan-windows',
    topic: 'plans',
    icon: 'faqPlatforms',
    q: 'Which Windows versions are supported?',
    a: 'Windows 10 or 11 on Intel or AMD, with HVCI, core isolation, TPM, and secure boot on. macOS and Linux are not supported.',
  },
  {
    id: 'blog-plan-support',
    topic: 'plans',
    icon: 'faqBlogDefault2',
    q: 'How do support and refunds work?',
    a: 'Open support with your order email. Sales are final once checkout completes. Change-of-mind purchases, account bans, and launches while the status page is not current are not refunded. A fix or refund is only when we confirm a fault on our side. The rules are in the terms.',
    aHtml: `Open ${link('support', '/support/')} with your order email. Sales are final once checkout completes. Change-of-mind purchases, account bans, and launches while the status page is not current are not refunded. A fix or refund is only when we confirm a fault on our side. The rules are in the ${link('terms', '/terms/')}.`,
  },
];

export function getLandingFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) =>
    ['status', 'season-3', 'after-buy', 'ban-risk', 'hwid-ban-risk', 'platforms', 'license-move', 'products-page'].includes(f.id),
  );
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) => f.topic !== 'all');
}

export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Browse by category',
  subtitle: 'Plans, visuals, the loader, the spoofer, UGC, and setup.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'esp',
  'scripts',
  'safety',
  'products',
  'blog',
  'setup',
];

export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers tied to what you are reading—visit the FAQ page for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export function getProductFaqs(slug: string, _kind: 'tier' | 'utility'): SiteFaqItem[] {
  const general = siteFaqs.filter((f) => !f.scopes);
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));
  const combined = [...scoped, ...general];
  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

export function getBlogFaqs(_tag: string, _slug: string): SiteFaqItem[] {
  return siteFaqs.filter(
    (f) => f.id.startsWith('blog-default-') || f.id.startsWith('blog-plan-'),
  );
}

export const compareRows = [
  { feature: 'Aimbot Options', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Player ESP Options', icon: 'compareWardLocator' as const, lite: true, pro: true, elite: true },
  { feature: 'Infected ESP Options', icon: 'compareRuneTimer' as const, lite: true, pro: true, elite: true },
  { feature: 'World ESP Options', icon: 'compareZoomHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Item ESP Options', icon: 'compareStreamproof' as const, lite: true, pro: true, elite: true },
  { feature: 'Miscellaneous Options', icon: 'compareCloudBackup' as const, lite: true, pro: true, elite: true },
  { feature: 'Config Options', icon: 'compareCloudBackup' as const, lite: true, pro: true, elite: true },
];
