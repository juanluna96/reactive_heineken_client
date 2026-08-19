import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background-2.png';
import backgroundImageLaptop from '../../assets/images/background-laptop-2.png';
import videoThumbnail from '../../assets/images/video-thumbnail.jpg';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { BubbleField } from '../BubbleField';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import { StepIndicator } from '../StepIndicator';
import { TABLET_BREAKPOINT } from '../../styles/breakpoints';
import * as S from './WatchExperienceScreen.styles';
import { useWatchExperienceScreen } from './WatchExperienceScreen.hooks';

const PRESENTATION_VIDEO_SRC = '/videos/presentation.mp4';

export const WatchExperienceScreen = () => {
  const {
    t,
    isPlaying,
    isUnlocked,
    timeLabel,
    radius,
    circumference,
    dashoffset,
    playerRef,
    handleBack,
    handlePlay,
    handleRate,
    handleEnded,
  } = useWatchExperienceScreen();

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
          <S.HeadingBlock variants={staggerItem}>
            <S.Title>{t.watchExperience.title}</S.Title>
            <S.Subtitle>{t.watchExperience.subtitle}</S.Subtitle>
          </S.HeadingBlock>

          {!isPlaying && (
            <S.PlayButton
              type="button"
              variants={staggerItem}
              onClick={handlePlay}
              aria-label="Play video"
            >
              <S.PlayIcon aria-hidden="true" />
              <S.PlayLabel>{t.watchExperience.playButtonLabel}</S.PlayLabel>
            </S.PlayButton>
          )}

          <S.VideoCard variants={staggerItem}>
            <S.Player
              ref={playerRef}
              src={PRESENTATION_VIDEO_SRC}
              controls={isPlaying}
              playsInline
              loop={false}
              onEnded={handleEnded}
            />
            {!isPlaying && <S.PosterImage src={videoThumbnail} alt="" />}
            {!isPlaying && (
              <S.DurationBadge>
                <S.DurationText>{t.watchExperience.durationLabel}</S.DurationText>
              </S.DurationBadge>
            )}
          </S.VideoCard>

          <S.TimerSection variants={staggerItem}>
            <S.TimerRing>
              <S.TimerSvg viewBox="0 0 128 128">
                <S.TimerTrack cx="64" cy="64" r={radius} />
                <S.TimerProgress cx="64" cy="64" r={radius} $circumference={circumference} $dashoffset={dashoffset} />
              </S.TimerSvg>
              <S.TimerText>
                <S.TimeValue>{timeLabel}</S.TimeValue>
                <S.TimeLabel>{t.watchExperience.timerLabel}</S.TimeLabel>
              </S.TimerText>
            </S.TimerRing>
            <S.HelperText>{t.watchExperience.helper}</S.HelperText>
          </S.TimerSection>
        </S.Hero>

        <S.Footer variants={staggerItem}>
          {isUnlocked ? (
            <PrimaryButton onClick={handleRate}>{t.watchExperience.cta}</PrimaryButton>
          ) : (
            <S.LockedButton type="button" disabled>
              <S.LockIcon aria-hidden="true" />
              <S.LockedLabel>{t.watchExperience.cta}</S.LockedLabel>
            </S.LockedButton>
          )}
          <StepIndicator current={2} total={3} label={t.watchExperience.step} />
        </S.Footer>
      </S.Content>
    </S.Screen>
  );
};
