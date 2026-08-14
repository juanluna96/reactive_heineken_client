import { create } from 'zustand';
import type { WatchExperienceState } from './types';

export const DURATION_SECONDS = 90;

const initialState = {
  isPlaying: false,
  secondsRemaining: DURATION_SECONDS,
};

export const useWatchExperienceStore = create<WatchExperienceState>((set) => ({
  ...initialState,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  tick: () => set((state) => ({ secondsRemaining: Math.max(state.secondsRemaining - 1, 0) })),
  reset: () => set(initialState),
}));
