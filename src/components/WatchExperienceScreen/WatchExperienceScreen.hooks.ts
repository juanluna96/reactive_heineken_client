import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';
import { DURATION_SECONDS, useWatchExperienceStore } from '../../watchExperience';

const RADIUS = 56;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const AUTOPLAY_COUNTDOWN_SECONDS = 5;

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export const useWatchExperienceScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isPlaying = useWatchExperienceStore((state) => state.isPlaying);
  const setIsPlaying = useWatchExperienceStore((state) => state.setIsPlaying);
  const secondsRemaining = useWatchExperienceStore((state) => state.secondsRemaining);
  const tick = useWatchExperienceStore((state) => state.tick);

  const [autoplayCountdown, setAutoplayCountdown] = useState(AUTOPLAY_COUNTDOWN_SECONDS);
  const videoCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;
    videoCardRef.current?.requestFullscreen().catch(() => {});
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) return;

    if (autoplayCountdown <= 0) {
      setIsPlaying(true);
      return;
    }

    const timeoutId = setTimeout(() => setAutoplayCountdown((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timeoutId);
  }, [isPlaying, autoplayCountdown, setIsPlaying]);

  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, tick]);

  const isUnlocked = secondsRemaining === 0;
  const dashoffset = CIRCUMFERENCE * (1 - secondsRemaining / DURATION_SECONDS);
  const autoplayLabel = t.watchExperience.autoplayMessage.replace('{seconds}', String(autoplayCountdown));

  const handleBack = () => {
    navigate(ROUTES.registration);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleEnded = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleRate = () => {
    if (!isUnlocked) return;
    navigate(ROUTES.rateBeerMaster);
  };

  return {
    t,
    isPlaying,
    isUnlocked,
    timeLabel: formatTime(secondsRemaining),
    autoplayLabel,
    radius: RADIUS,
    circumference: CIRCUMFERENCE,
    dashoffset,
    videoCardRef,
    handleBack,
    handlePlay,
    handleRate,
    handleEnded,
  };
};
