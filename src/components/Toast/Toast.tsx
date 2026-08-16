import { toastVariants } from '../../animations/variants';
import * as S from './Toast.styles';
import { useToast } from './Toast.hooks';
import type { ToastProps } from './Toast.types';

export const Toast = (props: ToastProps) => {
  const { message } = props;
  useToast(props);

  return (
    <S.Wrapper role="alert" initial="hidden" animate="visible" exit="exit" variants={toastVariants}>
      <S.Icon aria-hidden="true" />
      <S.Message>{message}</S.Message>
    </S.Wrapper>
  );
};
