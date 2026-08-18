import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError, register } from '../../api';
import { useAuthStore } from '../../auth';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

export const useRegisterScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const isFullNameValid = fullName.trim().length > 0;
  const isEmailValid = EMAIL_PATTERN.test(email);
  const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
  const doPasswordsMatch = password === confirmPassword;
  const isFormValid = isFullNameValid && isEmailValid && isPasswordValid && doPasswordsMatch;

  const fullNameError = submitted && !isFullNameValid ? t.auth.register.errors.fullNameRequired : undefined;
  const emailError = submitted && !isEmailValid ? t.auth.register.errors.emailInvalid : undefined;
  const passwordError = submitted && !isPasswordValid ? t.auth.register.errors.passwordTooShort : undefined;
  const confirmPasswordError =
    submitted && isPasswordValid && !doPasswordsMatch ? t.auth.register.errors.passwordMismatch : undefined;

  const clearSubmitError = () => setSubmitError(undefined);

  const handleFullNameChange = (value: string) => {
    setFullName(value);
    clearSubmitError();
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    clearSubmitError();
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    clearSubmitError();
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    clearSubmitError();
  };

  const handleGoToLogin = () => {
    navigate(ROUTES.authLogin);
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
      const user = await register({ full_name: fullName.trim(), email, password });
      setUser(user);
      navigate(ROUTES.adminHome);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setSubmitError(t.auth.register.errors.emailTaken);
      } else {
        setSubmitError(t.auth.register.errors.generic);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    t,
    fullName,
    email,
    password,
    confirmPassword,
    isFormValid,
    isSubmitting,
    fullNameError,
    emailError,
    passwordError,
    confirmPasswordError,
    submitError,
    setFullName: handleFullNameChange,
    setEmail: handleEmailChange,
    setPassword: handlePasswordChange,
    setConfirmPassword: handleConfirmPasswordChange,
    handleGoToLogin,
    handleSubmit,
    handleDismissError,
  };
};
