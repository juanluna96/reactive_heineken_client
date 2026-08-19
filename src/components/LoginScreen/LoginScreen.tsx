import { AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa6';
import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background.png';
import backgroundImageLaptop from '../../assets/images/background-laptop.png';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import { TextField } from '../TextField';
import { Toast } from '../Toast';
import { TABLET_BREAKPOINT } from '../../styles/breakpoints';
import * as S from './LoginScreen.styles';
import { useLoginScreen } from './LoginScreen.hooks';

export const LoginScreen = () => {
  const {
    t,
    email,
    password,
    isFormValid,
    isSubmitting,
    emailError,
    passwordError,
    submitError,
    setEmail,
    setPassword,
    handleForgotPassword,
    handleGoToRegister,
    handleSubmit,
    handleDismissError,
  } = useLoginScreen();

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

        <S.Hero>
          <S.HeadingBlock variants={staggerItem}>
            <S.Title>{t.auth.login.title}</S.Title>
            <S.Subtitle>{t.auth.login.subtitle}</S.Subtitle>
          </S.HeadingBlock>

          <S.FormCard variants={staggerItem}>
            <TextField
              icon={FaEnvelope}
              label={t.auth.login.email.label}
              placeholder={t.auth.login.email.placeholder}
              type="email"
              value={email}
              onChange={setEmail}
              error={emailError}
            />
            <TextField
              icon={FaLock}
              label={t.auth.login.password.label}
              placeholder={t.auth.login.password.placeholder}
              type="password"
              value={password}
              onChange={setPassword}
              error={passwordError}
            />
            <S.ForgotPasswordLink type="button" onClick={handleForgotPassword}>
              {t.auth.login.forgotPassword}
            </S.ForgotPasswordLink>
          </S.FormCard>
        </S.Hero>

        <S.Footer variants={staggerItem}>
          <PrimaryButton onClick={handleSubmit} disabled={!isFormValid || isSubmitting}>
            {t.auth.login.cta}
          </PrimaryButton>
          <S.SwitchRow>
            {t.auth.login.noAccount}{' '}
            <S.SwitchLink type="button" onClick={handleGoToRegister}>
              {t.auth.login.registerLink}
            </S.SwitchLink>
          </S.SwitchRow>
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
