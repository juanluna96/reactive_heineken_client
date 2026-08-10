import backgroundImage from '../../assets/images/background.jpg';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import * as S from './ThankYouScreen.styles';
import { useThankYouScreen } from './ThankYouScreen.hooks';

export const ThankYouScreen = () => {
  const { t, handleRestart, canvasRef } = useThankYouScreen();

  return (
    <S.Screen>
      <S.Background>
        <S.BackgroundImage src={backgroundImage} alt="" />
        <ScreenOverlay />
        <S.BubbleCanvas ref={canvasRef} />
      </S.Background>

      <S.Content>
        <S.Hero>
          <S.IconCircle>
            <S.CheckIcon aria-hidden="true" />
          </S.IconCircle>

          <S.TextGroup>
            <S.Title>{t.thankYou.title}</S.Title>
            <S.Confirmation>{t.thankYou.confirmation}</S.Confirmation>
            <S.SupportingText>{t.thankYou.supportingText}</S.SupportingText>
          </S.TextGroup>
        </S.Hero>

        <S.Footer>
          <PrimaryButton onClick={handleRestart} showIcon={false}>
            {t.thankYou.cta}
          </PrimaryButton>
          <S.Copyright>{t.thankYou.footer}</S.Copyright>
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
