/**
 * Editorial queue only. Do not publish these as empty posts.
 * Paste finished prose into src/content/blog/en/{slug}.md when a draft is ready.
 * Skip anything that promises "undetected", invents reviews, or gives a bypass procedure.
 */
export const PLANNED_BLOG_TOPICS = [
  {
    slug: 'dayz-battleye-ban-risk',
    workingTitle: 'BattlEye on official DayZ servers: what a report can still do',
    intent:
      'People search “battle eye undetected cheat”. Answer with ban risk and a link to /status/. Do not claim the loader is undetected and do not describe a bypass.',
  },
  {
    slug: 'best-dayz-hacks-2026',
    workingTitle: 'Best DayZ Hacks Review & Comparison 2026: Features, Safety & Value',
    intent:
      'Primary term: dayz hacks. Compare this store’s plans only ($35 / $50 monthly, $150 lifetime). No star ratings and no invented competitor reviews.',
  },
  {
    slug: 'what-an-hwid-spoofer-does',
    workingTitle: 'Discover What an HWID Spoofer Does',
    intent:
      'Primary term: hwid spoofer dayz. Explain a hardware flag versus an account penalty. It does not clear an account-only ban and it does not promise safety.',
  },
  {
    slug: 'dayz-aimbot-fov',
    workingTitle: 'Landing the Perfect Sniper Shot: Deep Dive into DayZ Aimbot and FOV Customization',
    intent:
      'Primary term: dayz aimbot. Explain Aimbot Options already on the product page (FOV, aim distance, bone, FOV style, line to target). Link /products/dayz-cheats/dayz-cheats/#features. No abuse steps.',
  },
  {
    slug: 'dayz-player-esp',
    workingTitle: 'Never Get Flanked Again: Tactical Advantages of Player ESP and Skeleton Tracking',
    intent:
      'Primary term: esp. Explain Player ESP Options (box, skeleton, health, name, distance, item in hands, traces). Link the product feature list. No abuse steps.',
  },
  {
    slug: 'dayz-zombie-esp',
    workingTitle: 'Stealth Movement in High-Tier Zones: Using DayZ Zombie ESP to Avoid Aggro',
    intent:
      'Primary term: dayz zombie esp. Explain Infected ESP Options on the product page. Link the feature list. No abuse steps.',
  },
  {
    slug: 'dayz-vehicle-esp',
    workingTitle: 'The Quickest Route to Endgame Gear: Tracking Transport with DayZ Vehicle ESP',
    intent:
      'Primary term: dayz vehicle esp. Explain World ESP Options (animal ESP, vehicle ESP, helicrash). Link the feature list. No abuse steps.',
  },
  {
    slug: 'dayz-loot-esp',
    workingTitle: 'Scavenge Smarter: Filtering High Quality Gear with DayZ Loot ESP',
    intent:
      'Primary term: dayz loot esp. Explain Item ESP Options (quality, quality style, battle mode, hover). Link the feature list. No abuse steps.',
  },
  {
    slug: 'dayz-no-clip',
    workingTitle: 'Ghosting Through Chernarus: The Power of DayZ No Clip and Always Day Features',
    intent:
      'Primary term: dayz no clip. Name Miscellaneous Options (no clip, always day, local position, third person, no grass, crosshair). Link the feature list. No abuse steps.',
  },
  {
    slug: 'dayz-cheat-menu',
    workingTitle: 'Seamless Setup: Managing Your DayZ Cheat Menu for Quick Deployment',
    intent:
      'Primary term: dayz cheat menu. Explain Config Options (limit FPS, menu language, save config, load config). Link the feature list. No abuse steps.',
  },
] as const;
