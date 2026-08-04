import type { IconType } from 'react-icons';

export interface SelectFieldOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  icon: IconType;
  chevronIcon: IconType;
  label: string;
  placeholder: string;
  options: SelectFieldOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
