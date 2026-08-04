import backgroundImage from '../../assets/images/background.jpg';
import grainTexture from '../../assets/images/grain-texture.png';
import backArrowIcon from '../../assets/icons/back-arrow.svg';
import chevronDownIcon from '../../assets/icons/chevron-down.svg';
import mailIcon from '../../assets/icons/mail-icon.svg';
import restaurantIcon from '../../assets/icons/restaurant-icon.svg';
import userIcon from '../../assets/icons/user-icon.svg';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
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
        <S.DarkOverlay />
        <S.GlowOverlay />
        <S.GrainOverlay $texture={grainTexture} />
      </S.Background>

      <S.Content>
        <S.Header>
          <S.BackButton type="button" onClick={handleBack} aria-label="Back">
            <S.BackIcon src={backArrowIcon} alt="" aria-hidden="true" />
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
              icon={userIcon}
              label={t.registration.name.label}
              placeholder={t.registration.name.placeholder}
              value={name}
              onChange={setName}
            />
            <TextField
              icon={mailIcon}
              label={t.registration.email.label}
              placeholder={t.registration.email.placeholder}
              type="email"
              value={email}
              onChange={setEmail}
            />
            <SelectField
              icon={restaurantIcon}
              chevronIcon={chevronDownIcon}
              label={t.registration.restaurant.label}
              placeholder={t.registration.restaurant.placeholder}
              options={restaurantOptions}
              value={restaurant}
              onChange={setRestaurant}
            />
            <Checkbox
              checked={accepted}
              onChange={setAccepted}
              prefix={t.registration.consent.prefix}
              linkText={t.registration.consent.linkText}
              suffix={t.registration.consent.suffix}
            />
          </S.FormCard>
        </S.Hero>

        <S.Footer>
          <PrimaryButton onClick={handleContinue}>{t.registration.cta}</PrimaryButton>
          <StepIndicator current={1} total={3} label={t.registration.step} />
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
