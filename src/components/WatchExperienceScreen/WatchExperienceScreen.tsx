import backgroundImage from '../../assets/images/background-2.jpg';
import videoThumbnail from '../../assets/images/video-thumbnail.jpg';
import heinekenLogo from '../../assets/logos/heineken-logo.png';
import { PrimaryButton } from '../PrimaryButton';
import { ScreenOverlay } from '../ScreenOverlay';
import { StepIndicator } from '../StepIndicator';
import * as S from './WatchExperienceScreen.styles';
import { useWatchExperienceScreen } from './WatchExperienceScreen.hooks';

export const WatchExperienceScreen = () => {
  const { t, isPlaying, isUnlocked, timeLabel, radius, circumference, dashoffset, handleBack, handlePlay, handleRate } =
    useWatchExperienceScreen();

  return (
    <S.Screen>
      <S.Background>
        <S.BackgroundImage src={backgroundImage} alt="" />
        <ScreenOverlay />
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
            <S.Title>{t.watchExperience.title}</S.Title>
            <S.Subtitle>{t.watchExperience.subtitle}</S.Subtitle>
          </S.HeadingBlock>

          <S.VideoCard>
            <S.VideoThumbnail src={videoThumbnail} alt="" />
            <S.VideoOverlay>
              {!isPlaying && (
                <S.PlayButton type="button" onClick={handlePlay} aria-label="Play video">
                  <S.PlayIcon aria-hidden="true" />
                </S.PlayButton>
              )}
            </S.VideoOverlay>
            <S.DurationBadge>
              <S.DurationText>{t.watchExperience.durationLabel}</S.DurationText>
            </S.DurationBadge>
          </S.VideoCard>

          <S.TimerSection>
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

        <S.Footer>
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
