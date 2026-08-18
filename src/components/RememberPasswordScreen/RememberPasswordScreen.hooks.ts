import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useRememberPasswordScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isEmailValid = EMAIL_PATTERN.test(email);
  const emailError = submitted && !isEmailValid ? t.auth.rememberPassword.errors.emailInvalid : undefined;

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleGoToLogin = () => {
    navigate(ROUTES.authLogin);
  };

  // No email is actually sent yet — there's no email-sending service wired
  // up. This just confirms the request was received, same message
  // regardless of whether the account exists (avoids leaking which emails
  // are registered).
  const handleSubmit = () => {
    if (!isEmailValid) {
      setSubmitted(true);
      return;
    }
    setIsSubmitted(true);
  };

  return {
    t,
    email,
    isEmailValid,
    emailError,
    isSubmitted,
    setEmail: handleEmailChange,
    handleGoToLogin,
    handleSubmit,
  };
};
