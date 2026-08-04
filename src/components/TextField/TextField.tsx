import * as S from './TextField.styles';
import { useTextField } from './TextField.hooks';
import type { TextFieldProps } from './TextField.types';

export const TextField = (props: TextFieldProps) => {
  const { icon, label, placeholder, type = 'text', value, error } = props;
  const { handleChange } = useTextField(props);

  return (
    <S.Field>
      <S.LabelRow>
        <S.Icon src={icon} alt="" aria-hidden="true" />
        <S.Label>{label}</S.Label>
      </S.LabelRow>
      <S.Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        $hasError={Boolean(error)}
      />
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.Field>
  );
};
