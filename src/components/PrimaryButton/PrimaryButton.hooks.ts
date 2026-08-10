import type { PrimaryButtonProps } from './PrimaryButton.types';

export const usePrimaryButton = ({ onClick }: PrimaryButtonProps) => {
  const handleClick = () => {
    onClick?.();
  };

  return { handleClick };
};
