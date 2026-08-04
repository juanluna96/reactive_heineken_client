import type { Language } from '../../i18n';

export interface LanguageOptionProps {
  language: Language;
  flag: string;
  label: string;
  selected: boolean;
  onSelect: (language: Language) => void;
}
