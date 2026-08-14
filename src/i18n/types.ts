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

export interface WatchExperienceDictionary {
  title: string;
  subtitle: string;
  durationLabel: string;
  timerLabel: string;
  helper: string;
  autoplayMessage: string;
  cta: string;
  step: string;
}

export interface RateBeerMasterDictionary {
  beerMasterLabel: string;
  namePlaceholder: string;
  title: string;
  subtitle: string;
  tierMessages: string[];
  opinionLabel: string;
  opinionPlaceholder: string;
  cta: string;
  step: string;
  errors: {
    nameRequired: string;
    ratingRequired: string;
    submitFailed: string;
  };
}

export interface ThankYouDictionary {
  title: string;
  confirmation: string;
  supportingText: string;
  cta: string;
  footer: string;
}

export interface TranslationDictionary {
  welcome: WelcomeDictionary;
  registration: RegistrationDictionary;
  watchExperience: WatchExperienceDictionary;
  rateBeerMaster: RateBeerMasterDictionary;
  thankYou: ThankYouDictionary;
}

export interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationDictionary;
}
