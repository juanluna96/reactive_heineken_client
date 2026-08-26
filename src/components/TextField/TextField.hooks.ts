import { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import type { TextFieldProps } from './TextField.types';

export const useTextField = ({ onChange, onEnter, type = 'text' }: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onEnter?.();
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((visible) => !visible);
  };

  const isPasswordField = type === 'password';
  const inputType = isPasswordField && isPasswordVisible ? 'text' : type;

  return { inputType, isPasswordField, isPasswordVisible, handleChange, handleKeyDown, togglePasswordVisibility };
};
