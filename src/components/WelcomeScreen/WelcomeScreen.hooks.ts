import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';

export const useWelcomeScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(ROUTES.registration);
  };

  return { t, handleStart };
};
