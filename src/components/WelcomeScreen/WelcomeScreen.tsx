import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background.png';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { BubbleField } from '../BubbleField';
import { LanguageOption } from '../LanguageOption';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import * as S from './WelcomeScreen.styles';
import { useWelcomeScreen } from './WelcomeScreen.hooks';

export const WelcomeScreen = () => {
  const { t, handleStart } = useWelcomeScreen();

  return (
    <S.Screen>
      <S.Background>
        <S.BackgroundImage src={backgroundImage} alt="" />
        <ScreenOverlay />
        <BubbleField />
      </S.Background>

      <S.Content initial="hidden" animate="visible" variants={staggerContainer}>
        <S.Header variants={staggerItem}>
          <S.Logo src={heinekenLogo} alt="Heineken" />
        </S.Header>

        <S.WelcomeText variants={staggerItem}>
          <S.Title>{t.welcome.title}</S.Title>
          <S.Subtitle>{t.welcome.subtitle}</S.Subtitle>
        </S.WelcomeText>

        <S.LanguageList variants={staggerItem}>
          <LanguageOption language="es" flag="🇪🇸" />
          <LanguageOption language="en" flag="🇺🇸" />
        </S.LanguageList>

        <S.Footer variants={staggerItem}>
          <PrimaryButton onClick={handleStart}>{t.welcome.cta}</PrimaryButton>
          <S.Copyright>{t.welcome.footer}</S.Copyright>
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
