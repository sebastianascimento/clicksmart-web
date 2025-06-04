export const locales = ['pt', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt';

export const localeNames = {
  pt: 'Português',
  en: 'English',
} as const;