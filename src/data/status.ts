/** ISO date (YYYY-MM-DD) — edit when you publish a status refresh. */
export const STATUS_LAST_UPDATED = '2026-11-05';

export interface StatusUpdateEntry {
  title: string;
  /** Display range or date, e.g. Oct 22–24, 2026 */
  when: string;
  summary: string;
}

/** Newest first — neutral patch notes only (no undetected / working claims). */
export const STATUS_RECENT_UPDATES: StatusUpdateEntry[] = [
  {
    title: 'Update 1.30 and Badlands are on the Steam client',
    when: 'Oct 15, 2026',
    summary:
      'Update 1.30 and the Badlands expansion shipped on Steam on October 15, 2026. The client added the Nasdara desert, the Jana 50 and Enduro motorcycles, electronic code locks, a base-upgrade widget, and a large inventory-icon pass. Those are game changes, not new loader toggles. A config saved before this client is not a current check. Read this page and the portal before you launch.',
  },
  {
    title: 'BattlEye notes around 1.30',
    when: 'Oct 15, 2026',
    summary:
      'Public notes describe deeper BattlEye-side tracking, including work with Nitrado, without publishing the method. Later reports describe ban waves after that client. This page does not say this loader was missed or caught, and it does not explain how to avoid a check. A ban is still possible. Leave the loader closed until this note matches the build you are about to open.',
  },
  {
    title: 'Death-screen report control is not a live feature',
    when: 'Oct 15, 2026',
    summary:
      'A Report Player control on the death screen is still being worked on in public notes, including work to limit false reports. It is not a button to plan a session around, and this page will not treat it as a bypass topic.',
  },
  {
    title: 'What comes after 1.30',
    when: 'Nov 5, 2026',
    summary:
      'Update 1.31 has no public date. Hotfixes for 1.30 can still land, and each one is a reason to re-check this page. A native PS5 client is a separate build talked about for 2027. This key is the Steam loader on Windows, not that console client.',
  },
  {
    title: 'Updated is not a detection claim',
    when: 'Nov 5, 2026',
    summary:
      'The Updated label means this note was refreshed. It does not mean the loader is undetected, and it does not mean a server will stay clean after the next BattlEye or game update.',
  },
  {
    title: 'Plans stay on separate cards',
    when: 'Nov 5, 2026',
    summary:
      'The loader and UGC monthly price is $35. The HWID spoofer monthly price is $50. Lifetime is $150 on each card. A lifetime key on one product does not include the others.',
  },
];

export const STATUS_ACE_REMINDER =
  'Check this page after each BattlEye update before launching.';

const LOCALE_DATE: Partial<Record<string, string>> = {
  en: 'en-US',
  fr: 'fr-FR',
  it: 'it-IT',
  de: 'de-DE',
  es: 'es-ES',
  cs: 'cs-CZ',
  ru: 'ru-RU',
  'zh-cn': 'zh-CN',
  ja: 'ja-JP',
  pl: 'pl-PL',
  'pt-br': 'pt-BR',
};

/** Format YYYY-MM-DD for display (static at build). */
export function formatStatusUpdated(
  isoDate: string = STATUS_LAST_UPDATED,
  locale?: string | null,
): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const tag = locale && LOCALE_DATE[locale] ? LOCALE_DATE[locale] : 'en-US';
  return new Intl.DateTimeFormat(tag, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
