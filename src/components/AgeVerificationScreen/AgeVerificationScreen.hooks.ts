import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';

// Legal drinking/majority age for this activation (counsel guidance,
// 2026-08-21) — adjust here if the activation ever runs in a market with a
// different legal age.
const LEGAL_AGE = 18;

const todayIso = () => new Date().toISOString().slice(0, 10);

const calculateAge = (birthDateIso: string): number => {
  const birthDate = new Date(birthDateIso);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
};

export const useAgeVerificationScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Intentionally local, never sent to the backend or any store that
  // survives this screen — the only purpose of collecting it is the
  // in-browser majority-age gate below (counsel guidance, 2026-08-21: no
  // personal data may be collected from minors, so the birth date itself
  // is never transmitted, only the pass/fail of this check).
  const [birthDate, setBirthDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isProvided = birthDate !== '';
  const isAdult = isProvided && calculateAge(birthDate) >= LEGAL_AGE;
  const isFormValid = isProvided && isAdult;

  const birthDateError = submitted
    ? !isProvided
      ? t.ageVerification.errors.required
      : !isAdult
        ? t.ageVerification.errors.underage
        : undefined
    : undefined;

  const handleBirthDateChange = (value: string) => {
    setBirthDate(value);
    setSubmitted(false);
  };

  const handleBack = () => {
    navigate(ROUTES.welcome);
  };

  const handleContinue = () => {
    if (!isFormValid) {
      setSubmitted(true);
      return;
    }
    navigate(ROUTES.registration);
  };

  return {
    t,
    birthDate,
    birthDateError,
    isFormValid,
    maxBirthDate: todayIso(),
    setBirthDate: handleBirthDateChange,
    handleBack,
    handleContinue,
  };
};
