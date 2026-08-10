import { useTranslation } from '../../i18n';
import type { LanguageOptionProps } from './LanguageOption.types';

export const useLanguageOption = ({ language }: LanguageOptionProps) => {
  const { t, language: currentLanguage, setLanguage } = useTranslation();

  const selected = currentLanguage === language;
  const label = t.welcome.languageOptions[language];

  const handleClick = () => {
    setLanguage(language);
  };

  return { selected, label, handleClick };
};
