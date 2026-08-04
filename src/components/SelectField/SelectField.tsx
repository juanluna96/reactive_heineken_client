import * as S from './SelectField.styles';
import { useSelectField } from './SelectField.hooks';
import type { SelectFieldProps } from './SelectField.types';

export const SelectField = (props: SelectFieldProps) => {
  const { icon, chevronIcon, label, placeholder, options, value } = props;
  const { hasValue, handleChange } = useSelectField(props);

  return (
    <S.Field>
      <S.LabelRow>
        <S.Icon src={icon} alt="" aria-hidden="true" />
        <S.Label>{label}</S.Label>
      </S.LabelRow>
      <S.SelectWrapper>
        <S.Select value={value} onChange={handleChange} $hasValue={hasValue}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.Select>
        <S.ChevronIcon src={chevronIcon} alt="" aria-hidden="true" />
      </S.SelectWrapper>
    </S.Field>
  );
};
