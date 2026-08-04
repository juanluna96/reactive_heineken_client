export type Language = 'es' | 'en';

export interface TranslationDictionary {
  welcome: {
    title: string;
    subtitle: string;
  };
  languageOptions: {
    es: string;
    en: string;
  };
  cta: string;
  footer: string;
}

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationDictionary;
}
