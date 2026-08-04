import arrowRightIcon from '../../assets/welcome/arrow-right.svg';
import * as S from './PrimaryButton.styles';
import { usePrimaryButton } from './PrimaryButton.hooks';
import type { PrimaryButtonProps } from './PrimaryButton.types';

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const { children } = props;
  const { handleClick } = usePrimaryButton(props);

  return (
    <S.Button type="button" onClick={handleClick}>
      <S.Label>{children}</S.Label>
      <S.Icon src={arrowRightIcon} alt="" aria-hidden="true" />
    </S.Button>
  );
};
