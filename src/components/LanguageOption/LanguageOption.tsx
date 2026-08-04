import checkCircleIcon from '../../assets/welcome/check-circle.svg';
import * as S from './LanguageOption.styles';
import { useLanguageOption } from './LanguageOption.hooks';
import type { LanguageOptionProps } from './LanguageOption.types';

export const LanguageOption = (props: LanguageOptionProps) => {
  const { flag } = props;
  const { selected, label, handleClick } = useLanguageOption(props);

  return (
    <S.Option type="button" $selected={selected} aria-pressed={selected} onClick={handleClick}>
      <S.Content>
        <S.Flag aria-hidden="true">{flag}</S.Flag>
        <S.Label>{label}</S.Label>
      </S.Content>
      <S.CheckIcon src={checkCircleIcon} $selected={selected} alt="" aria-hidden="true" />
    </S.Option>
  );
};
