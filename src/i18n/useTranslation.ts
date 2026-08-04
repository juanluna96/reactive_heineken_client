import { useContext } from 'react';
import { LanguageContext } from './context';
import type { LanguageContextValue } from './types';

export const useTranslation = (): LanguageContextValue => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }

  return context;
};
