import { Navigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { getDefaultAdminRoute, ROUTES } from '../../routes';
import * as S from './ProtectedRoute.styles';
import { useProtectedRoute } from './ProtectedRoute.hooks';
import type { ProtectedRouteProps } from './ProtectedRoute.types';

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { t } = useTranslation();
  const { isChecking, isAuthenticated, role } = useProtectedRoute();

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

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    // Redirect to this role's own landing page, not a hardcoded route — some
    // roles (e.g. restaurant) can't see /admin/home either, which would
    // otherwise bounce them straight into a second redirect.
    return <Navigate to={role ? getDefaultAdminRoute(role) : ROUTES.authLogin} replace />;
  }

  return children;
};
