import * as S from './Checkbox.styles';
import { useCheckbox } from './Checkbox.hooks';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = (props: CheckboxProps) => {
  const { checked, prefix, linkText, suffix, error } = props;
  const { handleChange } = useCheckbox(props);

  return (
    <S.Container>
      <S.Wrapper>
        <S.Input type="checkbox" checked={checked} onChange={handleChange} $hasError={Boolean(error)} />
        <S.Label>
          {prefix}
          <S.LinkText>{linkText}</S.LinkText>
          {suffix}
        </S.Label>
      </S.Wrapper>
      {error && <S.ErrorText>{error}</S.ErrorText>}
    </S.Container>
  );
};
