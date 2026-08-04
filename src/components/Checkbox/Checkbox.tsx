import * as S from './Checkbox.styles';
import { useCheckbox } from './Checkbox.hooks';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = (props: CheckboxProps) => {
  const { checked, prefix, linkText, suffix } = props;
  const { handleChange } = useCheckbox(props);

  return (
    <S.Wrapper>
      <S.Input type="checkbox" checked={checked} onChange={handleChange} />
      <S.Label>
        {prefix}
        <S.LinkText>{linkText}</S.LinkText>
        {suffix}
      </S.Label>
    </S.Wrapper>
  );
};
