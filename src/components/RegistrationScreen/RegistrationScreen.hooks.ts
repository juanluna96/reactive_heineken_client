import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkRatingExists } from '../../api';
import { useTranslation } from '../../i18n';
import { useRegistrationStore } from '../../registration';
import { useRestaurantsStore } from '../../restaurants';
import { ROUTES } from '../../routes';
import type { AutocompleteFieldOption } from '../AutocompleteField';
import { toE164 } from '../PhoneField';

// `+` then 7–15 digits (E.164's cap). Mirrors the server's PHONE_RE
// (see app/schemas.py). toE164 already reduces the number to `+<digits>`.
const PHONE_PATTERN = /^\+\d{7,15}$/;

export const useRegistrationScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const name = useRegistrationStore((state) => state.name);
  const setName = useRegistrationStore((state) => state.setName);
  const phone = useRegistrationStore((state) => state.phone);
  const setPhone = useRegistrationStore((state) => state.setPhone);
  const phoneCountry = useRegistrationStore((state) => state.phoneCountry);
  const setPhoneCountry = useRegistrationStore((state) => state.setPhoneCountry);
  const restaurantId = useRegistrationStore((state) => state.restaurantId);
  const setRestaurantId = useRegistrationStore((state) => state.setRestaurantId);
  const accepted = useRegistrationStore((state) => state.accepted);
  const setAccepted = useRegistrationStore((state) => state.setAccepted);
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

  const phoneE164 = toE164(phoneCountry, phone);

  const isNameValid = name.trim().length > 0;
  const isPhoneValid = PHONE_PATTERN.test(phoneE164);
  const isRestaurantValid = restaurantId !== '';
  const isFormValid = isNameValid && isPhoneValid && isRestaurantValid && accepted;

  const nameError = submitted && !isNameValid ? t.registration.errors.nameRequired : undefined;
  const phoneError = submitted && !isPhoneValid ? t.registration.errors.phoneInvalid : undefined;
  const restaurantError = submitted && !isRestaurantValid ? t.registration.errors.restaurantRequired : undefined;
  const consentError = submitted && !accepted ? t.registration.errors.consentRequired : undefined;

  // Clear a stale "already rated" result once the customer changes either
  // half of the (restaurant, phone) pair it was based on.
  useEffect(() => {
    setAlreadyRatedError(undefined);
  }, [phone, phoneCountry, restaurantId]);

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
      const alreadyRated = await checkRatingExists({
        restaurant_id: restaurantId,
        customer_phone: phoneE164,
      });
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
    phone,
    phoneCountry,
    restaurant: restaurantId,
    accepted,
    restaurantOptions,
    isFormValid,
    isChecking,
    nameError,
    phoneError,
    restaurantError,
    consentError,
    alreadyRatedError,
    setName,
    setPhone,
    setPhoneCountry,
    setRestaurant: setRestaurantId,
    setAccepted,
    handleBack,
    handleContinue,
    handleDismissAlreadyRated,
  };
};
