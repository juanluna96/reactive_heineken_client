import { create } from 'zustand';
import type { RatingState } from './types';

const initialState = {
  beerMasterId: null,
  beerMasterName: '',
  rating: 0,
  skillsRating: 0,
  serviceRating: 0,
  comment: '',
};

export const useRatingStore = create<RatingState>((set) => ({
  ...initialState,
  setBeerMasterId: (beerMasterId) => set({ beerMasterId }),
  setBeerMasterName: (beerMasterName) => set({ beerMasterName }),
  setRating: (rating) => set({ rating }),
  setSkillsRating: (skillsRating) => set({ skillsRating }),
  setServiceRating: (serviceRating) => set({ serviceRating }),
  setComment: (comment) => set({ comment }),
  reset: () => set(initialState),
}));
