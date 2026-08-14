export interface WatchExperienceState {
  isPlaying: boolean;
  secondsRemaining: number;
  setIsPlaying: (isPlaying: boolean) => void;
  tick: () => void;
  reset: () => void;
}
