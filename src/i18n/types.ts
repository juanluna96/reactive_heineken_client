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

export interface RegistrationDictionary {
  title: string;
  subtitle: string;
  name: {
    label: string;
    placeholder: string;
  };
  email: {
    label: string;
    placeholder: string;
  };
  restaurant: {
    label: string;
    placeholder: string;
  };
  consent: {
    prefix: string;
    linkText: string;
    suffix: string;
  };
  cta: string;
  step: string;
  errors: {
    nameRequired: string;
    emailInvalid: string;
    restaurantRequired: string;
    consentRequired: string;
  };
}

export interface TranslationDictionary {
  welcome: WelcomeDictionary;
  registration: RegistrationDictionary;
}

export interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationDictionary;
}
