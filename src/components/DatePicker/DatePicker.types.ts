import type { IconType } from 'react-icons';

export interface DatePickerProps {
  icon: IconType;
  label: string;
  placeholder: string;
  /** ISO 'yyyy-mm-dd', or '' for no selection. */
  value: string;
  onChange: (value: string) => void;
  error?: string;
  /** ISO 'yyyy-mm-dd' — dates after this are disabled. */
  max?: string;
  /** ISO 'yyyy-mm-dd' — dates before this are disabled. */
  min?: string;
}

export interface DatePickerDay {
  iso: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}
