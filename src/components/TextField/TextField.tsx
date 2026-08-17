import { AnimatePresence } from 'framer-motion';
import { errorMessageVariants } from '../../animations/variants';
import * as S from './TextField.styles';
import { useTextField } from './TextField.hooks';
import type { TextFieldProps } from './TextField.types';

export const TextField = (props: TextFieldProps) => {
  const { icon: Icon, label, placeholder, type = 'text', value, error } = props;
  const { handleChange } = useTextField(props);

  return (
    <S.Field>
      <S.LabelRow>
        <S.Icon aria-hidden="true">
          <Icon />
        </S.Icon>
        <S.Label>{label}</S.Label>
      </S.LabelRow>
      <S.Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        $hasError={Boolean(error)}
      />
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
