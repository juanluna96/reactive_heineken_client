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
    // The Restaurantes ranking screen is owner-only — see AdminRestaurantsScreen
    // and ProtectedRoute's allowedRoles. Everyone else sees a static nav item.
    isOwner: currentUser?.role === 'owner',
    handleLogout,
    handleGoToDashboard: () => navigate(ROUTES.adminHome),
    handleGoToRestaurants: () => navigate(ROUTES.adminRestaurants),
  };
};
