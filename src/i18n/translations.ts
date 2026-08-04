import type { Language, TranslationDictionary } from './types';

export const DEFAULT_LANGUAGE: Language = 'es';

export const translations: Record<Language, TranslationDictionary> = {
  es: {
    welcome: {
      title: 'BIENVENIDO',
      subtitle: 'Selecciona tu idioma para\ncomenzar la experiencia.',
    },
    languageOptions: {
      es: 'Español',
      en: 'English',
    },
    cta: 'COMENZAR EXPERIENCIA',
    footer: '© 2026 HEINEKEN EXPERIENCE. TODOS LOS\nDERECHOS RESERVADOS.',
  },
  en: {
    welcome: {
      title: 'WELCOME',
      subtitle: 'Select your preferred language to\nbegin your experience.',
    },
    languageOptions: {
      es: 'Español',
      en: 'English',
    },
    cta: 'START EXPERIENCE',
    footer: '© 2026 HEINEKEN EXPERIENCE. ALL RIGHTS\nRESERVED.',
  },
};
