import type { IconType } from 'react-icons';

export interface AutocompleteFieldOption {
  value: string;
  label: string;
}

export interface AutocompleteFieldProps {
  icon: IconType;
  label: string;
  placeholder: string;
  options: AutocompleteFieldOption[];
  value: string;
  onChange: (value: string) => void;
  noResultsText: string;
  error?: string;
  /** When true, typing a value with no match in `options` is kept as free
   *  text on blur instead of being cleared — for fields where an
   *  unregistered value (e.g. a new Stars Server) can still be submitted. */
  allowCustomValue?: boolean;
  /** Current free-text value from the caller's state, shown when nothing in
   *  `options` is selected. Only relevant when `allowCustomValue` is true. */
  freeTextValue?: string;
  /** Fired with the raw typed text whenever it no longer matches an option.
   *  Only relevant when `allowCustomValue` is true. */
  onCustomValueChange?: (query: string) => void;
}
