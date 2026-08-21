import { AnimatePresence } from 'framer-motion';
import { FaLock } from 'react-icons/fa6';
import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background.png';
import backgroundImageLaptop from '../../assets/images/background-laptop.png';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import { TextField } from '../TextField';
import { Toast } from '../Toast';
import { TABLET_BREAKPOINT } from '../../styles/breakpoints';
import * as S from './ResetPasswordScreen.styles';
import { useResetPasswordScreen } from './ResetPasswordScreen.hooks';

export const ResetPasswordScreen = () => {
  const {
    t,
    hasToken,
    password,
    confirmPassword,
    isFormValid,
    isSubmitting,
    isSubmitted,
    passwordError,
    confirmPasswordError,
    submitError,
    setPassword,
    setConfirmPassword,
    handleGoToLogin,
    handleSubmit,
    handleDismissError,
  } = useResetPasswordScreen();

  const showInvalidLink = !hasToken;

  return (
    <S.Screen>
      <S.Background>
        <picture>
          <source media={`(min-width: ${TABLET_BREAKPOINT})`} srcSet={backgroundImageLaptop} />
          <S.BackgroundImage src={backgroundImage} alt="" />
        </picture>
        <ScreenOverlay />
      </S.Background>

      <AnimatePresence>{submitError && <Toast message={submitError} onDismiss={handleDismissError} />}</AnimatePresence>

      <S.Content initial="hidden" animate="visible" variants={staggerContainer}>
        <S.Header variants={staggerItem}>
          <S.Logo src={heinekenLogo} alt="Heineken" />
        </S.Header>

        {showInvalidLink ? (
          <S.ConfirmationHero>
            <S.IconCircle variants={staggerItem} $variant="error">
              <S.WarningIcon aria-hidden="true" />
            </S.IconCircle>
            <S.TextGroup variants={staggerItem}>
              <S.ConfirmationTitle>{t.auth.resetPassword.invalidLink.title}</S.ConfirmationTitle>
              <S.ConfirmationMessage>{t.auth.resetPassword.invalidLink.message}</S.ConfirmationMessage>
            </S.TextGroup>
          </S.ConfirmationHero>
        ) : isSubmitted ? (
          <S.ConfirmationHero>
            <S.IconCircle variants={staggerItem}>
              <S.CheckIcon aria-hidden="true" />
            </S.IconCircle>
            <S.TextGroup variants={staggerItem}>
              <S.ConfirmationTitle>{t.auth.resetPassword.confirmation.title}</S.ConfirmationTitle>
              <S.ConfirmationMessage>{t.auth.resetPassword.confirmation.message}</S.ConfirmationMessage>
            </S.TextGroup>
          </S.ConfirmationHero>
        ) : (
          <S.Hero>
            <S.HeadingBlock variants={staggerItem}>
              <S.Title>{t.auth.resetPassword.title}</S.Title>
              <S.Subtitle>{t.auth.resetPassword.subtitle}</S.Subtitle>
            </S.HeadingBlock>

            <S.FormCard variants={staggerItem}>
              <TextField
                icon={FaLock}
                label={t.auth.resetPassword.password.label}
                placeholder={t.auth.resetPassword.password.placeholder}
                type="password"
                value={password}
                onChange={setPassword}
                error={passwordError}
              />
              <TextField
                icon={FaLock}
                label={t.auth.resetPassword.confirmPassword.label}
                placeholder={t.auth.resetPassword.confirmPassword.placeholder}
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                error={confirmPasswordError}
              />
            </S.FormCard>
          </S.Hero>
        )}

        <S.Footer variants={staggerItem}>
          {showInvalidLink || isSubmitted ? (
            <PrimaryButton onClick={handleGoToLogin}>
              {showInvalidLink ? t.auth.resetPassword.invalidLink.cta : t.auth.resetPassword.confirmation.cta}
            </PrimaryButton>
          ) : (
            <>
              <PrimaryButton onClick={handleSubmit} disabled={!isFormValid || isSubmitting}>
                {t.auth.resetPassword.cta}
              </PrimaryButton>
              <S.SwitchRow>
                <S.SwitchLink type="button" onClick={handleGoToLogin}>
                  {t.auth.resetPassword.backToLogin}
                </S.SwitchLink>
              </S.SwitchRow>
            </>
          )}
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
