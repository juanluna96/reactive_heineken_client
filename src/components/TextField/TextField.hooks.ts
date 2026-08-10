import type { ChangeEvent } from 'react';
import type { TextFieldProps } from './TextField.types';

export const useTextField = ({ onChange }: TextFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return { handleChange };
};
