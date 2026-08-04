export type Language = 'es' | 'en';

export interface WelcomeDictionary {
  title: string;
  subtitle: string;
  languageOptions: {
    es: string;
    en: string;
  };
  cta: string;
  footer: string;
}

export interface TranslationDictionary {
  welcome: WelcomeDictionary;
}

export interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationDictionary;
}
