import * as S from './TextField.styles';
import { useTextField } from './TextField.hooks';
import type { TextFieldProps } from './TextField.types';

export const TextField = (props: TextFieldProps) => {
  const { icon: Icon, label, placeholder, type = 'text', value, error } = props;
  const { handleChange } = useTextField(props);

  return (
    <S.Field>
      <S.LabelRow>
        <S.Icon aria-hidden="true">
          <Icon />
        </S.Icon>
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
