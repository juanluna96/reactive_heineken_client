import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background-2.png';
import videoThumbnail from '../../assets/images/video-thumbnail.jpg';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { BubbleField } from '../BubbleField';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import { StepIndicator } from '../StepIndicator';
import * as S from './WatchExperienceScreen.styles';
import { useWatchExperienceScreen } from './WatchExperienceScreen.hooks';

const PRESENTATION_VIDEO_SRC = '/videos/presentation.mp4';

export const WatchExperienceScreen = () => {
  const {
    t,
    isPlaying,
    isUnlocked,
    timeLabel,
    autoplayLabel,
    radius,
    circumference,
    dashoffset,
    videoRef,
    handleBack,
    handlePlay,
    handleRate,
  } = useWatchExperienceScreen();

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
            <S.Title>{t.watchExperience.title}</S.Title>
            <S.Subtitle>{t.watchExperience.subtitle}</S.Subtitle>
          </S.HeadingBlock>

          <S.VideoCard variants={staggerItem}>
            {isPlaying ? (
              <S.Player
                ref={videoRef}
                src={PRESENTATION_VIDEO_SRC}
                width="100%"
                height="100%"
                autoPlay
                controls
                playsInline
                loop={false}
              />
            ) : (
              <>
                <S.VideoThumbnail src={videoThumbnail} alt="" />
                <S.VideoOverlay>
                  <S.PlayButton type="button" onClick={handlePlay} aria-label="Play video">
                    <S.PlayIcon aria-hidden="true" />
                  </S.PlayButton>
                </S.VideoOverlay>
                <S.AutoplayBanner>
                  <S.AutoplayText>{autoplayLabel}</S.AutoplayText>
                </S.AutoplayBanner>
                <S.DurationBadge>
                  <S.DurationText>{t.watchExperience.durationLabel}</S.DurationText>
                </S.DurationBadge>
              </>
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
