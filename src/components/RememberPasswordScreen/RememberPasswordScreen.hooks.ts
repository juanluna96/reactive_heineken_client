import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../../api';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useRememberPasswordScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const isEmailValid = EMAIL_PATTERN.test(email);
  const emailError = submitted && !isEmailValid ? t.auth.rememberPassword.errors.emailInvalid : undefined;

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setSubmitError(undefined);
  };

  const handleGoToLogin = () => {
    navigate(ROUTES.authLogin);
  };

  const handleDismissError = () => {
    setSubmitError(undefined);
  };

  // The API returns the same 204 whether or not the account exists (see
  // server README's "Password reset emails" section) — so success here just
  // means the request went through, not that an email definitely landed.
  const handleSubmit = async () => {
    if (!isEmailValid) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(undefined);
    try {
      await requestPasswordReset(email);
      setIsSubmitted(true);
    } catch {
      setSubmitError(t.auth.rememberPassword.errors.generic);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    t,
    email,
    isEmailValid,
    emailError,
    isSubmitting,
    isSubmitted,
    submitError,
    setEmail: handleEmailChange,
    handleGoToLogin,
    handleSubmit,
    handleDismissError,
  };
};
