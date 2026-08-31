import { useMemo } from 'react';
import { useTranslation } from '../../i18n';
import type { AutocompleteFieldOption } from '../AutocompleteField';
import { COUNTRY_DIAL_CODES, dialCodeFor, flagFor } from './countries';
import type { PhoneFieldProps } from './PhoneField.types';

export const usePhoneField = ({ country, onNumberChange }: PhoneFieldProps) => {
  const { language } = useTranslation();

  const countryOptions = useMemo<AutocompleteFieldOption[]>(() => {
    let regionNames: Intl.DisplayNames | undefined;
    try {
      regionNames = new Intl.DisplayNames([language], { type: 'region' });
    } catch {
      regionNames = undefined;
    }

    return COUNTRY_DIAL_CODES.map(({ iso, dial }) => ({ iso, dial, name: regionNames?.of(iso) ?? iso }))
      .sort((a, b) => a.name.localeCompare(b.name, language))
      // Dropdown rows: flag + code + country name, searchable by any of them.
      .map(({ iso, dial, name }) => ({ value: iso, label: `${flagFor(iso)} +${dial} ${name}` }));
  }, [language]);

  // Collapsed input: just the flag and the dial code, no country name.
  const dial = dialCodeFor(country);
  const collapsedLabel = dial ? `${flagFor(country)} +${dial}` : undefined;

  const handleNumberChange = (value: string) => {
    // Keep only what belongs in a national number as typed. The dial-code
    // prefix comes from the country picker, not this field.
    onNumberChange(value.replace(/[^\d\s()-]/g, ''));
  };

  return { countryOptions, collapsedLabel, handleNumberChange };
};
