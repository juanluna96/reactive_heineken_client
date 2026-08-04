import { useMemo, useState, type ReactNode } from 'react';
import { LanguageContext } from './context';
import { DEFAULT_LANGUAGE, translations } from './translations';
import type { Language, LanguageContextValue } from './types';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t: translations[language] }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
