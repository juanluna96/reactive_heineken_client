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
    noResults: string;
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
    alreadyRated: string;
  };
}

export interface WatchExperienceDictionary {
  title: string;
  subtitle: string;
  durationLabel: string;
  timerLabel: string;
  helper: string;
  playButtonLabel: string;
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
    alreadyRated: string;
  };
}

export interface ThankYouDictionary {
  title: string;
  confirmation: string;
  supportingText: string;
  cta: string;
  footer: string;
}

export interface AdminDashboardDictionary {
  pageTitle: string;
  pageSubtitle: string;
  periodLabel: string;
  refreshLabel: string;
  nav: {
    dashboard: string;
    restaurants: string;
    beerMasters: string;
    ratings: string;
    settings: string;
  };
  kpis: {
    totalRatings: string;
    averageRating: string;
    restaurantsRegistered: string;
    newRestaurants: string;
    beerMastersRegistered: string;
    newBeerMasters: string;
  };
  chart: {
    title: string;
    subtitle: string;
    empty: string;
  };
  rankings: {
    title: string;
    rank: string;
    master: string;
    restaurant: string;
    reviews: string;
    avgRating: string;
    empty: string;
  };
  distribution: {
    title: string;
    fiveStarShare: string;
    ratingLabel: string;
  };
  feed: {
    title: string;
    empty: string;
    noComment: string;
  };
  time: {
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    daysAgo: string;
  };
  states: {
    loading: string;
    error: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
}

export interface AuthDictionary {
  checkingSession: string;
  login: {
    title: string;
    subtitle: string;
    email: { label: string; placeholder: string };
    password: { label: string; placeholder: string };
    forgotPassword: string;
    cta: string;
    noAccount: string;
    registerLink: string;
    errors: {
      emailInvalid: string;
      passwordRequired: string;
      invalidCredentials: string;
      generic: string;
    };
  };
  register: {
    title: string;
    subtitle: string;
    fullName: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    affiliation: { label: string; placeholder: string; noResults: string; heinekenOption: string };
    password: { label: string; placeholder: string };
    confirmPassword: { label: string; placeholder: string };
    cta: string;
    hasAccount: string;
    loginLink: string;
    errors: {
      fullNameRequired: string;
      emailInvalid: string;
      affiliationRequired: string;
      passwordTooShort: string;
      passwordMismatch: string;
      emailTaken: string;
      generic: string;
    };
  };
  rememberPassword: {
    title: string;
    subtitle: string;
    email: { label: string; placeholder: string };
    cta: string;
    backToLogin: string;
    errors: {
      emailInvalid: string;
      generic: string;
    };
    confirmation: {
      title: string;
      message: string;
      cta: string;
    };
  };
  resetPassword: {
    title: string;
    subtitle: string;
    password: { label: string; placeholder: string };
    confirmPassword: { label: string; placeholder: string };
    cta: string;
    backToLogin: string;
    errors: {
      passwordTooShort: string;
      passwordMismatch: string;
      invalidToken: string;
      generic: string;
    };
    confirmation: {
      title: string;
      message: string;
      cta: string;
    };
    invalidLink: {
      title: string;
      message: string;
      cta: string;
    };
  };
}

export interface AdminRestaurantsDictionary {
  pageTitle: string;
  pageSubtitle: string;
  refreshLabel: string;
  ratingsCount: string;
  noRatings: string;
  ownRestaurantBadge: string;
  sort: {
    label: string;
    rating: string;
    popularity: string;
    newest: string;
  };
  search: {
    placeholder: string;
    noResults: string;
  };
  pagination: {
    previous: string;
    next: string;
    indicator: string;
  };
  beerMasters: {
    toggle: string;
    empty: string;
  };
  states: {
    loading: string;
    error: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
}

export interface AdminBeerMastersDictionary {
  pageTitle: string;
  pageSubtitle: string;
  refreshLabel: string;
  ratingsCount: string;
  noRatings: string;
  ownBadge: string;
  sort: {
    label: string;
    rating: string;
    popularity: string;
    newest: string;
  };
  restaurantFilter: {
    label: string;
    all: string;
    empty: string;
  };
  search: {
    placeholder: string;
    noResults: string;
  };
  pagination: {
    previous: string;
    next: string;
    indicator: string;
  };
  states: {
    loading: string;
    error: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
}

export interface AdminRatingsDictionary {
  pageTitle: string;
  pageSubtitle: string;
  refreshLabel: string;
  stats: {
    averageLabel: string;
    totalLabel: string;
    totalNote: string;
    positiveLabel: string;
    positiveNote: string;
    trendUp: string;
    trendDown: string;
  };
  restaurantFilter: {
    label: string;
    all: string;
  };
  ratingFilter: {
    label: string;
    all: string;
    five: string;
    four: string;
    threeOrLess: string;
  };
  clearFilters: string;
  search: {
    placeholder: string;
    noResults: string;
  };
  restaurantLabel: string;
  beerMasterLabel: string;
  loadMore: string;
  states: {
    loading: string;
    error: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
}

export interface AdminSettingsFormDictionary {
  addTitle: string;
  editTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  cancel: string;
  save: string;
  saving: string;
}

export interface AdminSettingsDeleteConfirmDictionary {
  title: string;
  message: string;
  cancel: string;
  confirm: string;
  deleting: string;
}

export interface AdminSettingsErrorsDictionary {
  nameRequired: string;
  duplicate: string;
  generic: string;
}

export interface AdminSettingsDictionary {
  pageTitle: string;
  pageSubtitle: string;
  tabs: {
    restaurants: string;
    beerMasters: string;
  };
  restaurants: {
    addButton: string;
    emptyTitle: string;
    emptySubtitle: string;
    editAction: string;
    deleteAction: string;
    form: AdminSettingsFormDictionary;
    deleteConfirm: AdminSettingsDeleteConfirmDictionary;
    errors: AdminSettingsErrorsDictionary;
  };
  beerMasters: {
    restaurantPicker: {
      label: string;
      placeholder: string;
    };
    addButton: string;
    selectRestaurantTitle: string;
    selectRestaurantSubtitle: string;
    emptyTitle: string;
    emptySubtitle: string;
    editAction: string;
    deleteAction: string;
    form: AdminSettingsFormDictionary;
    deleteConfirm: AdminSettingsDeleteConfirmDictionary;
    errors: AdminSettingsErrorsDictionary;
  };
  states: {
    loading: string;
    error: string;
  };
}

export interface TranslationDictionary {
  welcome: WelcomeDictionary;
  registration: RegistrationDictionary;
  watchExperience: WatchExperienceDictionary;
  rateBeerMaster: RateBeerMasterDictionary;
  thankYou: ThankYouDictionary;
  adminDashboard: AdminDashboardDictionary;
  adminRestaurants: AdminRestaurantsDictionary;
  adminBeerMasters: AdminBeerMastersDictionary;
  adminRatings: AdminRatingsDictionary;
  adminSettings: AdminSettingsDictionary;
  auth: AuthDictionary;
}

export interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationDictionary;
}
