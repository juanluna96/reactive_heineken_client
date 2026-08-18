import type { TranslationDictionary } from '../i18n/types';

export const formatRelativeTime = (isoDate: string, dictionary: TranslationDictionary['adminDashboard']['time']): string => {
  const diffSeconds = Math.max(0, (Date.now() - new Date(isoDate).getTime()) / 1000);

  if (diffSeconds < 60) return dictionary.justNow;
  if (diffSeconds < 3600) return dictionary.minutesAgo.replace('{value}', String(Math.floor(diffSeconds / 60)));
  if (diffSeconds < 86400) return dictionary.hoursAgo.replace('{value}', String(Math.floor(diffSeconds / 3600)));
  return dictionary.daysAgo.replace('{value}', String(Math.floor(diffSeconds / 86400)));
};
