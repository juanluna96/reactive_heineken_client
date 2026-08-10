import { create } from 'zustand';
import { DEFAULT_LANGUAGE, translations } from './translations';
import type { LanguageState } from './types';

export const useLanguageStore = create<LanguageState>((set) => ({
  language: DEFAULT_LANGUAGE,
  t: translations[DEFAULT_LANGUAGE],
  setLanguage: (language) => set({ language, t: translations[language] }),
}));
