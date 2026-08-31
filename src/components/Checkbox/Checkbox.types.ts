export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  prefix: string;
  /** Omit for a checkbox whose label is plain text with no embedded link (e.g. an opt-in with no linked policy). */
  linkText?: string;
  /** URL linkText navigates to (opens in a new tab). Required when linkText is set. */
  linkHref?: string;
  suffix?: string;
  error?: string;
}
