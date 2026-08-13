import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background-2.png';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { BubbleField } from '../BubbleField';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import { StepIndicator } from '../StepIndicator';
import * as S from './RateBeerMasterScreen.styles';
import { useRateBeerMasterScreen } from './RateBeerMasterScreen.hooks';

export const RateBeerMasterScreen = () => {
  const {
    t,
    beerMasterName,
    nameError,
    stars,
    tierMessage,
    ratingError,
    isFormValid,
    comment,
    maxCommentLength,
    handleBack,
    handleBeerMasterNameChange,
    handleStarHoverEnd,
    handleCommentChange,
    handleSubmit,
  } = useRateBeerMasterScreen();

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
          <S.ProfileSection variants={staggerItem}>
            <S.NameInput
              value={beerMasterName}
              onChange={handleBeerMasterNameChange}
              placeholder={t.rateBeerMaster.namePlaceholder}
              aria-label="Beer master name"
              $hasError={Boolean(nameError)}
            />
            <S.BeerMasterLabel>{t.rateBeerMaster.beerMasterLabel}</S.BeerMasterLabel>
            {nameError && <S.NameError>{nameError}</S.NameError>}
          </S.ProfileSection>

          <S.RatingSection variants={staggerItem}>
            <S.Title>{t.rateBeerMaster.title}</S.Title>
            <S.Subtitle>{t.rateBeerMaster.subtitle}</S.Subtitle>

            <S.Stars>
              {stars.map((star) => (
                <S.StarButton
                  key={star.value}
                  type="button"
                  onClick={star.onSelect}
                  onMouseEnter={star.onHover}
                  onMouseLeave={handleStarHoverEnd}
                  aria-label={`${star.value}`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {star.filled ? <S.StarFilled /> : <S.StarEmpty />}
                </S.StarButton>
              ))}
            </S.Stars>

            <S.TierMessage $visible={Boolean(tierMessage)}>{tierMessage}</S.TierMessage>
            {ratingError && <S.RatingError>{ratingError}</S.RatingError>}
          </S.RatingSection>

          <S.OpinionSection variants={staggerItem}>
            <S.OpinionLabel>{t.rateBeerMaster.opinionLabel}</S.OpinionLabel>
            <S.OpinionCard>
              <S.Textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder={t.rateBeerMaster.opinionPlaceholder}
              />
              <S.CharCount>
                {comment.length}/{maxCommentLength}
              </S.CharCount>
            </S.OpinionCard>
          </S.OpinionSection>
        </S.Hero>

        <S.Footer variants={staggerItem}>
          <PrimaryButton onClick={handleSubmit} disabled={!isFormValid}>
            {t.rateBeerMaster.cta}
          </PrimaryButton>
          <StepIndicator current={3} total={3} label={t.rateBeerMaster.step} />
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
