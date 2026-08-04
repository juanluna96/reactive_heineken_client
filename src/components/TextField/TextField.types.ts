export interface TextFieldProps {
  icon: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'email';
  value: string;
  onChange: (value: string) => void;
}
