import type {
  AcquisitionStep,
  ProductFeatureGroup,
  ProductSlide,
  SystemRequirement,
} from './product-types';
import type { Block } from './product-locale-types';
const gameplay = '/images/gameplay';
const products = '/images/products';

/** Cheats product page — four portal menu screenshots (Visuals, World, Aimbot, Misc). */
export const dayzMenuSlides: ProductSlide[] = [
  {
    src: `${products}/wardogs-menu-visuals.webp`,
    alt: 'Player ESP menu screenshot',
    caption: 'Player ESP Options',
    captionDesc: 'Box, skeleton, health bar, name, distance, inventory, and the other toggles in that group.',
  },
  {
    src: `${products}/wardogs-menu-world.webp`,
    alt: 'World ESP menu screenshot',
    caption: 'World ESP Options',
    captionDesc: 'Animal ESP, health as text or a bar, vehicle ESP, and helicrash.',
  },
  {
    src: `${products}/wardogs-menu-aimbot.webp`,
    alt: 'Aimbot menu screenshot',
    caption: 'Aimbot Options',
    captionDesc: 'Toggle, FOV, aim distance, ignore, bone, FOV style, and a line to the target.',
  },
  {
    src: `${products}/wardogs-menu-misc.webp`,
    alt: 'Miscellaneous and config menu screenshot',
    caption: 'Miscellaneous and config',
    captionDesc: 'No clip, always day, crosshair, limit FPS, save config, and load config.',
  },
];

/** Home hero only — DayZ gameplay captures (not the product gallery). */
const homeHeroGallery = {
  loot: {
    src: `${gameplay}/dayz-loot-esp-player-box.webp`,
    alt: 'DayZ loot ESP with item labels and a player box in a village',
    caption: 'Loot ESP',
    captionDesc: 'Item quality labels with a player box in the same view.',
  },
  playerDistance: {
    src: `${gameplay}/dayz-player-esp-multiple-players-distance.webp`,
    alt: 'DayZ player ESP showing several players with distance readouts',
    caption: 'Player ESP',
    captionDesc: 'Multiple survivors with distance labels.',
  },
  playerBoxes: {
    src: `${gameplay}/dayz-player-esp-boxes-distance-labels.webp`,
    alt: 'DayZ ESP boxes and distance labels on players near a building',
    caption: 'Boxes and distance',
    captionDesc: 'Corner boxes and range readouts on a squad push.',
  },
  skeletonClose: {
    src: `${gameplay}/dayz-skeleton-esp-close-range.webp`,
    alt: 'DayZ skeleton ESP with boxes at close range',
    caption: 'Skeleton ESP',
    captionDesc: 'Bone lines and boxes at close range.',
  },
  skeletonIndoor: {
    src: `${gameplay}/dayz-skeleton-esp-through-walls-indoor.webp`,
    alt: 'DayZ skeleton ESP showing players through walls indoors',
    caption: 'Indoor skeleton',
    captionDesc: 'Bone lines on targets through interior walls.',
  },
  healthDoor: {
    src: `${gameplay}/dayz-health-esp-through-door.webp`,
    alt: 'DayZ health ESP bars and skeleton boxes through a closed door',
    caption: 'Health ESP',
    captionDesc: 'Health bars and boxes read through a doorway.',
  },
} as const satisfies Record<string, ProductSlide>;

function homeSlide(...keys: (keyof typeof homeHeroGallery)[]): ProductSlide[] {
  return keys.map((k) => homeHeroGallery[k]);
}

/** Home hero slider only — not the cheats product gallery. */
export const cheatHomeHeroSlides: ProductSlide[] = homeSlide(
  'loot',
  'playerDistance',
  'playerBoxes',
  'skeletonClose',
  'skeletonIndoor',
  'healthDoor',
);

export const acquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Check status',
    desc: 'Confirm modules are online on dayz-cheats.org before you buy—especially after a DayZ or BattlEye update.',
  },
  {
    num: '02',
    title: 'Pick a plan',
    desc: 'Choose monthly (P31D) or lifetime (P99Y)—same USD pricing on every product in the lineup.',
  },
  {
    num: '03',
    title: 'Secure checkout',
    desc: 'Complete checkout from the product card. Your license unlocks in the portal with instant delivery.',
  },
  {
    num: '04',
    title: 'Install & verify',
    desc: 'Follow the setup guide, load a conservative preset, and test on a low-pop server before you main your config.',
  },
];

export const utilitySlides = {
  spoofer: [
    {
      src: '/images/products/cs2-spoofer-hero.webp',
      alt: 'HWID spoofer on Windows PC',
      caption: 'HWID spoofer',
      captionDesc: 'Hardware fingerprint tools before you relaunch.',
    },
    {
      src: '/images/products/cs2-spoofer-phoenix-board.webp',
      alt: 'Phoenix Satano HWID spoofer hardware fingerprint rotation on Windows PC',
      caption: 'Phoenix board',
      captionDesc: 'Disk, MAC, and GPU ID rotation.',
    },
    {
      src: '/images/products/cs2-spoofer-phoenix-wh.webp',
      alt: 'Phoenix WH-Satano spoofer branding on Windows PC',
      caption: 'Phoenix WH',
      captionDesc: 'Spoofer workspace used on every store.',
    },
  ],
  ugc: [
    {
      src: '/images/products/ugc-account-recovery.webp',
      alt: 'UGC account recovery workspace preview on Windows PC',
      caption: 'Account recovery',
      captionDesc: 'Appeal workspace shared across stores.',
    },
    {
      src: '/images/products/ugc-account-recovery.webp',
      alt: 'UGC appeal template library on Windows PC',
      caption: 'Appeal templates',
      captionDesc: 'Structured paths and copy for ban disputes.',
    },
    {
      src: '/images/products/ugc-account-recovery.webp',
      alt: 'UGC case tracking dashboard on Windows PC',
      caption: 'Case tracking',
      captionDesc: 'Evidence lists and follow-up reminders in one place.',
    },
  ],
} as const;

export const cheatsContent = {
  images: [...dayzMenuSlides],
  goodToKnow:
    'DayZ and BattlEye update often. Confirm availability on dayz-cheats.org before you launch. Overlay behavior may differ in menus or spectator views after patches.',
  limitations:
    'Third-party software can violate game terms and lead to bans. You use this software at your own risk. Compatibility can change after game, BattlEye, or Windows updates without notice.',
  systemRequirements: [
    { icon: 'reqWindows', text: 'Windows 10/11' },
    { icon: 'reqCpu', text: 'Intel/AMD' },
    { icon: 'reqShieldGuide', text: 'Steam client (Steam Only build)' },
  ] as SystemRequirement[],
  featureGroups: [
    {
      name: 'Aimbot Options',
      items: [
        { name: 'Toggle Aimbot', desc: 'Turns aim assist on or off.' },
        { name: 'Customizable FOV', desc: 'Sets how wide the aim cone is.' },
        { name: 'Customizable Aim Distance', desc: 'Sets how far the assist will search.' },
        { name: 'Ignore (Players, Infected, Animals)', desc: 'Skip players, infected, animals, or a mix of those.' },
        { name: 'Bone (Nearest, Head, Neck, Pelvis)', desc: 'Nearest, head, neck, or pelvis.' },
        { name: 'FOV Style (Solid, Gradient)', desc: 'Draw the cone as a solid or a gradient.' },
        { name: 'Line to target (Solid, Gradient)', desc: 'Draw the line to the target as a solid or a gradient.' },
      ],
    },
    {
      name: 'Player ESP Options',
      items: [
        { name: 'Enable', desc: 'Turns player ESP on or off.' },
        { name: 'Friends', desc: 'Marks players you have set as friends.' },
        { name: 'Box (Corner, Box)', desc: 'Corner box or full box.' },
        { name: 'Filled Box (Solid, Gradient)', desc: 'Fill the box as a solid or a gradient.' },
        { name: 'Head dot', desc: 'Dot on the head.' },
        { name: 'Skeleton', desc: 'Bone lines on the player.' },
        { name: 'Health Bar', desc: 'Bar for remaining health.' },
        { name: 'Name', desc: 'Player name on the label.' },
        { name: 'Distance', desc: 'Distance to the player.' },
        { name: 'Inventory', desc: 'Inventory readout on the player.' },
        { name: 'Item in hands', desc: 'Shows the item the player is holding.' },
        { name: 'Traces', desc: 'Trace lines for player ESP.' },
        { name: 'Max Distance', desc: 'Hides player ESP past the range you set.' },
      ],
    },
    {
      name: 'Infected ESP Options',
      items: [
        { name: 'Enable', desc: 'Turns infected ESP on or off.' },
        { name: 'Box (Corner, Box)', desc: 'Corner box or full box on infected.' },
        { name: 'Filled Box (Solid, Gradient)', desc: 'Fill the box as a solid or a gradient.' },
        { name: 'Head dot', desc: 'Dot on the head.' },
        { name: 'Skeleton', desc: 'Bone lines on the infected.' },
        { name: 'Health Bar', desc: 'Bar for remaining health.' },
        { name: 'Name', desc: 'Infected name on the label.' },
        { name: 'Distance', desc: 'Distance to the infected.' },
        { name: 'Traces', desc: 'Trace lines for infected ESP.' },
        { name: 'Max Distance', desc: 'Hides infected ESP past the range you set.' },
      ],
    },
    {
      name: 'World ESP Options',
      items: [
        { name: 'Animal ESP', desc: 'Marks animals in the world.' },
        { name: 'Health (Text, Bar)', desc: 'Health as text or as a bar.' },
        { name: 'Vehicle ESP', desc: 'Marks vehicles in the world.' },
        { name: 'Helicrash', desc: 'Marks helicrash sites.' },
      ],
    },
    {
      name: 'Item ESP Options',
      items: [
        { name: 'Item Quality', desc: 'Shows item quality on loot.' },
        { name: 'Quality Style (Text, Bar)', desc: 'Quality as text or as a bar.' },
        { name: 'Battle Mode', desc: 'Battle mode for the item overlay.' },
        { name: 'Show only when hovering', desc: 'Item labels appear when you hover.' },
      ],
    },
    {
      name: 'Miscellaneous Options',
      items: [
        { name: 'No Clip', desc: 'No-clip movement toggle.' },
        { name: 'Always Day', desc: 'Forces daytime lighting.' },
        { name: 'Local position', desc: 'Shows your local position.' },
        { name: 'Thirdperson unlock', desc: 'Unlocks third person.' },
        { name: 'No grass', desc: 'Removes grass.' },
        { name: 'Crosshair', desc: 'Overlay crosshair.' },
      ],
    },
    {
      name: 'Config Options',
      items: [
        { name: 'Limit FPS', desc: 'Caps frames per second.' },
        { name: 'Menu Language (English, Chinese)', desc: 'Menu language: English or Chinese.' },
        { name: 'Save Config', desc: 'Saves the current menu layout.' },
        { name: 'Load Config', desc: 'Loads a saved menu layout.' },
      ],
    },
  ] as ProductFeatureGroup[],
  overview: {
    title: 'Built for DayZ on Steam',
    paragraphs: [
      'DayZ Cheats uses the loader menu below: aimbot, player ESP, infected ESP, world ESP, item ESP, miscellaneous, and config. Updates ship while your key is active, with Discord help for setup.',
      'Always check availability on dayz-cheats.org before you launch, especially after a BattlEye or Steam client patch.',
    ],
  },
  body: [
    { type: 'h2', text: 'Modules included' },
    {
      type: 'p',
      text: 'Steam loader with the aimbot, player, infected, world, item, miscellaneous, and config groups listed on this page. Names match the menu.',
    },
    { type: 'h2', text: 'Plans' },
    {
      type: 'p',
      text: 'Monthly $35 USD (P31D) or lifetime $150 USD (P99Y). Instant digital delivery worldwide after checkout.',
    },
  ] as Block[],
};

export const spooferContent = {
  images: [...utilitySlides.spoofer],
  goodToKnow:
    'HWID tools change how your PC fingerprint appears—they do not remove account bans by themselves. Follow portal guides before launching DayZ again.',
  limitations:
    'Spoofing carries technical risk and may violate game terms. Results vary by ban type and driver setup. Use only on systems you own.',
  systemRequirements: [
    { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator rights.' },
    { icon: 'reqRestorePoint', text: 'Create a restore point before running hardware tools.' },
    { icon: 'reqWifi', text: 'Stable internet for activation and verification steps.' },
  ] as SystemRequirement[],
  fullFeatures: [
    'Hardware spoofer with cleaner',
    'Disk serial and MAC rotation',
    'GPU ID profile tools',
    'Compatibility scan',
    'Verification checklist',
    'Portal step-by-step workflow',
    'Discord setup support',
  ],
  overview: {
    title: 'HWID recovery workflow',
    paragraphs: [
      'HWID Spoofer focuses on hardware profile rotation when you need a clean machine context before relaunching DayZ after a hardware flag.',
      'Monthly and lifetime USD plans use the same checkout flow as the rest of the lineup.',
    ],
  },
  body: [
    { type: 'h2', text: 'When to use it' },
    {
      type: 'p',
      text: 'Use when fresh accounts fail on one PC but work elsewhere—not for account-only bans. Pair with conservative cheat presets after verification.',
    },
    { type: 'h2', text: 'Plans' },
    {
      type: 'p',
      text: 'Monthly $50 USD (P31D) or lifetime $150 USD (P99Y).',
    },
  ] as Block[],
};

export const ugcContent = {
  images: [...utilitySlides.ugc],
  goodToKnow:
    'Gather order email, account details, and restriction screenshots before opening a ticket. UGC structures appeals—it does not bypass platform review.',
  limitations:
    'UGC does not guarantee account restoration. Results vary by case type and platform policy.',
  systemRequirements: [
    { icon: 'reqWindows', text: 'Windows 10 or 11 (64-bit).' },
    { icon: 'reqWifi', text: 'Internet access for workflow sync and updates.' },
    { icon: 'reqSettings', text: 'Administrator access for installation.' },
  ] as SystemRequirement[],
  fullFeatures: [
    'Custom appeal workflows',
    'Multi-platform recovery workspace',
    'Template library',
    'Automation for repetitive steps',
    'Restriction tracking dashboard',
    'Portal step-by-step workflow',
    'Discord setup support',
  ],
  overview: {
    title: 'UGC Account recovery workspace',
    paragraphs: [
      'UGC Account recovery helps organize ban appeals and recovery cases with templates, evidence lists, and follow-up reminders.',
      'Instant digital delivery after secure checkout, with Discord support for setup questions.',
    ],
  },
  body: [
    { type: 'h2', text: 'Appeal workflows' },
    {
      type: 'p',
      text: 'Build custom appeal paths, automate dispute steps, and track case status when gaming accounts are locked or restricted.',
    },
    { type: 'h2', text: 'Plans' },
    {
      type: 'p',
      text: 'Monthly $35 USD (P31D) or lifetime $150 USD (P99Y).',
    },
  ] as Block[],
};
