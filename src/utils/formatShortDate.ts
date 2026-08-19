import type { Language } from '../i18n/types';

export const formatShortDate = (isoDate: string, language: Language): string =>
  new Intl.DateTimeFormat(language, { day: '2-digit', month: 'short' }).format(new Date(`${isoDate}T00:00:00Z`));
