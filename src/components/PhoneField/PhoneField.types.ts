import type { IconType } from 'react-icons';

export interface PhoneFieldProps {
  /** Icon for the national-number field (the country field uses a globe). */
  icon: IconType;
  /** Label above the national-number field. */
  label: string;
  /** Placeholder for the national-number field. */
  placeholder: string;
  /** Label above the country dial-code picker. */
  countryLabel: string;
  /** "No results" text for the country picker's dropdown. */
  countryNoResults: string;
  /** ISO 3166-1 alpha-2 code of the selected dialing-code country. */
  country: string;
  onCountryChange: (country: string) => void;
  /** National number, as the customer typed it (digits/spaces/dashes, no prefix). */
  number: string;
  onNumberChange: (value: string) => void;
  error?: string;
}
