import * as S from './PrimaryButton.styles';
import { usePrimaryButton } from './PrimaryButton.hooks';
import type { PrimaryButtonProps } from './PrimaryButton.types';

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const { children, disabled = false, showIcon = true } = props;
  const { handleClick } = usePrimaryButton(props);

  return (
    <S.Button
      type="button"
      onClick={handleClick}
      aria-disabled={disabled}
      $disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
    >
      <S.Label>{children}</S.Label>
      {showIcon && <S.Icon aria-hidden="true" />}
    </S.Button>
  );
};
