import arrowRightIcon from '../../assets/icons/arrow-right.svg';
import * as S from './PrimaryButton.styles';
import { usePrimaryButton } from './PrimaryButton.hooks';
import type { PrimaryButtonProps } from './PrimaryButton.types';

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const { children, disabled = false } = props;
  const { handleClick } = usePrimaryButton(props);

  return (
    <S.Button type="button" onClick={handleClick} aria-disabled={disabled} $disabled={disabled}>
      <S.Label>{children}</S.Label>
      <S.Icon src={arrowRightIcon} alt="" aria-hidden="true" />
    </S.Button>
  );
};
