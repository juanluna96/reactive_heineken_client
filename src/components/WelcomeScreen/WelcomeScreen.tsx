import backgroundImage from '../../assets/images/background.jpg';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { LanguageOption } from '../LanguageOption';
import { PrimaryButton } from '../PrimaryButton';
import * as S from './WelcomeScreen.styles';
import { useWelcomeScreen } from './WelcomeScreen.hooks';

export const WelcomeScreen = () => {
  const { t, handleStart } = useWelcomeScreen();

  return (
    <S.Screen>
      <S.Background>
        <S.BackgroundImage src={backgroundImage} alt="" />
        <S.GradientOverlay />
      </S.Background>

      <S.Content>
        <S.Header>
          <S.Logo src={heinekenLogo} alt="Heineken" />
        </S.Header>

        <S.WelcomeText>
          <S.Title>{t.welcome.title}</S.Title>
          <S.Subtitle>{t.welcome.subtitle}</S.Subtitle>
        </S.WelcomeText>

        <S.LanguageList>
          <LanguageOption language="es" flag="🇪🇸" />
          <LanguageOption language="en" flag="🇺🇸" />
        </S.LanguageList>

        <S.Footer>
          <PrimaryButton onClick={handleStart}>{t.welcome.cta}</PrimaryButton>
          <S.Copyright>{t.welcome.footer}</S.Copyright>
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
