import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { useRegistrationStore } from '../../registration';
import { ROUTES } from '../../routes';
import type { SelectFieldOption } from '../SelectField';

const RESTAURANT_OPTIONS: SelectFieldOption[] = [
  { value: 'la-terraza', label: 'La Terraza' },
  { value: 'el-mirador', label: 'El Mirador' },
  { value: 'bar-central', label: 'Bar Central' },
];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useRegistrationScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const name = useRegistrationStore((state) => state.name);
  const setName = useRegistrationStore((state) => state.setName);
  const email = useRegistrationStore((state) => state.email);
  const setEmail = useRegistrationStore((state) => state.setEmail);
  const restaurant = useRegistrationStore((state) => state.restaurant);
  const setRestaurant = useRegistrationStore((state) => state.setRestaurant);
  const accepted = useRegistrationStore((state) => state.accepted);
  const setAccepted = useRegistrationStore((state) => state.setAccepted);
  const [submitted, setSubmitted] = useState(false);

  const isNameValid = name.trim().length > 0;
  const isEmailValid = EMAIL_PATTERN.test(email);
  const isRestaurantValid = restaurant !== '';
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
    restaurant,
    accepted,
    restaurantOptions: RESTAURANT_OPTIONS,
    isFormValid,
    nameError,
    emailError,
    restaurantError,
    consentError,
    setName,
    setEmail,
    setRestaurant,
    setAccepted,
    handleBack,
    handleContinue,
  };
};
