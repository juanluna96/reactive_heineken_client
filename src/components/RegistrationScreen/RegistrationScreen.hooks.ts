import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { useRegistrationStore } from '../../registration';
import { useRestaurantsStore } from '../../restaurants';
import { ROUTES } from '../../routes';
import type { AutocompleteFieldOption } from '../AutocompleteField';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useRegistrationScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const name = useRegistrationStore((state) => state.name);
  const setName = useRegistrationStore((state) => state.setName);
  const email = useRegistrationStore((state) => state.email);
  const setEmail = useRegistrationStore((state) => state.setEmail);
  const restaurantId = useRegistrationStore((state) => state.restaurantId);
  const setRestaurantId = useRegistrationStore((state) => state.setRestaurantId);
  const accepted = useRegistrationStore((state) => state.accepted);
  const setAccepted = useRegistrationStore((state) => state.setAccepted);
  const [submitted, setSubmitted] = useState(false);

  // No-ops if WelcomeScreen already prefetched this — only actually fetches
  // when someone lands here directly without going through Welcome first.
  const restaurants = useRestaurantsStore((state) => state.restaurants);
  const fetchRestaurants = useRestaurantsStore((state) => state.fetchRestaurants);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const restaurantOptions: AutocompleteFieldOption[] = restaurants.map((restaurant) => ({
    value: restaurant.id,
    label: restaurant.name,
  }));

  const isNameValid = name.trim().length > 0;
  const isEmailValid = EMAIL_PATTERN.test(email);
  const isRestaurantValid = restaurantId !== '';
  const isFormValid = isNameValid && isEmailValid && isRestaurantValid && accepted;

  const nameError = submitted && !isNameValid ? t.registration.errors.nameRequired : undefined;
  const emailError = submitted && !isEmailValid ? t.registration.errors.emailInvalid : undefined;
  const restaurantError = submitted && !isRestaurantValid ? t.registration.errors.restaurantRequired : undefined;
  const consentError = submitted && !accepted ? t.registration.errors.consentRequired : undefined;

  const handleBack = () => {
    navigate(ROUTES.welcome);
  };

  const handleContinue = () => {
    if (!isFormValid) {
      setSubmitted(true);
      return;
    }
    navigate(ROUTES.watchExperience);
  };

  return {
    t,
    name,
    email,
    restaurant: restaurantId,
    accepted,
    restaurantOptions,
    isFormValid,
    nameError,
    emailError,
    restaurantError,
    consentError,
    setName,
    setEmail,
    setRestaurant: setRestaurantId,
    setAccepted,
    handleBack,
    handleContinue,
  };
};
