import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';

export const useNotFoundScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // An unmatched /admin/* path goes back into the admin section (which
  // itself forwards to the login screen); everything else goes back to the
  // public kiosk entry point — same split as the app's other stray-route
  // handling, just surfaced as a page instead of an instant redirect.
  const isAdminPath = location.pathname.startsWith(ROUTES.admin);
  const target = isAdminPath ? ROUTES.admin : ROUTES.welcome;

  const handleGoHome = () => {
    navigate(target, { replace: true });
  };

  return {
    t,
    cta: isAdminPath ? t.notFound.adminCta : t.notFound.cta,
    handleGoHome,
  };
};
