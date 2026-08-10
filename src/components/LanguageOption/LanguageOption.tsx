import * as S from './LanguageOption.styles';
import { useLanguageOption } from './LanguageOption.hooks';
import type { LanguageOptionProps } from './LanguageOption.types';

export const LanguageOption = (props: LanguageOptionProps) => {
  const { flag } = props;
  const { selected, label, handleClick } = useLanguageOption(props);

  return (
    <S.Option
      type="button"
      $selected={selected}
      aria-pressed={selected}
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
    >
      <S.Content>
        <S.Flag aria-hidden="true">{flag}</S.Flag>
        <S.Label>{label}</S.Label>
      </S.Content>
      <S.CheckIcon $selected={selected} aria-hidden="true" />
    </S.Option>
  );
};
