import { Navigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';
import * as S from './ProtectedRoute.styles';
import { useProtectedRoute } from './ProtectedRoute.hooks';
import type { ProtectedRouteProps } from './ProtectedRoute.types';

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { t } = useTranslation();
  const { isChecking, isAuthenticated } = useProtectedRoute();

  if (isChecking) {
    return (
      <S.LoadingScreen>
        <S.LoadingText>{t.auth.checkingSession}</S.LoadingText>
      </S.LoadingScreen>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.authLogin} replace />;
  }

  return children;
};
