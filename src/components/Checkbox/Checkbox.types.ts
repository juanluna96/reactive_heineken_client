export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  prefix: string;
  linkText: string;
  suffix: string;
  error?: string;
}
