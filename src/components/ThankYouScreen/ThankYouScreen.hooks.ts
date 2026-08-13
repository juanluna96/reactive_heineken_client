import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { useRatingStore } from '../../rating';
import { useRegistrationStore } from '../../registration';
import { ROUTES } from '../../routes';
import { useWatchExperienceStore } from '../../watchExperience';

export const useThankYouScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const resetRating = useRatingStore((state) => state.reset);
  const resetRegistration = useRegistrationStore((state) => state.reset);
  const resetWatchExperience = useWatchExperienceStore((state) => state.reset);

  const handleRestart = () => {
    resetRating();
    resetRegistration();
    resetWatchExperience();
    navigate(ROUTES.welcome);
  };

  return { t, handleRestart };
};
