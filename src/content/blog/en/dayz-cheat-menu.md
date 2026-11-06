---
{
  "tag": "Setup",
  "title": "Seamless Setup: Managing Your DayZ Cheat Menu for Quick Deployment",
  "seoTitle": "DayZ cheat menu: language, FPS, save, and load",
  "slug": "dayz-cheat-menu",
  "image": "/images/gameplay/dayz-esp-target-beside-building.webp",
  "imageAlt": "DayZ ESP box on a target beside a red building",
  "desc": "The DayZ cheat menu config group: limit FPS, English or Chinese, save config, and load config. How to keep a layout without treating save as a hardware tool.",
  "date": "Oct 30, 2026",
  "dateIso": "2026-10-30",
  "readTime": "4 min read",
  "author": "DayZ Staff",
  "body": [
    {
      "type": "p",
      "text": "The DayZ cheat menu stores its layout in Config Options. The group is four rows: Limit FPS, Menu Language, Save Config, and Load Config. Language is English or Chinese. This note is about not losing a setup you already tuned, and about not confusing Save Config with a DMA card or a spoofer. The rows are on the [loader feature list](/products/dayz-cheats/dayz-cheats/#features)."
    },
    {
      "type": "h2",
      "text": "Limit FPS and menu language"
    },
    {
      "type": "p",
      "text": "Limit FPS caps frames. Use it if the overlay and the game are fighting the machine, not as a ban setting. It does not change BattlEye. Menu Language switches the menu between English and Chinese. It does not translate the game. Pick the language you can read while you tune, then leave it. Changing language after you have memorized row positions is how people turn on the wrong group."
    },
    {
      "type": "h2",
      "text": "Save and load"
    },
    {
      "type": "p",
      "text": "Save Config writes the current menu layout. Load Config reads a layout you saved. They are the reason a careful session survives the next launch. Change one group, confirm it, then save. If you save after every experiment, including the bad ones, load will bring the bad one back. Save Config is not a DMA device. A search that mentions DayZ DMA often expects a hardware card. This key is the Windows loader from checkout. The card is not in the download."
    },
    {
      "type": "h2",
      "text": "What to save, and when not to load"
    },
    {
      "type": "p",
      "text": "A sensible file has the aimbot cone tight, player ESP limited to box, skeleton, health, name, and distance, infected ESP shorter than player ESP, world ESP split between vehicles and helicrash, and item labels on hover. Miscellaneous stays off unless you meant to enable no grass or always day. That layout is described in the [aimbot note](/blog/dayz-aimbot-fov/) and the ESP notes next to it. Do not load a file saved before Update 1.30 until the [status page](/status/) matches the Steam client you have now. An old file on a new client is how a menu opens in a state you did not mean."
    },
    {
      "type": "ul",
      "items": [
        "Set language and the FPS cap before you tune combat rows.",
        "Save after a layout you would want again, not after every toggle.",
        "Load only when the status note matches this client.",
        "Do not expect Save Config to include the HWID spoofer or a DMA card."
      ]
    },
    {
      "type": "p",
      "text": "The spoofer is its own checkout for a hardware flag. It is not stored inside this menu. A lifetime key on the loader does not add it. Config also does not make the loader acceptable to BattlEye. Updated on the status page means the note was refreshed. Load the file after you have read that note, not instead of reading it. If a row you need is missing after a load, it was not in the file or it is not in this menu. The four config rows are the whole deployment story."
    }
  ]
}
---
