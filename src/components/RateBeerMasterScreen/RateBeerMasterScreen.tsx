import { AnimatePresence } from 'framer-motion';
import { FaUser } from 'react-icons/fa6';
import { errorMessageVariants, staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background-2.png';
import backgroundImageLaptop from '../../assets/images/background-laptop-2.png';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { AutocompleteField } from '../AutocompleteField';
import { BubbleField } from '../BubbleField';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import { StarRating } from '../StarRating';
import { StepIndicator } from '../StepIndicator';
import { TABLET_BREAKPOINT } from '../../styles/breakpoints';
import * as S from './RateBeerMasterScreen.styles';
import { useRateBeerMasterScreen } from './RateBeerMasterScreen.hooks';

export const RateBeerMasterScreen = () => {
  const {
    t,
    beerMasterOptions,
    selectedBeerMasterId,
    beerMasterName,
    nameError,
    tierMessages,
    rating,
    setRating,
    experienceError,
    skillsRating,
    setSkillsRating,
    skillsError,
    serviceRating,
    setServiceRating,
    serviceError,
    isFormValid,
    isSubmitting,
    submitError,
    comment,
    maxCommentLength,
    handleBack,
    setBeerMasterName,
    handleBeerMasterSelect,
    handleCommentChange,
    handleSubmit,
  } = useRateBeerMasterScreen();

  return (
    <S.Screen>
      <S.Background>
        <picture>
          <source media={`(min-width: ${TABLET_BREAKPOINT})`} srcSet={backgroundImageLaptop} />
          <S.BackgroundImage src={backgroundImage} alt="" />
        </picture>
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
            <AutocompleteField
              icon={FaUser}
              label={t.rateBeerMaster.beerMasterLabel}
              placeholder={t.rateBeerMaster.namePlaceholder}
              options={beerMasterOptions}
              value={selectedBeerMasterId}
              onChange={handleBeerMasterSelect}
              allowCustomValue
              freeTextValue={beerMasterName}
              onCustomValueChange={setBeerMasterName}
              error={nameError}
              noResultsText={t.rateBeerMaster.noResults}
            />
          </S.ProfileSection>

          <S.RatingSection variants={staggerItem}>
            <S.Subtitle>{t.rateBeerMaster.subtitle}</S.Subtitle>

            <StarRating
              label={t.rateBeerMaster.title}
              value={rating}
              onChange={setRating}
              tierMessages={tierMessages}
              error={experienceError}
            />
            <StarRating
              label={t.rateBeerMaster.skillsQuestion}
              value={skillsRating}
              onChange={setSkillsRating}
              tierMessages={tierMessages}
              error={skillsError}
            />
            <StarRating
              label={t.rateBeerMaster.serviceQuestion}
              value={serviceRating}
              onChange={setServiceRating}
              tierMessages={tierMessages}
              error={serviceError}
            />
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
          <AnimatePresence>
            {submitError && (
              <S.RatingError initial="hidden" animate="visible" exit="exit" variants={errorMessageVariants}>
                {submitError}
              </S.RatingError>
            )}
          </AnimatePresence>
          <PrimaryButton onClick={handleSubmit} disabled={!isFormValid || isSubmitting}>
            {t.rateBeerMaster.cta}
          </PrimaryButton>
          <StepIndicator current={2} total={2} label={t.rateBeerMaster.step} />
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
