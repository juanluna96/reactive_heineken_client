import { FaEnvelope } from 'react-icons/fa6';
import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background.png';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import { TextField } from '../TextField';
import * as S from './RememberPasswordScreen.styles';
import { useRememberPasswordScreen } from './RememberPasswordScreen.hooks';

export const RememberPasswordScreen = () => {
  const { t, email, emailError, isSubmitted, setEmail, handleGoToLogin, handleSubmit } =
    useRememberPasswordScreen();

  return (
    <S.Screen>
      <S.Background>
        <S.BackgroundImage src={backgroundImage} alt="" />
        <ScreenOverlay />
      </S.Background>

      <S.Content initial="hidden" animate="visible" variants={staggerContainer}>
        <S.Header variants={staggerItem}>
          <S.BackButton type="button" onClick={handleGoToLogin} aria-label="Back">
            <S.BackIcon aria-hidden="true" />
          </S.BackButton>
          <S.Logo src={heinekenLogo} alt="Heineken" />
        </S.Header>

        {isSubmitted ? (
          <S.ConfirmationHero>
            <S.IconCircle variants={staggerItem}>
              <S.CheckIcon aria-hidden="true" />
            </S.IconCircle>
            <S.TextGroup variants={staggerItem}>
              <S.ConfirmationTitle>{t.auth.rememberPassword.confirmation.title}</S.ConfirmationTitle>
              <S.ConfirmationMessage>{t.auth.rememberPassword.confirmation.message}</S.ConfirmationMessage>
            </S.TextGroup>
          </S.ConfirmationHero>
        ) : (
          <S.Hero>
            <S.HeadingBlock variants={staggerItem}>
              <S.Title>{t.auth.rememberPassword.title}</S.Title>
              <S.Subtitle>{t.auth.rememberPassword.subtitle}</S.Subtitle>
            </S.HeadingBlock>

            <S.FormCard variants={staggerItem}>
              <TextField
                icon={FaEnvelope}
                label={t.auth.rememberPassword.email.label}
                placeholder={t.auth.rememberPassword.email.placeholder}
                type="email"
                value={email}
                onChange={setEmail}
                error={emailError}
              />
            </S.FormCard>
          </S.Hero>
        )}

        <S.Footer variants={staggerItem}>
          <PrimaryButton onClick={isSubmitted ? handleGoToLogin : handleSubmit} showIcon={!isSubmitted}>
            {isSubmitted ? t.auth.rememberPassword.confirmation.cta : t.auth.rememberPassword.cta}
          </PrimaryButton>
          {!isSubmitted && (
            <S.SwitchRow>
              <S.SwitchLink type="button" onClick={handleGoToLogin}>
                {t.auth.rememberPassword.backToLogin}
              </S.SwitchLink>
            </S.SwitchRow>
          )}
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
