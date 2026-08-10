import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';

const DURATION_SECONDS = 180;
const RADIUS = 56;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const AUTOPLAY_DELAY_MS = 1000;

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

  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(DURATION_SECONDS);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsPlaying(true), AUTOPLAY_DELAY_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = setInterval(() => {
      setSecondsRemaining((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  const isUnlocked = secondsRemaining === 0;
  const dashoffset = CIRCUMFERENCE * (1 - secondsRemaining / DURATION_SECONDS);

  const handleBack = () => {
    navigate(ROUTES.registration);
  };

  const handlePlay = () => {
    setIsPlaying(true);
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
    radius: RADIUS,
    circumference: CIRCUMFERENCE,
    dashoffset,
    handleBack,
    handlePlay,
    handleRate,
  };
};
