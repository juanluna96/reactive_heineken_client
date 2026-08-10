import type { ChangeEvent } from 'react';
import type { CheckboxProps } from './Checkbox.types';

export const useCheckbox = ({ onChange }: CheckboxProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return { handleChange };
};
