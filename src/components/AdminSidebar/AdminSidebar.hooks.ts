import { useState } from 'react';
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

  // Below ADMIN_DESKTOP_BREAKPOINT the sidebar is an off-canvas drawer
  // (see AdminSidebar.styles.ts) toggled by a floating menu button — this
  // state is irrelevant at desktop widths, where the drawer's CSS forces it
  // permanently open regardless.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((open) => !open);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Every nav action closes the drawer afterward — irrelevant/no-op at
  // desktop widths where it's already permanently open.
  const navigateAndClose = (path: string) => {
    navigate(path);
    closeMobileMenu();
  };

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } finally {
      clearUser();
      navigate(ROUTES.authLogin);
      closeMobileMenu();
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
    // Settings (restaurant/beer master CRUD) is owner-only, per App.tsx's
    // ProtectedRoute allowedRoles for ROUTES.adminSettings.
    canViewSettings: currentUser?.role === 'owner',
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    handleLogout,
    handleGoToDashboard: () => navigateAndClose(ROUTES.adminHome),
    handleGoToRestaurants: () => navigateAndClose(ROUTES.adminRestaurants),
    handleGoToBeerMasters: () => navigateAndClose(ROUTES.adminBeerMasters),
    handleGoToRatings: () => navigateAndClose(ROUTES.adminRatings),
    handleGoToSettings: () => navigateAndClose(ROUTES.adminSettings),
  };
};
