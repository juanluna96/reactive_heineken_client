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
  const playerRef = useRef<HTMLVideoElement>(null);
  // isPlaying lives in the (unmount-surviving) watch experience store, so
  // it's already true when this screen remounts after the user watched the
  // video and navigated to rating and back. Only auto-fullscreen when
  // isPlaying flips to true while mounted (a real Play click) — not when the
  // screen mounts already in a playing state. Captured once via useRef's
  // lazy initializer (not mutated inside the effect) so it survives
  // StrictMode's dev-only double effect invocation on mount unscathed.
  const wasAlreadyPlayingOnMountRef = useRef(isPlaying);

  useEffect(() => {
    if (!isPlaying || wasAlreadyPlayingOnMountRef.current) return;
    // Request fullscreen on the <video> element itself, not a wrapping div —
    // otherwise document.fullscreenElement isn't the video, and the native
    // player controls' own fullscreen/minimize toggle stops working.
    const element = playerRef.current;
    if (!element?.requestFullscreen) return;
    try {
      element.requestFullscreen()?.catch(() => {});
    } catch {
      // Fullscreen not permitted in this context; keep playing inline.
    }
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
    if (!document.fullscreenElement || !document.exitFullscreen) return;
    try {
      document.exitFullscreen()?.catch(() => {});
    } catch {
      // Nothing to exit; ignore.
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
    playerRef,
    handleBack,
    handlePlay,
    handleRate,
    handleEnded,
  };
};
