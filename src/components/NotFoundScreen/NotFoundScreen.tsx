import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background.png';
import backgroundImageLaptop from '../../assets/images/background-laptop.png';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import { TABLET_BREAKPOINT } from '../../styles/breakpoints';
import * as S from './NotFoundScreen.styles';
import { useNotFoundScreen } from './NotFoundScreen.hooks';

export const NotFoundScreen = () => {
  const { t, cta, handleGoHome } = useNotFoundScreen();

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
          <S.Logo src={heinekenLogo} alt="Heineken" />
        </S.Header>

        <S.Hero>
          <S.IconCircle variants={staggerItem}>
            <S.MapIcon aria-hidden="true" />
          </S.IconCircle>
          <S.TextGroup variants={staggerItem}>
            <S.Eyebrow>{t.notFound.eyebrow}</S.Eyebrow>
            <S.Title>{t.notFound.title}</S.Title>
            <S.Subtitle>{t.notFound.subtitle}</S.Subtitle>
          </S.TextGroup>
        </S.Hero>

        <S.Footer variants={staggerItem}>
          <PrimaryButton onClick={handleGoHome}>{cta}</PrimaryButton>
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
