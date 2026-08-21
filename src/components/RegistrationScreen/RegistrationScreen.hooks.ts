import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkRatingExists } from '../../api';
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
  const resultsConsent = useRegistrationStore((state) => state.resultsConsent);
  const setResultsConsent = useRegistrationStore((state) => state.setResultsConsent);
  const [submitted, setSubmitted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [alreadyRatedError, setAlreadyRatedError] = useState<string | undefined>(undefined);

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

  // Clear a stale "already rated" result once the customer changes either
  // half of the (restaurant, email) pair it was based on.
  useEffect(() => {
    setAlreadyRatedError(undefined);
  }, [email, restaurantId]);

  const handleBack = () => {
    navigate(ROUTES.ageVerification);
  };

  const handleDismissAlreadyRated = () => {
    setAlreadyRatedError(undefined);
  };

  const handleContinue = async () => {
    if (!isFormValid) {
      setSubmitted(true);
      return;
    }

    setIsChecking(true);
    setAlreadyRatedError(undefined);
    try {
      const alreadyRated = await checkRatingExists({ restaurant_id: restaurantId, customer_email: email });
      if (alreadyRated) {
        setAlreadyRatedError(t.registration.errors.alreadyRated);
        return;
      }
      navigate(ROUTES.watchExperience);
    } catch {
      // Check failed (e.g. network hiccup) — don't strand the customer here,
      // the same uniqueness rule is enforced again server-side at final submit.
      navigate(ROUTES.watchExperience);
    } finally {
      setIsChecking(false);
    }
  };

  return {
    t,
    name,
    email,
    restaurant: restaurantId,
    accepted,
    resultsConsent,
    restaurantOptions,
    isFormValid,
    isChecking,
    nameError,
    emailError,
    restaurantError,
    consentError,
    alreadyRatedError,
    setName,
    setEmail,
    setRestaurant: setRestaurantId,
    setAccepted,
    setResultsConsent,
    handleBack,
    handleContinue,
    handleDismissAlreadyRated,
  };
};
