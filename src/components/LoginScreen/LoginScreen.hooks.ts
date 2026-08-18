import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError, login } from '../../api';
import { useAuthStore } from '../../auth';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useLoginScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const isEmailValid = EMAIL_PATTERN.test(email);
  const isPasswordValid = password.length > 0;
  const isFormValid = isEmailValid && isPasswordValid;

  const emailError = submitted && !isEmailValid ? t.auth.login.errors.emailInvalid : undefined;
  const passwordError = submitted && !isPasswordValid ? t.auth.login.errors.passwordRequired : undefined;

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setSubmitError(undefined);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setSubmitError(undefined);
  };

  const handleForgotPassword = () => {
    navigate(ROUTES.authRememberPassword);
  };

  const handleGoToRegister = () => {
    navigate(ROUTES.authRegister);
  };

  const handleDismissError = () => {
    setSubmitError(undefined);
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(undefined);
    try {
      const user = await login({ email, password });
      setUser(user);
      navigate(ROUTES.adminHome);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setSubmitError(t.auth.login.errors.invalidCredentials);
      } else {
        setSubmitError(t.auth.login.errors.generic);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    t,
    email,
    password,
    isFormValid,
    isSubmitting,
    emailError,
    passwordError,
    submitError,
    setEmail: handleEmailChange,
    setPassword: handlePasswordChange,
    handleForgotPassword,
    handleGoToRegister,
    handleSubmit,
    handleDismissError,
  };
};
