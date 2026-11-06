export const defaultLocale = 'en' as const;

export interface LocaleConfigEntry {
  code: string;
  urlPrefix: string;
  nativeName: string;
  shortLabel: string;
  hreflang: string;
  htmlLang: string;
  dir: 'ltr' | 'rtl';
  ogLocale: string;
  /** When true, use system UI fonts only (no Manrope/Rajdhani files). */
  systemFontsOnly?: boolean;
}

/**
 * DayZ-aligned official languages — URL prefix matches `code`.
 * Non-English locales use English UI until you fill `src/i18n/{code}.json` and related bundles.
 */
export const localeConfig: readonly LocaleConfigEntry[] = [
  {
    code: 'en',
    urlPrefix: '',
    nativeName: 'English',
    shortLabel: 'EN',
    hreflang: 'en',
    htmlLang: 'en',
    dir: 'ltr',
    ogLocale: 'en_US',
  },
  {
    code: 'fr',
    urlPrefix: 'fr',
    nativeName: 'Français',
    shortLabel: 'FR',
    hreflang: 'fr',
    htmlLang: 'fr',
    dir: 'ltr',
    ogLocale: 'fr_FR',
  },
  {
    code: 'it',
    urlPrefix: 'it',
    nativeName: 'Italiano',
    shortLabel: 'IT',
    hreflang: 'it',
    htmlLang: 'it',
    dir: 'ltr',
    ogLocale: 'it_IT',
  },
  {
    code: 'de',
    urlPrefix: 'de',
    nativeName: 'Deutsch',
    shortLabel: 'DE',
    hreflang: 'de',
    htmlLang: 'de',
    dir: 'ltr',
    ogLocale: 'de_DE',
  },
  {
    code: 'es',
    urlPrefix: 'es',
    nativeName: 'Español (España)',
    shortLabel: 'ES',
    hreflang: 'es',
    htmlLang: 'es',
    dir: 'ltr',
    ogLocale: 'es_ES',
  },
  {
    code: 'cs',
    urlPrefix: 'cs',
    nativeName: 'Čeština',
    shortLabel: 'CS',
    hreflang: 'cs',
    htmlLang: 'cs',
    dir: 'ltr',
    ogLocale: 'cs_CZ',
  },
  {
    code: 'ru',
    urlPrefix: 'ru',
    nativeName: 'Русский',
    shortLabel: 'RU',
    hreflang: 'ru',
    htmlLang: 'ru',
    dir: 'ltr',
    ogLocale: 'ru_RU',
  },
  {
    code: 'zh-cn',
    urlPrefix: 'zh-cn',
    nativeName: '简体中文',
    shortLabel: 'ZH-Hans',
    hreflang: 'zh-Hans',
    htmlLang: 'zh-Hans',
    dir: 'ltr',
    ogLocale: 'zh_CN',
    systemFontsOnly: true,
  },
  {
    code: 'ja',
    urlPrefix: 'ja',
    nativeName: '日本語',
    shortLabel: 'JA',
    hreflang: 'ja',
    htmlLang: 'ja',
    dir: 'ltr',
    ogLocale: 'ja_JP',
    systemFontsOnly: true,
  },
  {
    code: 'pl',
    urlPrefix: 'pl',
    nativeName: 'Polski',
    shortLabel: 'PL',
    hreflang: 'pl',
    htmlLang: 'pl',
    dir: 'ltr',
    ogLocale: 'pl_PL',
  },
  {
    code: 'pt-br',
    urlPrefix: 'pt-br',
    nativeName: 'Português (Brasil)',
    shortLabel: 'PT-BR',
    hreflang: 'pt-BR',
    htmlLang: 'pt-BR',
    dir: 'ltr',
    ogLocale: 'pt_BR',
  },
] as const satisfies readonly LocaleConfigEntry[];
