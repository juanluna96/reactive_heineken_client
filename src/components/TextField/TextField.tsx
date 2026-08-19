import { AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { errorMessageVariants } from '../../animations/variants';
import * as S from './TextField.styles';
import { useTextField } from './TextField.hooks';
import type { TextFieldProps } from './TextField.types';

export const TextField = (props: TextFieldProps) => {
  const { icon: Icon, label, placeholder, value, error } = props;
  const { inputType, isPasswordField, isPasswordVisible, handleChange, togglePasswordVisibility } =
    useTextField(props);

  return (
    <S.Field>
      <S.LabelRow>
        <S.Icon aria-hidden="true">
          <Icon />
        </S.Icon>
        <S.Label>{label}</S.Label>
      </S.LabelRow>
      <S.InputWrapper>
        <S.Input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          $hasError={Boolean(error)}
          $hasToggle={isPasswordField}
        />
        {isPasswordField && (
          <S.ToggleVisibilityButton
            type="button"
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </S.ToggleVisibilityButton>
        )}
      </S.InputWrapper>
      <AnimatePresence>
        {error && (
          <S.ErrorText initial="hidden" animate="visible" exit="exit" variants={errorMessageVariants}>
            {error}
          </S.ErrorText>
        )}
      </AnimatePresence>
    </S.Field>
  );
};
