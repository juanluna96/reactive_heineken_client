import { useNavigate } from 'react-router-dom';
import { logout as logoutRequest } from '../../api';
import { useAuthStore } from '../../auth';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';
import { initialsFromName } from '../../utils/initialsFromName';

export const useAdminSidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const currentUser = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } finally {
      clearUser();
      navigate(ROUTES.authLogin);
    }
  };

  return {
    t,
    currentUser,
    currentUserInitials: currentUser ? initialsFromName(currentUser.full_name) : '',
    // Mirrors App.tsx's ProtectedRoute allowedRoles for each admin route —
    // the nav item for a route the current role can't see is hidden
    // entirely rather than shown disabled. Restaurants/Beer Masters have no
    // equivalent flag since every role can already see those.
    canViewDashboard: currentUser?.role === 'owner' || currentUser?.role === 'heineken',
    handleLogout,
    handleGoToDashboard: () => navigate(ROUTES.adminHome),
    handleGoToRestaurants: () => navigate(ROUTES.adminRestaurants),
    handleGoToBeerMasters: () => navigate(ROUTES.adminBeerMasters),
  };
};
