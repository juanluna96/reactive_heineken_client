import { FaCalendarDays } from 'react-icons/fa6';
import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background.png';
import backgroundImageLaptop from '../../assets/images/background-laptop.png';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { DatePicker } from '../DatePicker';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import { TABLET_BREAKPOINT } from '../../styles/breakpoints';
import * as S from './AgeVerificationScreen.styles';
import { useAgeVerificationScreen } from './AgeVerificationScreen.hooks';

export const AgeVerificationScreen = () => {
  const { t, birthDate, birthDateError, isFormValid, maxBirthDate, setBirthDate, handleBack, handleContinue } =
    useAgeVerificationScreen();

  return (
    <S.Screen>
      <S.Background>
        <picture>
          <source media={`(min-width: ${TABLET_BREAKPOINT})`} srcSet={backgroundImageLaptop} />
          <S.BackgroundImage src={backgroundImage} alt="" />
        </picture>
        <ScreenOverlay />
      </S.Background>

      <S.Content initial="hidden" animate="visible" variants={staggerContainer}>
        <S.Header variants={staggerItem}>
          <S.BackButton type="button" onClick={handleBack} aria-label="Back">
            <S.BackIcon aria-hidden="true" />
          </S.BackButton>
          <S.Logo src={heinekenLogo} alt="Heineken" />
        </S.Header>

        <S.Hero>
          <S.HeadingBlock variants={staggerItem}>
            <S.Title>{t.ageVerification.title}</S.Title>
            <S.Subtitle>{t.ageVerification.subtitle}</S.Subtitle>
          </S.HeadingBlock>

          <S.FormCard variants={staggerItem}>
            <DatePicker
              icon={FaCalendarDays}
              label={t.ageVerification.birthDate.label}
              placeholder={t.ageVerification.birthDate.placeholder}
              max={maxBirthDate}
              value={birthDate}
              onChange={setBirthDate}
              error={birthDateError}
            />
          </S.FormCard>
        </S.Hero>

        <S.Footer variants={staggerItem}>
          <PrimaryButton onClick={handleContinue} disabled={!isFormValid}>
            {t.ageVerification.cta}
          </PrimaryButton>
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
