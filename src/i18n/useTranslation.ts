import { useLanguageStore } from './store';
import type { LanguageState } from './types';

export const useTranslation = (): LanguageState => useLanguageStore();
