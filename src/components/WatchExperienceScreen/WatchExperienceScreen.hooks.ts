import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';
import { DURATION_SECONDS, useWatchExperienceStore } from '../../watchExperience';

const RADIUS = 56;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// iOS Safari exposes native video fullscreen only through this proprietary
// method, not the standard Fullscreen API.
type FullscreenVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

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

  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, tick]);

  const isUnlocked = secondsRemaining === 0;
  const dashoffset = CIRCUMFERENCE * (1 - secondsRemaining / DURATION_SECONDS);

  const handleBack = () => {
    navigate(ROUTES.registration);
  };

  const handlePlay = () => {
    // Request fullscreen synchronously inside the click handler (not in a
    // useEffect after the state update commits) — browsers only grant
    // fullscreen when it's a direct, synchronous consequence of a user
    // gesture. Target the <video> element itself, not a wrapping div, so
    // document.fullscreenElement is the video and its native fullscreen
    // toggle keeps working.
    const element = playerRef.current as FullscreenVideoElement | null;
    if (element && !document.fullscreenElement) {
      if (element.requestFullscreen) {
        try {
          element.requestFullscreen()?.catch(() => {});
        } catch {
          // Fullscreen not permitted in this context; keep playing inline.
        }
      } else if (element.webkitEnterFullscreen) {
        // iOS Safari doesn't implement the standard Fullscreen API for
        // <video> elements — this proprietary method is the only way to
        // get native fullscreen playback there, even with `playsInline` set.
        try {
          element.webkitEnterFullscreen();
        } catch {
          // Fullscreen not permitted in this context; keep playing inline.
        }
      }
    }
    element?.play?.().catch(() => {});
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
