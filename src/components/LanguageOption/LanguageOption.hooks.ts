import type { LanguageOptionProps } from './LanguageOption.types';

export const useLanguageOption = ({ language, onSelect }: LanguageOptionProps) => {
  const handleClick = () => {
    onSelect(language);
  };

  return { handleClick };
};
