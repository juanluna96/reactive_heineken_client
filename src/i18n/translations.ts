import en from './languages/en.json';
import es from './languages/es.json';
import type { Language, TranslationDictionary } from './types';

export const DEFAULT_LANGUAGE: Language = 'es';

export const translations: Record<Language, TranslationDictionary> = { es, en };
