import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { TextFieldProps } from './TextField.types';

export const useTextField = ({ onChange, type = 'text' }: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((visible) => !visible);
  };

  const isPasswordField = type === 'password';
  const inputType = isPasswordField && isPasswordVisible ? 'text' : type;

  return { inputType, isPasswordField, isPasswordVisible, handleChange, togglePasswordVisibility };
};
