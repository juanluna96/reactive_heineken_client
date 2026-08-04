export interface SelectFieldOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  icon: string;
  chevronIcon: string;
  label: string;
  placeholder: string;
  options: SelectFieldOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
