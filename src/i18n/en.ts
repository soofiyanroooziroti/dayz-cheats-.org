import type { Translations } from './types';
import { PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import { PRODUCT_BASE } from '../config/site';
import { productPath } from '../utils/path-core';

const productBase = PRODUCT_BASE;
const dayzFeaturesHref = `${productPath('dayz-cheats')}#features`;

export const en: Translations = {
  site: {
    name: 'DayZ cheats',
    domain: 'dayz-cheats.org',
    title: 'DayZ cheats',
    description:
      'Aimbot, player ESP, infected ESP, world ESP, item ESP, and config for DayZ on Windows PC.',
    discord: PRIMARY_CHECKOUT_PATH,
  },
  nav: [
    { href: '/', label: 'Home' },
    { href: `${productBase}`, label: 'Products' },
    { href: dayzFeaturesHref, label: 'Features' },
    { href: '/blog/', label: 'Blog' },
    { href: '/forum/', label: 'Forum' },
    { href: '/faq/', label: 'FAQ' },
    { href: '/support/', label: 'Support' },
  ],
  headerNavLabels: {
    home: 'Home',
    products: 'Store',
    features: 'Features',
    blog: 'Blog',
    forum: 'Forum',
    faq: 'FAQ',
    support: 'Help',
  },
  navMore: 'More',
  navShort: {
    home: 'Home',
    products: 'Products',
    features: 'Features',
    blog: 'Blog',
    forum: 'Forum',
    faq: 'FAQ',
    support: 'Support',
  },
  hero: {
    status: 'DayZ — modules online',
    eyebrow: 'Steam · Windows PC',
    titleLine1: 'DayZ Cheats for Windows PC',
    titleLine2: 'Cheats',
    subtitle:
      'DayZ cheats for Steam on Windows PC: aimbot, player ESP, infected ESP, world ESP, item ESP, and config, with instant delivery and Discord support.',
    ctaPrimary: 'View products',
    ctaDiscord: 'Buy now',
    modesLabel: 'Modes',
    modes: ['Survival', 'PvP', 'Base raids', 'Loot runs'],
    marqueeAria: 'Features and platform support',
    metrics: [
      { label: 'Anti-cheat', strong: 'BattlEye' },
      { label: 'Platform', strong: 'Windows PC' },
      { label: 'Plans', strong: '$35 / $150' },
      { label: 'Support', strong: '24/7' },
    ],
  },
  features: {
    eyebrow: 'Features',
    title: 'Everything you need in one package',
    subtitle: 'The loader menu: aimbot, player ESP, infected ESP, world ESP, item ESP, miscellaneous, and config.',
    items: [
      {
        title: 'Aimbot Options',
        subtitle: 'FOV, distance, bone, ignore.',
        desc: 'Toggle, FOV, aim distance, ignore players or infected or animals, bone, FOV style, and a line to the target.',
        bullets: ['Toggle Aimbot', 'Customizable FOV and aim distance', 'Bone: nearest, head, neck, pelvis'],
        tags: ['aimbot', 'fov', 'bone'],
        bento: 'sm:col-span-2 lg:col-span-6',
      },
      {
        title: 'Player ESP Options',
        subtitle: 'Box, skeleton, inventory.',
        desc: 'Enable, friends, box, filled box, head dot, skeleton, health, name, distance, inventory, item in hands, traces, and max distance.',
        bullets: ['Box or corner box', 'Inventory and item in hands', 'Max distance'],
        tags: ['player esp', 'skeleton', 'inventory'],
        bento: 'sm:col-span-2 lg:col-span-6',
      },
      {
        title: 'Infected ESP Options',
        subtitle: 'Zombie overlays.',
        desc: 'Enable, box, filled box, head dot, skeleton, health, name, distance, traces, and max distance for infected.',
        bullets: ['Enable and box options', 'Skeleton, health, and distance', 'Max distance'],
        tags: ['infected', 'zombie', 'esp'],
        bento: 'sm:col-span-2 lg:col-span-4',
      },
      {
        title: 'World ESP Options',
        subtitle: 'Animals, vehicles, helicrash.',
        desc: 'Animal ESP, health as text or a bar, vehicle ESP, and helicrash markers.',
        bullets: ['Animal ESP', 'Vehicle ESP', 'Helicrash'],
        tags: ['world', 'vehicle', 'helicrash'],
        bento: 'sm:col-span-2 lg:col-span-4',
      },
      {
        title: 'Item ESP Options',
        subtitle: 'Quality and battle mode.',
        desc: 'Item quality, quality as text or a bar, battle mode, and show only when hovering.',
        bullets: ['Item quality', 'Battle mode', 'Show only when hovering'],
        tags: ['items', 'quality'],
        bento: 'sm:col-span-2 lg:col-span-4',
      },
      {
        title: 'Miscellaneous Options',
        subtitle: 'No clip, day, grass, crosshair.',
        desc: 'No clip, always day, local position, thirdperson unlock, no grass, and a crosshair.',
        bullets: ['No clip and always day', 'Thirdperson unlock', 'No grass and crosshair'],
        tags: ['misc', 'crosshair'],
        bento: 'sm:col-span-2 lg:col-span-6',
      },
      {
        title: 'Config Options',
        subtitle: 'FPS, language, save and load.',
        desc: 'Limit FPS, menu language in English or Chinese, save config, and load config.',
        bullets: ['Limit FPS', 'English or Chinese menu', 'Save and load config'],
        tags: ['config', 'fps'],
        bento: 'sm:col-span-2 lg:col-span-6',
      },
    ],
  },
  whyUs: {
    eyebrow: 'Why us',
    title: 'Ranked tooling backed by patches—not promises',
    subtitle:
      'One cheat product, one HWID spoofer, and one UGC recovery workspace. Cheat and UGC are $35 monthly or $150 lifetime; the spoofer is $50 monthly or $150 lifetime. A ban is still possible under BattlEye.',
    usLabel: 'DayZ Cheats',
    otherLabel: 'Typical provider',
    rows: [
      {
        title: 'Patch-day loader updates',
        desc: 'Check dayz-cheats.org after a DayZ or BattlEye update before you open the loader.',
      },
      {
        title: 'Separate aim sliders',
        desc: 'FOV, aim distance, ignore, and bone are separate aimbot settings. Change one at a time, then use Save Config.',
      },
      {
        title: 'Loader and config help',
        desc: 'Setup questions cover the Windows loader, saved configs, and which product matches a hardware flag versus an account case.',
      },
      {
        title: 'Separate product checkouts',
        desc: 'The cheat, the HWID spoofer, and UGC recovery stay separate checkouts. Lifetime on the cheat does not add the spoofer.',
      },
      {
        title: 'Saved configs',
        desc: 'Save Config and Load Config keep the aimbot, ESP, miscellaneous, and menu language settings for the next launch.',
      },
      {
        title: 'HWID is its own product',
        desc: 'A machine that fails new accounts is the spoofer case. An account-only restriction is the UGC case. Neither is included with the cheat key.',
      },
    ],
    metrics: [
      {
        value: 'BattlEye',
        title: 'Check after a patch',
        desc: 'Recheck the site after a DayZ or BattlEye update before you launch.',
      },
      {
        value: '2',
        title: 'Plans on every card',
        desc: 'Cheat and UGC monthly is $35 for 31 days. Spoofer monthly is $50. Lifetime is $150 per product. There is no weekly plan.',
      },
      {
        value: '3',
        title: 'Separate products',
        desc: 'DayZ Cheats, the HWID spoofer, and UGC recovery. Each one is its own key.',
      },
    ],
  },
  setup: {
    eyebrow: 'Setup guide',
    titleLead: 'From checkout to your first server in just',
    titleHighlight: 'three simple steps',
    intro:
      'Getting started is checkout, the portal loader, then a saved config. Check the site after a BattlEye update before you launch DayZ.',
    ctaPrimary: 'View products',
    ctaSecondary: 'Setup FAQ',
    ctaPrimaryHref: productBase,
    ctaSecondaryHref: '/faq/',
    statusStrip: {
      aceStatusCta: 'Check BattlEye status',
      aceStatusHref: '/status/',
      perks: [
        { icon: 'instantDelivery', label: 'Instant delivery' },
        { icon: 'support247', label: '24/7 support' },
        { icon: 'refresh', label: 'Lifetime updates' },
      ],
    },
    steps: [
      {
        step: 'Step 1',
        title: 'Unlock portal & download loader',
        desc: 'Complete checkout, open your operator dashboard, and pull the latest patch loader build for Windows.',
      },
      {
        step: 'Step 2',
        title: 'Launch & configure modules',
        desc: 'Run the loader, then set aimbot, player ESP, infected ESP, world ESP, item ESP, and miscellaneous options one group at a time.',
      },
      {
        step: 'Step 3',
        title: 'Check status, then launch',
        desc: 'Confirm the site is current for this client, then open DayZ with the config you saved.',
      },
    ],
  },
  compatibility: {
    eyebrow: 'Platform support',
    title: 'Runs on your rig.',
    subtitle: 'Check the site after a DayZ or BattlEye update before you launch.',
    items: ['Windows 10 & 11', 'Intel or AMD', 'HVCI on', 'Core isolation on', 'TPM on', 'Secure boot on', 'Discord support', 'Config save'],
  },
  cheats: {
    eyebrow: 'Game cheat',
    title: 'DayZ Cheats',
    subtitle: 'Aimbot, player ESP, infected ESP, world ESP, item ESP, and config.',
    viewAll: 'View details',
    explore: 'Explore',
    items: [
      {
        badge: 'Active',
        tier: 'Full suite',
        name: 'DayZ',
        title: 'DayZ Cheats',
        desc: 'DayZ Cheats for Steam—aimbot, player ESP, infected ESP, world ESP, item ESP, and config.',
        features: [
          'Aimbot Options',
          'Player ESP Options',
          'Infected ESP Options',
          'World ESP Options',
          'Item ESP Options',
          'Miscellaneous Options',
          'Config Options',
        ],
        more: 0,
        href: `${productBase}dayz-cheats/`,
        variant: 'popular',
      },
    ],
  },
  products: {
    eyebrow: 'Products',
    title: 'Products & pricing',
    subtitle: 'DayZ Cheats and UGC: $35/mo or $150 lifetime. HWID spoofer: $50/mo or $150 lifetime.',
    viewAll: 'View details',
    get: 'Buy now',
    explore: 'Explore',
    items: [
      {
        badge: 'Active',
        category: 'HWID spoofer',
        title: 'HWID Spoofer',
        subtitle: 'Hardware ID recovery',
        desc: 'HWID spoofer with cleaner—rotate disk, MAC, and GPU IDs before relaunching after hardware flags.',
        features: ['Hardware spoofer + cleaner', 'Compatibility scan', 'Verification steps', 'Portal workflow'],
        more: 4,
        href: `${productBase}hwid-spoofer/`,
      },
      {
        badge: 'Active',
        category: 'UGC Account recovery',
        title: 'UGC Account recovery',
        subtitle: 'Appeals & recovery',
        desc: 'UGC Account recovery workspace—custom appeal workflows, templates, and restriction tracking.',
        features: ['Custom appeal workflows', 'Multi-platform profiles', 'Template library', 'Status dashboard'],
        more: 4,
        href: `${productBase}ugc/`,
      },
    ],
  },
  blog: {
    eyebrow: 'Blog',
    title: 'Guides and updates',
    subtitle: 'Setup notes, aimbot and ESP guides, and pricing answers for DayZ on Windows PC.',
    latestTitle: 'Latest DayZ cheat guides',
    latestSubtitle: 'Filter by topic or sort to find setup guides, feature deep-dives, and patch-day notes.',
    filterAll: 'All articles',
    sortLabel: 'Sort by',
    sortNewest: 'Newest first',
    sortOldest: 'Oldest first',
    sortShortRead: 'Shortest read',
    sortLongRead: 'Longest read',
    emptyFilter: 'No articles match this filter.',
    emptyCatalog: 'No guides are listed in this view. Open a topic filter or the product page.',
    viewAll: 'View all articles',
    read: 'Read',
    items: [],
  },
  toolkit: {
    eyebrow: 'Software',
    title: 'Organized, easy to configure',
    subtitle: 'Every module is grouped for quick tuning mid-match without tabbing through chaos.',
    items: [
      { num: '01', label: 'Aimbot', title: 'Aimbot Options', desc: 'Toggle, FOV, aim distance, ignore players or infected or animals, bone, FOV style, and a line to the target.' },
      { num: '02', label: 'Players', title: 'Player ESP Options', desc: 'Enable, friends, box, filled box, head dot, skeleton, health, name, distance, inventory, item in hands, traces, and max distance.' },
      {
        num: '03',
        label: 'Infected',
        title: 'Infected ESP Options',
        desc: 'Enable, box, skeleton, health, name, distance, traces, and max distance for infected.',
      },
      { num: '04', label: 'World', title: 'World ESP Options', desc: 'Animal ESP, health as text or a bar, vehicle ESP, and helicrash.' },
      { num: '05', label: 'Items', title: 'Item ESP Options', desc: 'Item quality, quality as text or a bar, battle mode, and show only when hovering.' },
      { num: '06', label: 'Misc', title: 'Miscellaneous Options', desc: 'No clip, always day, local position, thirdperson unlock, no grass, and a crosshair.' },
      { num: '07', label: 'Config', title: 'Config Options', desc: 'Limit FPS, menu language in English or Chinese, save config, and load config.' },
    ],
  },
  workflow: {
    eyebrow: 'How it works',
    badge: '4 easy steps',
    titleBefore: 'From status check to',
    titleHighlight: 'saved profile.',
    subtitle: 'A straight path from a status check to a saved DayZ config.',
    ctaLabel: 'View products',
    ctaHref: productBase,
    ctaSecondary: 'Setup FAQ',
    ctaSecondaryHref: '/faq/',
    items: [
      {
        num: '01',
        phase: 'Before purchase',
        title: 'Check BattlEye status',
        desc: 'Read dayz-cheats.org after a client or BattlEye update before you buy or launch.',
      },
      {
        num: '02',
        phase: 'Checkout',
        title: 'Choose the product',
        desc: 'DayZ Cheats or UGC: $35 monthly or $150 lifetime. HWID Spoofer: $50 monthly or $150 lifetime. Separate keys.',
      },
      {
        num: '03',
        phase: 'Loader',
        title: 'Launch & configure',
        desc: 'Download from the portal. Leave HVCI, core isolation, TPM, and secure boot on.',
      },
      {
        num: '04',
        phase: 'In-game',
        title: 'Save your profile',
        desc: 'When the aim cone and the ESP labels feel right, save the config.',
      },
    ],
  },
  fieldNotes: {
    eyebrow: 'Field notes',
    title: 'Built for DayZ on Windows PC.',
    items: [
      { num: '01', title: 'Patch-day check', desc: 'Read the site after a BattlEye or client update. A banner from yesterday is not a current build.' },
      { num: '02', title: 'One slider at a time', desc: 'Change FOV, smooth, or distance alone so you know which setting caused the pull or the clutter.' },
      { num: '03', title: 'Separate products', desc: 'The cheat, the HWID spoofer, and UGC recovery are three checkouts. Lifetime on one does not unlock the others.' },
    ],
  },
  support: {
    eyebrow: 'Support',
    title: 'DayZ support',
    subtitle: 'Let us know how we can help.',
    channels: [
      {
        icon: 'users',
        title: 'Chat before checkout',
        desc: 'Ask about the cheat, the spoofer, or UGC before you pay.',
        linkLabel: 'Start checkout',
        href: PRIMARY_CHECKOUT_PATH,
      },
      {
        icon: 'messageCircle',
        title: 'Community forum',
        desc: 'Setup, aim, ESP, and plan questions with marked developer replies.',
        linkLabel: 'Open the forum',
        href: '/forum/',
      },
      {
        icon: 'navFaq',
        title: 'Read the FAQ',
        desc: 'Compatibility, bans and setup—before you buy.',
        linkLabel: 'View all FAQ',
        href: '/faq/',
      },
      {
        icon: 'clock',
        title: 'Live operators',
        desc: 'Discord engineers on shift 24/7.',
        linkLabel: 'Open contact page',
        href: '/support/',
      },
    ],
    ticketTitle: 'Include in your ticket',
    ticketItems: [
      { title: 'Order email', desc: 'The address used at checkout on dayz-cheats.org.' },
      { title: 'Platform', desc: 'Windows 10 or 11, and whether HVCI, core isolation, TPM, and secure boot are on.' },
      { title: 'Error detail', desc: 'The exact loader message, not a paraphrase.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Straight answers before checkout.',
    subtitle: 'Compatibility, bans and access—no vague promises.',
    items: [
      {
        num: '01',
        q: 'Where do I check if DayZ Cheats are online?',
        a: 'Read dayz-cheats.org after a DayZ or BattlEye update. A banner from yesterday is not a current build.',
      },
      {
        num: '02',
        q: 'What happens after I buy?',
        a: 'Checkout opens the portal with the loader. Save a config after you tune aim and visuals. Leave HVCI, core isolation, TPM, and secure boot on.',
      },
      {
        num: '03',
        q: 'Can I get banned using DayZ Cheats?',
        a: 'Yes. BattlEye can act on the account. Nothing on this site is a guarantee that a session stays clean.',
      },
      {
        num: '04',
        q: 'Which platforms are supported?',
        a: 'Windows 10 or 11 on Intel or AMD, with HVCI, core isolation, TPM, and secure boot on. macOS and Linux are not supported.',
      },
      {
        num: '05',
        q: 'Can I move my license to a new PC?',
        a: 'A hardware flag is the HWID Spoofer, sold separately. Open a support ticket with the order email if the same key needs another PC.',
      },
      {
        num: '06',
        q: 'Where are products and utilities listed?',
        a: 'DayZ Cheats and UGC are $35 monthly or $150 lifetime. The HWID spoofer is $50 monthly or $150 lifetime. All three are on the products page.',
      },
    ],
  },
  footer: {
    tagline: 'DayZ Cheats, HWID spoofer, and UGC recovery for Windows PC. dayz-cheats.org',
    explore: 'Explore',
    exploreLinks: [
      { href: '/products/dayz-cheats/dayz-cheats/#features', label: 'Feature overview', ariaLabel: 'Features' },
      { href: '/products/dayz-cheats/dayz-cheats/', label: 'DayZ Cheats', ariaLabel: 'DayZ Cheats' },
      { href: '/products/dayz-cheats/', label: 'All products', ariaLabel: 'Products' },
      { href: '/blog/', label: 'Read patch guides', ariaLabel: 'Blog' },
      { href: '/faq/', label: 'Pre-purchase FAQ', ariaLabel: 'FAQ' },
    ],
    support: 'Support',
    legal: 'Legal',
    moreSites: 'More sites',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    about: 'About',
  },
  legalPages: {
    about: {
      title: 'About this DayZ store',
      description:
        'dayz-cheats.org sells DayZ Cheats, an HWID spoofer, and UGC account recovery for Windows PC, with setup notes and honest ban risk.',
      sections: [
        {
          heading: 'Who we are',
          paragraphs: [
            'dayz-cheats.org is a Windows PC store for DayZ Cheats, an HWID spoofer, and UGC account recovery. The cheat is one product: aimbot, player ESP, infected ESP, world ESP, item ESP, miscellaneous, and config. It is not a ladder of Lite, Pro, and Elite tiers, and it is not a DMA card.',
            'DayZ Cheats and UGC checkout at $35 for 31 days or $150 lifetime. The HWID spoofer is $50 for 31 days or $150 lifetime. A lifetime key on the cheat does not include the spoofer or the recovery workspace. Starting on a month does not promise a credit toward lifetime.',
            'Product names on this site identify what we sell. They are not a claim that the game publisher endorses the software. Delivery is a portal download for Windows 10 or 11. You keep HVCI, core isolation, TPM, and secure boot on, then open the loader only when the site still matches the current client.',
          ],
        },
        {
          heading: 'What we publish',
          paragraphs: [
            'The [DayZ Cheats](/products/dayz-cheats/dayz-cheats/) page lists the menu names and the Windows requirements: Windows 10 or 11, Intel or AMD, with HVCI, core isolation, TPM, and secure boot left on. The [products page](/products/dayz-cheats/) is where you compare the cheat, the [HWID Spoofer](/products/dayz-cheats/hwid-spoofer/), and [UGC Account recovery](/products/dayz-cheats/ugc/).',
            'Guides on the [blog](/blog/) explain aim FOV versus camera FOV, how loot filters work, and why a hardware flag is a different buy from an account appeal. The [forum](/forum/) is for those same questions, with developer replies marked on the thread. Read the [terms](/terms/) before checkout. Sales are final, including bans.',
            'BattlEye can still act on an account. Nothing here is a guarantee that a session stays clean after the next patch. Check this site after a client update before you open the loader. If the page is not current for that build, leave the software closed.',
            'Status notes on the homepage describe whether the published build still matches the client. They are not a promise that BattlEye will ignore the software. If you are unsure, leave the loader closed and read the matching guide on the blog before you queue again.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'Loader errors, a key that will not move, and checkout questions go through the [support page](/support/). Include the order email, Windows version, and the exact loader text. Do not turn HVCI, core isolation, TPM, or secure boot off because a chat message from another game said to.',
          ],
        },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      description:
        'How dayz-cheats.org handles analytics, cookies, and contact data.',
      sections: [
        {
          heading: 'Information we collect',
          paragraphs: [
            'We may collect standard web analytics such as page views, device type, browser, and approximate region through Google Analytics when enabled. Checkout and license delivery happen on external checkout pages. We do not store payment card data on dayz-cheats.org.',
          ],
        },
        {
          heading: 'How we use data',
          paragraphs: [
            'Analytics help us understand which guides and product pages are useful so we can improve content and fix broken links. Support tickets may retain the email address and message content you provide until the issue is resolved.',
          ],
        },
        {
          heading: 'Cookies',
          paragraphs: [
            'We use minimal cookies required for analytics. You can block cookies in your browser settings; core site content remains accessible without them.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For privacy questions, use the options on the Support page. Purchase and refund rules are in our Terms & Conditions.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions',
      description:
        'Purchase, license, refund, and use terms for products sold on dayz-cheats.org.',
      sections: [
        {
          heading: 'Agreement',
          paragraphs: [
            'Last updated: October 2026. By using dayz-cheats.org or completing checkout for any product listed here, you agree to these Terms & Conditions and our Privacy Policy.',
          ],
        },
        {
          heading: 'What you purchase',
          paragraphs: [
            'We sell DayZ Cheats, an HWID spoofer, and UGC account recovery. Cheat and UGC are $35 for 31 days or $150 lifetime; the spoofer is $50 for 31 days or $150 lifetime. Each product is its own license through the portal on Windows PC.',
            'Feature lists on each product page describe what is included at the time of purchase. Modules can change when DayZ or BattlEye updates. A lifetime cheat key does not include the spoofer or UGC.',
          ],
        },
        {
          heading: 'Checkout and delivery',
          paragraphs: [
            'Payment and license delivery run on external checkout pages. dayz-cheats.org does not process or store payment card numbers.',
            'After purchase, use the portal from your order to download the current loader before you launch DayZ. Leave HVCI, core isolation, TPM, and secure boot on.',
          ],
        },
        {
          heading: 'License use',
          paragraphs: [
            'Licenses are for your personal use only. Do not share loader files, portal logins, or license keys. A hardware-ID problem is a separate HWID Spoofer purchase.',
          ],
        },
        {
          heading: 'Refunds and purchases',
          paragraphs: [
            'All sales are final once checkout completes. We do not refund change-of-mind purchases, account bans, BattlEye penalties, or issues caused by ignoring the setup notes or launching while the site is not current for that patch.',
            'If the product does not work as described on a supported setup—Windows 10 or 11 with HVCI, core isolation, TPM, and secure boot on, and the current loader from the portal—contact us through the Support page. Include your order email, Windows version, and the exact loader text.',
            'We may, at our discretion, offer a fix, replacement access, or partial/full refund when we confirm a fault on our side. We are not obligated to approve every request.',
          ],
        },
        {
          heading: 'Availability and risk',
          paragraphs: [
            'Third-party tools for DayZ can conflict with game updates and BattlEye. You use this software at your own risk, including possible account action.',
            'Check the homepage status banner before every session. Do not join your main server while modules are offline or misaligned after a patch.',
          ],
        },
        {
          heading: 'Changes',
          paragraphs: [
            'We may update these terms. The “Last updated” date at the top will change when we do. Continued use of the site after changes means you accept the revised terms.',
          ],
        },
        {
          heading: 'Support',
          paragraphs: [
            'For terms, billing, or loader questions, use the buttons on the Support page. See also our Privacy Policy for how we handle site data.',
          ],
        },
      ],
    },
    support: {
      title: 'DayZ support',
      description:
        'Loader, HWID spoofer, UGC, and checkout help for dayz-cheats.org.',
    },
  },
  productCatalog: {
    searchHeading: 'Browse products and plans',
    utilityCategory: 'Utility',
    buyLoader: 'Buy the loader',
    buyHwidSpoofer: 'Buy the HWID spoofer',
    buyUgcRecovery: 'Buy UGC recovery',
  },
  utilitiesPage: {
    title: 'Compare utilities',
    subtitle:
      'HWID Spoofer and UGC Account recovery solve different problems. Match the tool to the PC or the account before checkout.',
    breadcrumb: 'Compare utilities',
    tableAria: 'Utility comparison',
    columnUtility: 'Utility',
    columnBestFor: 'Best for',
    columnProductPage: 'Product page',
    includesLabel: 'Includes:',
    backToProducts: 'Back to products',
    viewCategory: 'View {category}',
    viewDetailsFallback: 'details',
    schemaName: 'Compare DayZ utilities',
    useCases: {
      'hwid-spoofer':
        'New PC or hardware flag after a ban—reset how your machine appears before a new account.',
      ugc: 'Structured appeal and account recovery workflows when access is restricted.',
    },
  },
  sectionSearch: {
    blogHeading: 'Filter guides by topic',
    supportHeading: 'Browse help topics',
  },
  ui: {
    skipLink: 'Skip to main content',
    browseCheats: 'Try Now',
    browseCheatsMobile: 'Start checkout',
    homeAria: 'DayZ Cheats home',
    checkoutAria: 'Start checkout',
    discordAria: 'Buy DayZ Cheats',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    themeLight: 'Switch to light mode',
    themeDark: 'Switch to dark mode',
    searchPlaceholder: 'Search products, guides, FAQ…',
    searchEmpty: 'Type to search the site.',
    searchNoResults: 'No results. Try another term.',
    searchCloseAria: 'Close search',
    searchTitle: 'Search',
    searchOpenAria: 'Search site',
    contactSupport: 'Contact support',
    searchResultsAria: 'Search results',
    searchHintNavigate: 'navigate',
    searchHintOpen: 'open',
    searchHintClose: 'close',
    searchKeyboardEnter: 'Enter',
    searchKeyboardEsc: 'Esc',
    primaryNavAria: 'Primary',
    mobileNavAria: 'Mobile',
    shareNavAria: 'Share this page',
    shareOnX: 'Share on X',
    shareOnFacebook: 'Share on Facebook',
    shareOnReddit: 'Share on Reddit',
    prevImage: 'Previous image',
    nextImage: 'Next image',
    heroSlidesAria: 'Hero slides',
    slideLabel: 'Slide {n}',
    prevScreenshot: 'Previous screenshot',
    nextScreenshot: 'Next screenshot',
    loading: 'Loading',
  },
};

/** Core English copy — full site bundle is buildEnBundle() in en-bundle.ts. */
export type EnSource = typeof en;
