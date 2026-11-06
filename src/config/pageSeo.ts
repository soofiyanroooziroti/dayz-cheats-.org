export interface PageSeoEntry {
  title: string;
  description: string;
}

export const PAGE_SEO: Record<string, PageSeoEntry> = {
  '/': {
    title: 'DayZ Cheats for Windows PC | ESP, Aimbot & Pricing',
    description:
      'Aimbot, player ESP, infected ESP, world ESP, and item ESP for DayZ on Windows PC. Prices and a dated status note. Each product checks out on its own.',
  },
  '/products/dayz-cheats/': {
    title: 'Cheats for DayZ | Monthly and Lifetime Plans',
    description:
      'Cheats for DayZ on Steam: cheat and UGC at $35 monthly or $150 lifetime; HWID spoofer at $50 monthly or $150 lifetime. Separate checkouts.',
  },
  '/products/dayz-cheats/dayz-cheats/': {
    title: 'Steam Loader | Aimbot, Player ESP, Config',
    description:
      'Steam loader menu: aimbot, player ESP, infected ESP, world ESP, item ESP, miscellaneous, and config. Monthly $35. Lifetime $150.',
  },
  '/products/dayz-cheats/hwid-spoofer/': {
    title: 'HWID Spoofer for DayZ Windows Hardware Flags',
    description:
      'HWID spoofer for DayZ players facing a hardware flag. $50 monthly or $150 lifetime. Profile rotation on a PC—not for account-only bans.',
  },
  '/products/dayz-cheats/ugc/': {
    title: 'UGC Account Recovery for DayZ PC Appeal Cases',
    description:
      'UGC account recovery organizes DayZ ban appeals and recovery cases. Separate license from the Steam loader and the HWID spoofer on a PC.',
  },
  '/products/dayz-cheats/utilities/': {
    title: 'Compare the HWID Tool and Account Appeal Utility',
    description:
      'See which Windows utility fits a hardware flag and which one fits an account appeal. Both are separate checkouts from the DayZ loader.',
  },
  '/blog/': {
    title: 'DayZ PC Guides for Aim, ESP, Loot, Menu, and BattlEye',
    description:
      'Steam loader guides for aimbot, player and infected ESP, vehicles, loot, the cheat menu, HWID flags, and BattlEye ban risk before you launch.',
  },
  '/blog/best-dayz-cheats-2026/': {
    title: 'Cheats – $35 monthly versus $150 lifetime on Steam',
    description:
      'A 2026 look at this store’s plans: aim help, visuals, map tools, ban risk, and $35 monthly versus $150 lifetime on Steam.',
  },
  '/blog/how-to-download-dayz/': {
    title: 'DayZ DMA Setup from the Checkout Portal',
    description:
      'DayZ DMA searches often expect a hardware card. This guide covers the Steam software loader after checkout, not a second PC.',
  },
  '/blog/dayz-anti-cheat/': {
    title: 'BattlEye – DayZ Anticheat Notes Before You Queue',
    description:
      'DayZ anticheat on the live client is BattlEye. Read what a report can do, why a hardware flag is different, and why no page here promises a clean match.',
  },
  '/blog/what-is-an-hwid-spoofer/': {
    title: 'What an HWID Spoofer Changes on a PC',
    description:
      'A hardware flag follows the computer, not only the profile. This note explains what a spoofer changes and what it leaves alone.',
  },
  '/blog/dayz-cheats-pricing/': {
    title: 'Monthly $35 vs Lifetime $150 on This Store',
    description:
      'Lifetime: Compare 31-day access at $35 with the $150 long-term key. Each product is a separate checkout. The loader $150 tier does not add the spoofer.',
  },
  '/blog/dayz-aimbot/': {
    title: 'Aimbot – on-screen cone keeps the assist readable',
    description:
      'DayZ aimbot settings for FOV, smooth, bone choice, visible check, prediction, and the on-screen cone so the assist stays readable.',
  },
  '/blog/dayz-esp/': {
    title: 'DayZ ESP for Players and Vehicles',
    description:
      'DayZ ESP boxes, skeleton, health, squad tags, and vehicle type so a combined-arms fight stays readable on Steam.',
  },
  '/blog/dayz-radar/': {
    title: 'DayZ Radar Markers and Range Scale',
    description:
      'DayZ radar with infantry blips, vehicle blips, and a range slider so the 2D map matches how far you actually play.',
  },
  '/blog/dayz-no-recoil/': {
    title: 'No Recoil, Spread, and Bright Settings',
    description:
      'No recoil, no spread, full bright, a custom crosshair, and saved configs on the Steam loader. None of these remove ban risk.',
  },
  '/blog/dayz-season-2/': {
    title: 'Season 2 – Oct 15 added weapons and vehicles',
    description:
      'Update 0.2.0 on October 15 added weapons, vehicles, and an armor rework. Season 3 is scheduled for November 12 with an economy wipe.',
  },
  '/blog/what-an-hwid-spoofer-does/': {
    title: 'HWID Spoofer – What the Tool Does After a Flag',
    description:
      'HWID spoofer: when a new profile dies on one PC and works on another, the hardware tool is the separate product. It does not undo an account-only penalty.',
  },
  '/blog/are-spoofer-and-ugc-necessary/': {
    title: 'Spoofer and UGC are not required for the cheat',
    description:
      'DayZ Cheats does not include the HWID spoofer or UGC recovery. Buy the spoofer only for a hardware flag, and UGC only to organize an appeal.',
  },
  '/forum/': {
    title: 'DayZ Community Forum: Setup, Aim, and Plans',
    description:
      'Forum threads on the DayZ loader, aim and ESP options, $35 monthly and $150 lifetime plans, and BattlEye patch days. Developer replies are marked.',
  },
  '/faq/': {
    title: 'FAQ – Plans, Setup, and BattlEye Risk Before Checkout',
    description:
      'Answers on checkout, BattlEye updates, Windows and Steam requirements, hardware flags, and how the loader, spoofer, and account tool differ.',
  },
  '/support/': {
    title: 'DayZ Support: Loader, Checkout, and HWID PC',
    description:
      'Loader, checkout, and portal help for DayZ tools, the HWID spoofer, and account appeals. Include your order email and the exact loader.',
  },
  '/about/': {
    title: 'About this DayZ store: portal delivery, pricing, and risk',
    description:
      'Store: what dayz-cheats.org sells, how checkout and portal delivery work, and the ban risk when you use third-party tools on DayZ.',
  },
  '/privacy/': {
    title: 'Privacy notes for analytics, cookies, and contact data',
    description:
      'How dayz-cheats.org handles analytics, cookies, and contact data. Payment card numbers stay on the checkout provider, not on this store.',
  },
  '/terms/': {
    title: 'License terms, refunds, and acceptable use rules',
    description:
      'License terms, acceptable use, and the no-refund rule for the loader, HWID spoofer, and account recovery sold through dayz-cheats.org.',
  },
  '/status/': {
    title: 'DayZ Status & BattlEye Patch Notes',
    description:
      'Module and portal update notes for the Windows loader. Check status after each BattlEye update before you launch DayZ on Steam.',
  },
};

export function normalizeSeoPath(pathname: string): string {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (path !== '/' && !path.endsWith('/')) path = `${path}/`;
  return path;
}

export function getPageSeoEntry(pathname: string): PageSeoEntry | undefined {
  return PAGE_SEO[normalizeSeoPath(pathname)];
}
