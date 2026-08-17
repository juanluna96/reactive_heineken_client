import type { IconType } from 'react-icons';

export interface AutocompleteFieldOption {
  value: string;
  label: string;
}

export interface AutocompleteFieldProps {
  icon: IconType;
  label: string;
  placeholder: string;
  options: AutocompleteFieldOption[];
  value: string;
  onChange: (value: string) => void;
  noResultsText: string;
  error?: string;
}
