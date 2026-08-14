import { create } from 'zustand';
import type { RatingState } from './types';

const initialState = {
  beerMasterId: null,
  beerMasterName: '',
  rating: 0,
  comment: '',
};

export const useRatingStore = create<RatingState>((set) => ({
  ...initialState,
  setBeerMasterId: (beerMasterId) => set({ beerMasterId }),
  setBeerMasterName: (beerMasterName) => set({ beerMasterName }),
  setRating: (rating) => set({ rating }),
  setComment: (comment) => set({ comment }),
  reset: () => set(initialState),
}));
