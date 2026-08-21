import type { IconType } from 'react-icons';

export interface FilterDropdownOption {
  value: string;
  label: string;
}

export interface FilterDropdownProps {
  icon: IconType;
  label: string;
  value: string;
  options: FilterDropdownOption[];
  onChange: (value: string) => void;
}
