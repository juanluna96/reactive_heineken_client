import type { IconType } from 'react-icons';

export interface TextFieldProps {
  icon: IconType;
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
