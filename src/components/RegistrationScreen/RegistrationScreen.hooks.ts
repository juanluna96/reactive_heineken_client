import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';
import type { SelectFieldOption } from '../SelectField';

const RESTAURANT_OPTIONS: SelectFieldOption[] = [];

export const useRegistrationScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [accepted, setAccepted] = useState(false);

  const handleBack = () => {
    navigate(ROUTES.welcome);
  };

  const handleContinue = () => {
    // No next step exists yet.
  };

  return {
    t,
    name,
    email,
    restaurant,
    accepted,
    restaurantOptions: RESTAURANT_OPTIONS,
    setName,
    setEmail,
    setRestaurant,
    setAccepted,
    handleBack,
    handleContinue,
  };
};
