import { AnimatePresence } from 'framer-motion';
import { errorMessageVariants, staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background.png';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { FaEnvelope, FaUtensils, FaUser } from 'react-icons/fa6';
import { AutocompleteField } from '../AutocompleteField';
import { BubbleField } from '../BubbleField';
import { Checkbox } from '../Checkbox';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import { StepIndicator } from '../StepIndicator';
import { TextField } from '../TextField';
import * as S from './RegistrationScreen.styles';
import { useRegistrationScreen } from './RegistrationScreen.hooks';

export const RegistrationScreen = () => {
  const {
    t,
    name,
    email,
    restaurant,
    accepted,
    restaurantOptions,
    isFormValid,
    isChecking,
    nameError,
    emailError,
    restaurantError,
    consentError,
    alreadyRatedError,
    setName,
    setEmail,
    setRestaurant,
    setAccepted,
    handleBack,
    handleContinue,
  } = useRegistrationScreen();

  return (
    <S.Screen>
      <S.Background>
        <S.BackgroundImage src={backgroundImage} alt="" />
        <ScreenOverlay />
        <BubbleField />
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
            <S.Title>{t.registration.title}</S.Title>
            <S.Subtitle>{t.registration.subtitle}</S.Subtitle>
          </S.HeadingBlock>

          <S.FormCard variants={staggerItem}>
            <TextField
              icon={FaUser}
              label={t.registration.name.label}
              placeholder={t.registration.name.placeholder}
              value={name}
              onChange={setName}
              error={nameError}
            />
            <TextField
              icon={FaEnvelope}
              label={t.registration.email.label}
              placeholder={t.registration.email.placeholder}
              type="email"
              value={email}
              onChange={setEmail}
              error={emailError}
            />
            <AutocompleteField
              icon={FaUtensils}
              label={t.registration.restaurant.label}
              placeholder={t.registration.restaurant.placeholder}
              options={restaurantOptions}
              value={restaurant}
              onChange={setRestaurant}
              error={restaurantError}
              noResultsText={t.registration.restaurant.noResults}
            />
            <Checkbox
              checked={accepted}
              onChange={setAccepted}
              prefix={t.registration.consent.prefix}
              linkText={t.registration.consent.linkText}
              suffix={t.registration.consent.suffix}
              error={consentError}
            />
          </S.FormCard>
        </S.Hero>

        <S.Footer variants={staggerItem}>
          <AnimatePresence>
            {alreadyRatedError && (
              <S.FormError initial="hidden" animate="visible" exit="exit" variants={errorMessageVariants}>
                {alreadyRatedError}
              </S.FormError>
            )}
          </AnimatePresence>
          <PrimaryButton onClick={handleContinue} disabled={!isFormValid || isChecking}>
            {t.registration.cta}
          </PrimaryButton>
          <StepIndicator current={1} total={3} label={t.registration.step} />
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
