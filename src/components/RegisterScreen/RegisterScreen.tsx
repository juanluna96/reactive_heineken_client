import { AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaUtensils } from 'react-icons/fa6';
import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background.png';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { AutocompleteField } from '../AutocompleteField';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import { TextField } from '../TextField';
import { Toast } from '../Toast';
import * as S from './RegisterScreen.styles';
import { useRegisterScreen } from './RegisterScreen.hooks';

export const RegisterScreen = () => {
  const {
    t,
    fullName,
    email,
    affiliation,
    affiliationOptions,
    password,
    confirmPassword,
    isFormValid,
    isSubmitting,
    fullNameError,
    emailError,
    affiliationError,
    passwordError,
    confirmPasswordError,
    submitError,
    setFullName,
    setEmail,
    setAffiliation,
    setPassword,
    setConfirmPassword,
    handleGoToLogin,
    handleSubmit,
    handleDismissError,
  } = useRegisterScreen();

  return (
    <S.Screen>
      <S.Background>
        <S.BackgroundImage src={backgroundImage} alt="" />
        <ScreenOverlay />
      </S.Background>

      <AnimatePresence>{submitError && <Toast message={submitError} onDismiss={handleDismissError} />}</AnimatePresence>

      <S.Content initial="hidden" animate="visible" variants={staggerContainer}>
        <S.Header variants={staggerItem}>
          <S.BackButton type="button" onClick={handleGoToLogin} aria-label="Back">
            <S.BackIcon aria-hidden="true" />
          </S.BackButton>
          <S.Logo src={heinekenLogo} alt="Heineken" />
        </S.Header>

        <S.Hero>
          <S.HeadingBlock variants={staggerItem}>
            <S.Title>{t.auth.register.title}</S.Title>
            <S.Subtitle>{t.auth.register.subtitle}</S.Subtitle>
          </S.HeadingBlock>

          <S.FormCard variants={staggerItem}>
            <TextField
              icon={FaUser}
              label={t.auth.register.fullName.label}
              placeholder={t.auth.register.fullName.placeholder}
              value={fullName}
              onChange={setFullName}
              error={fullNameError}
            />
            <TextField
              icon={FaEnvelope}
              label={t.auth.register.email.label}
              placeholder={t.auth.register.email.placeholder}
              type="email"
              value={email}
              onChange={setEmail}
              error={emailError}
            />
            <AutocompleteField
              icon={FaUtensils}
              label={t.auth.register.affiliation.label}
              placeholder={t.auth.register.affiliation.placeholder}
              options={affiliationOptions}
              value={affiliation}
              onChange={setAffiliation}
              error={affiliationError}
              noResultsText={t.auth.register.affiliation.noResults}
            />
            <TextField
              icon={FaLock}
              label={t.auth.register.password.label}
              placeholder={t.auth.register.password.placeholder}
              type="password"
              value={password}
              onChange={setPassword}
              error={passwordError}
            />
            <TextField
              icon={FaLock}
              label={t.auth.register.confirmPassword.label}
              placeholder={t.auth.register.confirmPassword.placeholder}
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={confirmPasswordError}
            />
          </S.FormCard>
        </S.Hero>

        <S.Footer variants={staggerItem}>
          <PrimaryButton onClick={handleSubmit} disabled={!isFormValid || isSubmitting}>
            {t.auth.register.cta}
          </PrimaryButton>
          <S.SwitchRow>
            {t.auth.register.hasAccount}{' '}
            <S.SwitchLink type="button" onClick={handleGoToLogin}>
              {t.auth.register.loginLink}
            </S.SwitchLink>
          </S.SwitchRow>
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
