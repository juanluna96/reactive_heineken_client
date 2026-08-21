import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ApiError, resetPassword } from '../../api';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';

const MIN_PASSWORD_LENGTH = 8;

export const useResetPasswordScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const isPasswordValid = password.length >= MIN_PASSWORD_LENGTH;
  const doPasswordsMatch = password === confirmPassword;
  const isFormValid = isPasswordValid && doPasswordsMatch;

  const passwordError = submitted && !isPasswordValid ? t.auth.resetPassword.errors.passwordTooShort : undefined;
  const confirmPasswordError =
    submitted && isPasswordValid && !doPasswordsMatch ? t.auth.resetPassword.errors.passwordMismatch : undefined;

  const clearSubmitError = () => setSubmitError(undefined);

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
    if (!token || !isFormValid) {
      setSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(undefined);
    try {
      await resetPassword({ token, new_password: password });
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError && error.status === 400
          ? t.auth.resetPassword.errors.invalidToken
          : t.auth.resetPassword.errors.generic,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    t,
    // A missing token means the link was tampered with/incomplete — no point
    // showing the form at all in that case.
    hasToken: Boolean(token),
    password,
    confirmPassword,
    isFormValid,
    isSubmitting,
    isSubmitted,
    passwordError,
    confirmPasswordError,
    submitError,
    setPassword: handlePasswordChange,
    setConfirmPassword: handleConfirmPasswordChange,
    handleGoToLogin,
    handleSubmit,
    handleDismissError,
  };
};
