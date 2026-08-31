import { FaEarthAmericas } from 'react-icons/fa6';
import { AutocompleteField } from '../AutocompleteField';
import { TextField } from '../TextField';
import * as S from './PhoneField.styles';
import { usePhoneField } from './PhoneField.hooks';
import type { PhoneFieldProps } from './PhoneField.types';

export const PhoneField = (props: PhoneFieldProps) => {
  const { icon, label, placeholder, countryLabel, countryNoResults, country, onCountryChange, number, error } = props;
  const { countryOptions, collapsedLabel, handleNumberChange } = usePhoneField(props);

  return (
    <S.Row>
      <AutocompleteField
        icon={FaEarthAmericas}
        label={countryLabel}
        placeholder={countryLabel}
        options={countryOptions}
        value={country}
        onChange={onCountryChange}
        collapsedLabel={collapsedLabel}
        noResultsText={countryNoResults}
        dropdownMinWidth={260}
      />
      <TextField
        icon={icon}
        label={label}
        placeholder={placeholder}
        type="tel"
        value={number}
        onChange={handleNumberChange}
        error={error}
      />
    </S.Row>
  );
};
