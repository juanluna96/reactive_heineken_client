import { AnimatePresence } from 'framer-motion';
import { errorMessageVariants } from '../../animations/variants';
import * as S from './SelectField.styles';
import { useSelectField } from './SelectField.hooks';
import type { SelectFieldProps } from './SelectField.types';

export const SelectField = (props: SelectFieldProps) => {
  const { icon: Icon, chevronIcon: ChevronIcon, label, placeholder, options, value, error } = props;
  const { hasValue, handleChange } = useSelectField(props);

  return (
    <S.Field>
      <S.LabelRow>
        <S.Icon aria-hidden="true">
          <Icon />
        </S.Icon>
        <S.Label>{label}</S.Label>
      </S.LabelRow>
      <S.SelectWrapper>
        <S.Select value={value} onChange={handleChange} $hasValue={hasValue} $hasError={Boolean(error)}>
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </S.Select>
        <S.ChevronIcon aria-hidden="true">
          <ChevronIcon />
        </S.ChevronIcon>
      </S.SelectWrapper>
      <AnimatePresence>
        {error && (
          <S.ErrorText initial="hidden" animate="visible" exit="exit" variants={errorMessageVariants}>
            {error}
          </S.ErrorText>
        )}
      </AnimatePresence>
    </S.Field>
  );
};
