export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  developer?: boolean;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  /** Meta description. Cards keep the shorter excerpt. */
  description: string;
  author: string;
  age: string;
  date: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
  /** Answered threads that should show a closed badge. New patch threads stay open. */
  closed?: boolean;
}

export const FORUM_DEVELOPER = 'DayZStaff';

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

/** Stable filter keys — always derived from English category names. */
export const FORUM_CATEGORY_KEYS: Record<string, string> = {
  General: 'general',
  'Guides & Builds': 'guidesbuilds',
  'Patch Talk': 'patchtalk',
  Community: 'community',
};

export function forumCategoryFilterKey(category: string): string {
  return FORUM_CATEGORY_KEYS[category] ?? category.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function countComments(comments: ForumComment[]): number {
  return comments.reduce(
    (total, comment) => total + 1 + (comment.replies ? countComments(comment.replies) : 0),
    0,
  );
}

function withCounts(post: Omit<ForumPost, 'commentsCount'>): ForumPost {
  return { ...post, commentsCount: countComments(post.comments) };
}

export function forumLastReply(comments: ForumComment[]): { author: string; age: string } | null {
  let last: ForumComment | null = null;
  const walk = (list: ForumComment[]) => {
    for (const comment of list) {
      last = comment;
      if (comment.replies?.length) walk(comment.replies);
    }
  };
  walk(comments);
  return last ? { author: last.author, age: last.age } : null;
}

const rawPosts: Array<Omit<ForumPost, 'commentsCount'>> = [
  {
    slug: 'update-130-before-launch',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Update 1.30 and Badlands are live. Do I open the loader on the old config?',
    excerpt: 'The Steam client changed on October 15. My saved config is from before Nasdara and the new bikes.',
    description:
      'Steam 1.30 shipped Oct 15, 2026. Read status before opening a config from an older client. Not an undetected claim.',
    author: 'BadlandsWait',
    age: '6h ago',
    date: 'Nov 5, 2026',
    upvotes: 64,
    flair: '❓ Question',
    body: [
      'Steam on Windows. Update 1.30 and the Badlands expansion landed on October 15. Nasdara, the Jana 50, the Enduro, and the new code locks are in the client.',
      'I still have a config from before that patch. Is the old save enough, or do I wait for the status page?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '5h ago',
        score: 41,
        developer: true,
        body: 'Wait. A config saved before Update 1.30 is not a check for this client. Read the status page, then the portal, and leave the loader closed until that note matches the build you are about to open. Updated means the note was refreshed. It does not mean a session stays clean.',
        replies: [
          {
            author: 'BadlandsWait',
            age: '4h ago',
            score: 9,
            body: 'Held the queue. I will only open it after the status line matches this client.',
          },
        ],
      },
    ],
    sourceTitle: 'Status page',
    sourcePath: '/status/',
  },
  {
    slug: 'update-130-battleye-reports',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Ban-wave posts after the 1.30 BattlEye update. What does that mean here?',
    excerpt: 'Public notes talk about deeper BattlEye tracking. I want the status read, not a bypass.',
    description:
      'Public 1.30 notes mention deeper BattlEye tracking and later ban-wave reports. No missed-loader claim or bypass here.',
    author: 'PatchQuiet',
    age: '8h ago',
    date: 'Nov 5, 2026',
    upvotes: 57,
    flair: '❓ Question',
    body: [
      'The 1.30 notes mention deeper tracking with BattlEye and do not publish the method. People are also posting about ban waves after that client.',
      'I am not asking how to get around it. I want to know what this site will and will not claim.',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '7h ago',
        score: 38,
        developer: true,
        body: 'The public note is the whole claim: tracking changes were made, and the method was not published. Later reports describe ban waves. This page does not say this loader was missed or caught. A ban is still possible. There is no bypass write-up here. If the status note is not for the build you have installed, leave the loader closed.',
      },
    ],
    sourceTitle: 'Status page',
    sourcePath: '/status/',
  },
  {
    slug: 'nasdara-bikes-and-world-esp',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Nasdara, the Jana 50, and the Enduro are in. Does the menu grow a new toggle?',
    excerpt: 'World ESP already has vehicle ESP, animal ESP, and helicrash. I do not want a fake motorcycle switch.',
    description:
      '1.30 added Nasdara and two bikes. World ESP stays animal, health, vehicle, and helicrash—no separate motorcycle row.',
    author: 'EnduroLine',
    age: '1d ago',
    date: 'Nov 4, 2026',
    upvotes: 49,
    flair: '💬 Discussion',
    body: [
      'Badlands added the Nasdara desert and two motorcycles, the Jana 50 and the Enduro. They lean, and they need gasoline and a spark plug.',
      'The published menu still lists Vehicle ESP under World ESP Options. Is a motorcycle its own toggle, or is it just a vehicle?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '1d ago',
        score: 33,
        developer: true,
        body: 'The published World ESP group is still Animal ESP, Health as text or a bar, Vehicle ESP, and Helicrash. The Jana 50 and Enduro are vehicles in the game. They are not an extra row on this page. Nasdara does not add a map toggle either. If a label is missing after the client update, treat that as a status check, not as a new feature name.',
        replies: [
          {
            author: 'EnduroLine',
            age: '20h ago',
            score: 8,
            body: 'So I leave Vehicle ESP on and I do not go looking for a bike switch. Clear.',
          },
        ],
      },
    ],
    sourceTitle: 'DayZ Cheats feature list',
    sourcePath: '/products/dayz-cheats/dayz-cheats/#features',
  },
  {
    slug: 'death-screen-report-button',
    category: 'General',
    categoryTone: 'purple',
    title: 'Is the death-screen Report Player button live on 1.30?',
    excerpt: 'I died in Nasdara and there was no new report control. Public notes still call it unfinished.',
    description:
      'The death-screen Report Player control is unfinished in public 1.30 notes. Not a bypass topic.',
    author: 'DeathScreen',
    age: '1d ago',
    date: 'Nov 4, 2026',
    upvotes: 42,
    flair: '❓ Question',
    body: [
      'Public notes say a Report Player button for the death screen is being worked on so false reports do not pile up.',
      'I did not see it after a death on 1.30. Is it live, or still not in the client?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '1d ago',
        score: 29,
        developer: true,
        body: 'Treat it as unfinished. The public note says the team is still working on that control, including false-report cases. Do not plan a session around a button that is not in the client. This thread will not turn it into a bypass topic.',
      },
    ],
    sourceTitle: 'Status page',
    sourcePath: '/status/',
  },
  {
    slug: 'update-131-and-ps5',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'When is Update 1.31, and does this key cover the PS5 client?',
    excerpt: 'No date is posted for 1.31. A native PS5 build is being talked about for 2027. This PC is Steam.',
    description:
      'Update 1.31 has no public date. Hotfixes for 1.30 can still land. This key is the Steam loader on Windows, not a future PS5 client.',
    author: 'RoadmapRead',
    age: '2d ago',
    date: 'Nov 3, 2026',
    upvotes: 46,
    flair: '❓ Question',
    body: [
      'I cannot find a date for Update 1.31. Hotfixes for 1.30 are still possible. There is also talk of a native PS5 version in 2027.',
      'I play on Steam for Windows. Does the lifetime key follow a console client, or only this PC loader?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '2d ago',
        score: 31,
        developer: true,
        body: 'There is no public date for 1.31. A past release gap is not a promise. Hotfixes can still change the Steam client, so re-check the status page before each launch. This product is the Steam loader on Windows. A native PS5 build is a different client and is not included.',
        replies: [
          {
            author: 'RoadmapRead',
            age: '1d ago',
            score: 7,
            body: 'PC key only, and I still wait on status after a hotfix. That is the part I needed.',
          },
        ],
      },
    ],
    sourceTitle: 'Status page',
    sourcePath: '/status/',
  },
  {
    slug: 'BattlEye-status-before-launch',
    category: 'General',
    categoryTone: 'purple',
    title: 'The status line still says Updated. Is that enough after a 1.30 hotfix?',
    excerpt: 'A small hotfix landed after Badlands. The page still shows the October 15 note.',
    description:
      'After any DayZ or BattlEye update (incl. hotfixes), wait until status matches your build. Last night’s banner is not current.',
    author: 'NightRaid',
    age: '12h ago',
    date: 'Nov 3, 2026',
    upvotes: 71,
    flair: '❓ Question',
    body: [
      'Windows 11, monthly key, Steam client. A hotfix followed Update 1.30. The status page still reads like the October 15 Badlands note.',
      'Is that older note enough, or do I wait until the page is updated for this hotfix?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '1d ago',
        score: 44,
        developer: true,
        body: 'Wait. Check the status page after the client or BattlEye update, not the banner you remember from the 1.30 launch. A hotfix is the same rule. Nothing here is a promise that a session stays clean. If the note is not for this build, leave the loader closed.',
        replies: [
          {
            author: 'NightRaid',
            age: '20h ago',
            score: 11,
            body: 'Held the queue 🙏 I will only open it after the page is updated for this patch.',
          },
        ],
      },
      {
        author: 'ExtractLate',
        age: '18h ago',
        score: 8,
        body: 'Same habit 😭 I read the anti-cheat post so I stop treating a green banner as a guarantee.',
      },
    ],
    sourceTitle: 'Status page',
    sourcePath: '/status/',
  },
  {
    slug: 'aim-smooth-on-infantry',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Aim assist snaps in a close infantry fight. What do I turn down? 🎯',
    excerpt: '😵 FOV is wide and bone is head. Aim distance is still long.',
    description:
      'Aim assist snaps on close DayZ infantry when FOV is wide. Tighten Customizable FOV, shorten aim distance, and change one setting at a time.',
    author: 'CloseAngle',
    age: '2d ago',
    date: 'Oct 26, 2026',
    upvotes: 84,
    flair: '❓ Question',
    body: [
      'Steam build, Aimbot Options: toggle, customizable FOV, customizable aim distance, ignore, bone, FOV style, and a line to the target.',
      'On a short peek it yanks to the head. I only want help on the person I am already looking at, not the next one at the edge.',
    ],
    comments: [
      {
        author: 'ScopeQuiet',
        age: '2d ago',
        score: 19,
        body: 'I cut FOV until the cone barely covered the person in front of me, and I shortened aim distance 🎯 Head bone was the yank.',
        replies: [
          {
            author: FORUM_DEVELOPER,
            age: '2d ago',
            score: 36,
            developer: true,
            body: 'Change one setting at a time. A tighter Customizable FOV and a shorter Customizable Aim Distance is the usual fix. Bone can stay on nearest while you test, then move to head, neck, or pelvis. FOV Style only changes whether the cone draws as a solid or a gradient. Save Config so the next launch does not reset it.',
          },
        ],
      },
    ],
    sourceTitle: 'DayZ Cheats feature list',
    sourcePath: '/products/dayz-cheats/dayz-cheats/#features',
  },
  {
    slug: 'esp-too-many-labels',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'Player ESP covers the screen in a squad fight 👁️',
    excerpt: '📦 Box, skeleton, name, inventory, and traces are all on. I cannot see the crosshair.',
    description:
      'Player ESP covers a DayZ fight when every label is on. Keep box or skeleton, health, and distance, and lower Max Distance.',
    author: 'SquadNoise',
    age: '3d ago',
    date: 'Oct 25, 2026',
    upvotes: 66,
    flair: '💬 Discussion',
    body: [
      'Player ESP Options is stacked: box, filled box, head dot, skeleton, health bar, name, distance, inventory, item in hands, and traces.',
      'I only need who is up and how far. What do people actually leave on?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '3d ago',
        score: 33,
        developer: true,
        body: 'Start with box or skeleton, health bar, and distance. Add name only when you need it. Inventory and item in hands are optional. Lower Max Distance so far players drop off. Traces are the last toggle if they pull your eye off the box.',
      },
      {
        author: 'SquadNoise',
        age: '2d ago',
        score: 9,
        body: 'Dropped inventory, item in hands, and traces ✨ The fight is readable again.',
      },
    ],
    sourceTitle: 'DayZ Cheats feature list',
    sourcePath: '/products/dayz-cheats/dayz-cheats/#features',
  },
  {
    slug: 'vehicle-esp-or-radar',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'A vehicle and a helicrash are both marked. Which World ESP toggle is which? 🛡️',
    excerpt: '🚛 A vehicle and a helicrash site are both on screen. I cannot tell which World ESP label I should read.',
    description:
      'World ESP Options has animal ESP, health as text or a bar, vehicle ESP, and helicrash. They are separate toggles in that group.',
    author: 'ConvoySide',
    age: '4d ago',
    date: 'Oct 30, 2026',
    upvotes: 52,
    flair: '❓ Question',
    body: [
      'World ESP Options: animal ESP, health as text or a bar, vehicle ESP, and helicrash.',
      'A vehicle and a crash site showed up together. I had both toggles on and the labels stacked. Which one is the vehicle, and which one is the helicrash?',
    ],
    comments: [
      {
        author: 'ATRock',
        age: '4d ago',
        score: 12,
        body: 'I leave vehicle ESP on for the vehicle in front of me, and I only turn helicrash on when I am looking for a crash site.',
        replies: [
          {
            author: FORUM_DEVELOPER,
            age: '4d ago',
            score: 28,
            developer: true,
            body: 'They are separate toggles in World ESP Options. Vehicle ESP marks vehicles. Helicrash marks crash sites. Animal ESP and Health (text or bar) are the other two in that group. Turning one off does not turn the others off.',
          },
        ],
      },
    ],
    sourceTitle: 'DayZ Cheats feature list',
    sourcePath: '/products/dayz-cheats/dayz-cheats/#features',
  },
  {
    slug: 'radar-blips-everywhere',
    category: 'Guides & Builds',
    categoryTone: 'blue',
    title: 'World ESP labels are stacked. How do I cut them back? 📡',
    excerpt: '✨ Animal ESP, vehicle ESP, and helicrash are all on. I cannot tell them apart.',
    description:
      'World ESP Options can stack animal ESP, vehicle ESP, and helicrash. Turn off the labels you are not reading.',
    author: 'MapRing',
    age: '5d ago',
    date: 'Oct 29, 2026',
    upvotes: 47,
    flair: '💬 Discussion',
    body: [
      'World ESP Options has animal ESP, health, vehicle ESP, and helicrash all on.',
      'I mostly want vehicles. The animal and helicrash labels are covering the same view.',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '5d ago',
        score: 30,
        developer: true,
        body: 'Leave the World ESP toggle you are reading and turn the others off. Vehicle ESP, animal ESP, and helicrash are separate. Player labels stay in Player ESP Options, with their own Max Distance.',
      },
      {
        author: 'MapRing',
        age: '4d ago',
        score: 7,
        body: 'Turned animal ESP and helicrash off. Vehicle ESP is the only world label I leave on.',
      },
    ],
    sourceTitle: 'DayZ Cheats feature list',
    sourcePath: '/products/dayz-cheats/dayz-cheats/#features',
  },
  {
    slug: 'lifetime-next-update',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Does the $150 lifetime key cover Update 1.31 and the hotfixes?',
    excerpt: '1.30 is already out. I am deciding between another month and lifetime before the next client.',
    description:
      'Lifetime on DayZ Cheats covers later builds while the key is active. It does not mean the loader is ready the hour a patch lands. Check status first.',
    author: 'WipeWatch',
    age: '1d ago',
    date: 'Nov 2, 2026',
    upvotes: 88,
    flair: '❓ Question',
    body: [
      'Update 1.30 is on Steam. Update 1.31 has no public date. Monthly is $35 and lifetime is $150 on the cheat card.',
      'If I buy lifetime this week, does that key include later PC builds, or do I pay again when the client updates?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '1d ago',
        score: 51,
        developer: true,
        body: 'Lifetime is for this cheat product on Steam for Windows. Later PC builds ship while the key is active, including after a hotfix. It does not mean the loader is ready the hour Update 1.31 or a hotfix goes live. Check the status page and leave the loader closed until that note matches the new client. Lifetime does not add the HWID spoofer, UGC, or a console client, and a ban is still possible.',
        replies: [
          {
            author: 'WipeWatch',
            age: '20h ago',
            score: 16,
            body: 'So the key stays on PC, and I still wait on the status page after the next client. That is the part I needed.',
          },
        ],
      },
      {
        author: 'SeasonHold',
        age: '18h ago',
        score: 9,
        body: 'Same read on Season 2. I did not open it the night the patch notes dropped. I waited until the status line moved.',
      },
    ],
    sourceTitle: 'Status page',
    sourcePath: '/status/',
  },
  {
    slug: 'lifetime-includes-spoofer',
    category: 'General',
    categoryTone: 'purple',
    title: 'Does the $150 lifetime key include the HWID spoofer? 🔑',
    excerpt: '💸 I am on the $35 month. I want to know if lifetime on the cheat also unlocks the spoofer.',
    description:
      'The $150 lifetime key on DayZ Cheats does not include the HWID spoofer or UGC recovery. Each product is its own checkout, with no credit from monthly.',
    author: 'PlanMath',
    age: '6d ago',
    date: 'Oct 22, 2026',
    upvotes: 79,
    closed: true,
    flair: '❓ Question',
    body: [
      'DayZ Cheats and UGC are $35 for 31 days or $150 lifetime. The HWID spoofer is $50 monthly or $150 lifetime on its own card.',
      'If I buy lifetime on the cheat, do I also get the spoofer, or is that another checkout?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '6d ago',
        score: 48,
        developer: true,
        body: 'Separate products. Lifetime on DayZ Cheats does not include HWID Spoofer or UGC Account recovery. Each one is its own key. Starting on monthly does not promise a credit toward lifetime. The spoofer monthly is $50; cheat and UGC monthly are $35. Lifetime is $150 on each card—not one bundle.',
        replies: [
          {
            author: 'PlanMath',
            age: '5d ago',
            score: 14,
            body: 'Clear. I will keep the month on the cheat and buy the spoofer only if the PC is the thing that is flagged.',
          },
        ],
      },
    ],
    sourceTitle: 'Pricing FAQ',
    sourcePath: '/blog/dayz-cheats-pricing/',
  },
  {
    slug: 'when-to-buy-hwid',
    category: 'Community',
    categoryTone: 'green',
    title: 'Fresh accounts die on this PC and work on a laptop. Is that HWID? 💻',
    excerpt: '🆕 The game account is new. A second machine gets in. I am not sure the spoofer is the right buy.',
    description:
      'New accounts that fail on one PC and work on another match a hardware-ID case. The HWID spoofer does not fix an account-only restriction. UGC is that workspace.',
    author: 'SecondRig',
    age: '7d ago',
    date: 'Oct 21, 2026',
    upvotes: 58,
    flair: '❓ Question',
    body: [
      'Two PCs. New accounts fail on the desktop and play on the laptop. I already own the cheat month.',
      'Is the HWID spoofer for the desktop, or do I need the UGC appeal workspace instead?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '7d ago',
        score: 34,
        developer: true,
        body: 'If a new account fails on one machine and works on another, that pattern is the hardware-ID case the spoofer is for. UGC is the appeal workspace for the account itself. The spoofer does not undo an account-only restriction, and it is not included with the cheat key.',
      },
    ],
    sourceTitle: 'What an HWID spoofer is',
    sourcePath: '/blog/what-is-an-hwid-spoofer/',
  },
  {
    slug: 'is-cloud-dma-included',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Is a DMA card included with the loader? ☁️',
    excerpt: '👀 A search for DayZ DMA made me think the download included a DMA card. I only bought the Windows loader.',
    description:
      'This key is the Windows loader from checkout. Save Config and Load Config store the menu. A DMA card is not included.',
    author: 'ReadThePage',
    age: '3d ago',
    date: 'Oct 31, 2026',
    upvotes: 63,
    flair: '❓ Question',
    body: [
      'Config Options has Limit FPS, menu language, Save Config, and Load Config. A search for DayZ DMA made me think the download included a DMA setup.',
      'I bought the Windows loader. I do not own a DMA card. Is that hardware part of this key or not?',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '3d ago',
        score: 39,
        developer: true,
        body: 'No. Save Config and Load Config store the menu so you can load the same layout later. They are not a DMA card, and this product is the Windows loader from checkout. A DMA device is different hardware and is not included with the key. Do not run a file that arrived from a search result or a direct message.',
        replies: [
          {
            author: 'ReadThePage',
            age: '2d ago',
            score: 11,
            body: 'So Save Config is the preset, and the card people argue about is not in the download. Got it.',
          },
        ],
      },
    ],
    sourceTitle: 'Download and install guide',
    sourcePath: '/blog/how-to-download-dayz/',
  },
  {
    slug: 'steam-only-client',
    category: 'Patch Talk',
    categoryTone: 'orange',
    title: 'Loader will not see the game. Is this Steam only? 🎮',
    excerpt: '🛑 DayZ is installed, but not through Steam. The product page says Steam Only and I stopped before changing Windows.',
    description:
      'The DayZ cheat build is for the Steam client on Windows. Another storefront copy is not this product. Leave Windows security features on.',
    author: 'CleanBoot',
    age: '6d ago',
    date: 'Oct 28, 2026',
    upvotes: 55,
    flair: '❓ Question',
    body: [
      'Windows 11, Intel. The game on this PC is not the Steam install. The feature list says Steam Only.',
      'Someone in another chat said to turn security features off so a loader would start. I have not touched those settings.',
    ],
    comments: [
      {
        author: FORUM_DEVELOPER,
        age: '6d ago',
        score: 37,
        developer: true,
        body: 'This build is Steam Only. If DayZ is not the Steam copy, this loader is not for that install. Leave Windows security features as they are. Do not follow a post that tells you to turn them off. If the Steam copy still fails to open, send the order email and the exact loader text through support.',
      },
    ],
    sourceTitle: 'DayZ Cheats product page',
    sourcePath: '/products/dayz-cheats/dayz-cheats/',
  },
];

export const forumPosts: ForumPost[] = rawPosts.map(withCounts);

export function getForumPost(slug: string) {
  return forumPosts.find((post) => post.slug === slug);
}
