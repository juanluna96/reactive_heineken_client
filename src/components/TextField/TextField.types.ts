import type { IconType } from 'react-icons';

export interface TextFieldProps {
  icon: IconType;
  label: string;
  placeholder: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  /** Called when Enter is pressed in the field — wire to a form's submit handler. */
  onEnter?: () => void;
  error?: string;
}
