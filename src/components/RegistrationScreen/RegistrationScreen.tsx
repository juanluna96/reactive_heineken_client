import backgroundImage from '../../assets/images/background.jpg';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { FaChevronDown, FaEnvelope, FaUtensils, FaUser } from 'react-icons/fa6';
import { Checkbox } from '../Checkbox';
import { PrimaryButton } from '../PrimaryButton';
import { SelectField } from '../SelectField';
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
    nameError,
    emailError,
    restaurantError,
    consentError,
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
        <S.GradientOverlay />
      </S.Background>

      <S.Content>
        <S.Header>
          <S.BackButton type="button" onClick={handleBack} aria-label="Back">
            <S.BackIcon aria-hidden="true" />
          </S.BackButton>
          <S.Logo src={heinekenLogo} alt="Heineken" />
        </S.Header>

        <S.Hero>
          <S.HeadingBlock>
            <S.Title>{t.registration.title}</S.Title>
            <S.Subtitle>{t.registration.subtitle}</S.Subtitle>
          </S.HeadingBlock>

          <S.FormCard>
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
            <SelectField
              icon={FaUtensils}
              chevronIcon={FaChevronDown}
              label={t.registration.restaurant.label}
              placeholder={t.registration.restaurant.placeholder}
              options={restaurantOptions}
              value={restaurant}
              onChange={setRestaurant}
              error={restaurantError}
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

        <S.Footer>
          <PrimaryButton onClick={handleContinue} disabled={!isFormValid}>
            {t.registration.cta}
          </PrimaryButton>
          <StepIndicator current={1} total={3} label={t.registration.step} />
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
