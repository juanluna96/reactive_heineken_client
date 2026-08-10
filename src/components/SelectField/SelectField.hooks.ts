import type { ChangeEvent } from 'react';
import type { SelectFieldProps } from './SelectField.types';

export const useSelectField = ({ value, onChange }: SelectFieldProps) => {
  const hasValue = value !== '';

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return { hasValue, handleChange };
};
