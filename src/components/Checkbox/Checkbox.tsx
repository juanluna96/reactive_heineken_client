import { AnimatePresence } from 'framer-motion';
import { errorMessageVariants } from '../../animations/variants';
import * as S from './Checkbox.styles';
import { useCheckbox } from './Checkbox.hooks';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = (props: CheckboxProps) => {
  const { checked, prefix, linkText, linkHref, suffix, error } = props;
  const { handleChange } = useCheckbox(props);

  return (
    <S.Container>
      <S.Wrapper>
        <S.Input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          $hasError={Boolean(error)}
          whileTap={{ scale: 0.85 }}
        />
        <S.Label>
          {prefix}
          {linkText &&
            (linkHref ? (
              <S.LinkText as="a" href={linkHref} target="_blank" rel="noopener noreferrer">
                {linkText}
              </S.LinkText>
            ) : (
              <S.LinkText>{linkText}</S.LinkText>
            ))}
          {suffix}
        </S.Label>
      </S.Wrapper>
      <AnimatePresence>
        {error && (
          <S.ErrorText initial="hidden" animate="visible" exit="exit" variants={errorMessageVariants}>
            {error}
          </S.ErrorText>
        )}
      </AnimatePresence>
    </S.Container>
  );
};
