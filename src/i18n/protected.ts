/**
 * Terms that must stay identical in every locale (translate script + i18n:check).
 * Also exported to scripts/protected-terms.json.
 */

export const PROTECTED_GAME_NAMES = ['DayZ', 'BattlEye'] as const;

export const PROTECTED_SITE_NAMES = [
  'DayZ Cheats',
  'DayZ cheats',
  'dayz-cheats.org',
  'HWID Spoofer',
  'UGC Account Recovery',
  'UGC Account recovery',
  'Zadeyo',
] as const;

export const PROTECTED_PRODUCT_NAMES = [
  'DayZ Cheats',
  'HWID Spoofer',
  'UGC Account recovery',
  'UGC Account Recovery',
] as const;

export const PROTECTED_CHEAT_TERMS = [
  'Aimbot',
  'ESP',
  'Wallhack',
  'DMA',
  'Cloud DMA',
  'AWS',
  'Loader',
  'HWID',
  'Spoofer',
  'FOV',
  'Skeleton',
  'Box',
  'Head Circle',
  'Health Bar',
  'Snaplines',
  'OOF Arrows',
  '2D Radar',
  'Vehicle ESP',
  'Visible Check',
  'Prediction',
  'Draw FOV',
  'Draw Target Line',
  'Bone Selection',
  'Smooth',
  'No Recoil',
  'No Spread',
  'Full Bright',
  'Crosshair',
  'Stream-Proof',
  'Panic Key',
  'Menu Key',
  'Hotkeys',
  'Config',
  'aimbot',
  'wallhack',
  'chams',
] as const;

export const PROTECTED_KEYS_AND_TECH = [
  'Insert',
  'End',
  'RMB',
  'LMB',
  'Mouse 4',
  'Windows',
  'Windows 10',
  'Windows 11',
  'Intel',
  'AMD',
  'TPM',
  'HVCI',
  'UEFI',
  'PC',
  'Discord',
  'Steam',
  'Secure Boot',
  'Core isolation',
  'core isolation',
  'secure boot',
] as const;

export const PROTECTED_MONEY_AND_VERSIONS = [
  '$35',
  '$50',
  '$150',
  'USD',
  '1 Month',
  'Lifetime',
  'Monthly',
  '1 Month $35',
  'Lifetime $150',
  'USD · 30 days (P30D)',
  'USD · 31 days (P31D)',
  'USD · lifetime (P99Y)',
  'P31D',
] as const;

export const PROTECTED_FOOTER_SITES = [
  'Unturned cheats',
  'Aion 2 hack',
  'CS2 cheats',
] as const;

/** Flat list for JSON export and i18n:check (longest first for substring checks). */
export const PROTECTED_TERMS: readonly string[] = [
  ...new Set([
    ...PROTECTED_GAME_NAMES,
    ...PROTECTED_SITE_NAMES,
    ...PROTECTED_PRODUCT_NAMES,
    ...PROTECTED_CHEAT_TERMS,
    ...PROTECTED_KEYS_AND_TECH,
    ...PROTECTED_MONEY_AND_VERSIONS,
    ...PROTECTED_FOOTER_SITES,
  ]),
].sort((a, b) => b.length - a.length);
