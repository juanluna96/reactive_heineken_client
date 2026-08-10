import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';

export const useThankYouScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate(ROUTES.welcome);
  };

  return { t, handleRestart };
};
