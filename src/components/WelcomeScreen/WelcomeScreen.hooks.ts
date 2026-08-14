import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { useRestaurantsStore } from '../../restaurants';
import { ROUTES } from '../../routes';

export const useWelcomeScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const fetchRestaurants = useRestaurantsStore((state) => state.fetchRestaurants);

  // Prefetch invisibly so the restaurant list is already warm by the time the
  // user reaches RegistrationScreen — that screen fetches it too, but the
  // store no-ops if this already loaded it.
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleStart = () => {
    navigate(ROUTES.registration);
  };

  return { t, handleStart };
};
