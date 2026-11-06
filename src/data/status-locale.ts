import { defaultLocale, getTranslations, type Locale } from '../i18n';
import {
  STATUS_ACE_REMINDER,
  STATUS_LAST_UPDATED,
  STATUS_RECENT_UPDATES,
  formatStatusUpdated,
  type StatusUpdateEntry,
} from './status';

export type StatusPageCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  pageDesc: string;
  breadcrumb: string;
  storeLineup: string;
  recentTitle: string;
  latestLabel: string;
  aceReminder: string;
  updates: StatusUpdateEntry[];
};

function statusBlock(locale?: Locale | null) {
  const loc = locale ?? defaultLocale;
  return getTranslations(loc).status as Record<string, unknown> | undefined;
}

function updatesFromLocale(locale?: Locale | null): StatusUpdateEntry[] | undefined {
  const raw = statusBlock(locale)?.updates;
  if (!Array.isArray(raw) || raw.length === 0) return undefined;
  const out: StatusUpdateEntry[] = [];
  for (const row of raw) {
    if (!row || typeof row !== 'object') continue;
    const { title, when, summary } = row as Record<string, unknown>;
    if (typeof title === 'string' && typeof when === 'string' && typeof summary === 'string') {
      out.push({ title, when, summary });
    }
  }
  return out.length ? out : undefined;
}

export function getStatusPageContent(locale?: Locale | null): StatusPageCopy {
  const s = statusBlock(locale);
  const en = statusBlock(defaultLocale);
  const updates = updatesFromLocale(locale) ?? STATUS_RECENT_UPDATES;

  return {
    eyebrow: (s?.eyebrow as string) ?? (en?.eyebrow as string) ?? 'Patch notes',
    title: (s?.title as string) ?? (en?.title as string) ?? 'DayZ module status',
    subtitle: (s?.subtitle as string) ?? (en?.subtitle as string) ?? '',
    pageDesc:
      (s?.pageDesc as string) ??
      (en?.pageDesc as string) ??
      'After a DayZ or BattlEye update, read this page and the portal before you launch. Updated means the note was refreshed. It is not an undetected claim.',
    breadcrumb: (s?.breadcrumb as string) ?? (en?.breadcrumb as string) ?? 'Status',
    storeLineup: (s?.storeLineup as string) ?? (en?.storeLineup as string) ?? 'Store lineup',
    recentTitle: (s?.recentTitle as string) ?? (en?.recentTitle as string) ?? 'Recent updates',
    latestLabel: (s?.latestLabel as string) ?? (en?.latestLabel as string) ?? 'Latest',
    aceReminder:
      (s?.aceReminder as string) ?? (en?.aceReminder as string) ?? STATUS_ACE_REMINDER,
    updates,
  };
}

export function formatActiveStatusLine(
  locale?: Locale | null,
  isoDate: string = STATUS_LAST_UPDATED,
): string {
  const s = statusBlock(locale);
  const en = statusBlock(defaultLocale);
  const active = (s?.activeLineActive as string) ?? (en?.activeLineActive as string) ?? 'Active';
  const updatedLabel =
    (s?.activeLineUpdated as string) ?? (en?.activeLineUpdated as string) ?? 'Updated {date}';
  const date = formatStatusUpdated(isoDate, locale);
  return `${active} · ${updatedLabel.replace('{date}', date)}`;
}
