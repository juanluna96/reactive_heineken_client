import { pageVariants } from '../../animations/variants';
import * as S from './PageTransition.styles';
import type { PageTransitionProps } from './PageTransition.types';

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <S.Wrapper initial="initial" animate="animate" exit="exit" variants={pageVariants}>
      {children}
    </S.Wrapper>
  );
};
