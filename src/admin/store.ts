import { create } from 'zustand';
import {
  fetchBeerMastersRanking as fetchBeerMastersRankingRequest,
  fetchDashboard as fetchDashboardRequest,
  fetchRatings as fetchRatingsRequest,
  fetchRestaurantsRanking as fetchRestaurantsRankingRequest,
} from '../api';
import type { AdminState } from './types';

export const useAdminStore = create<AdminState>((set, get) => ({
  dashboard: null,
  status: 'idle',
  fetchDashboard: async () => {
    if (get().status === 'loading' || get().status === 'loaded') return;

    set({ status: 'loading' });
    try {
      const dashboard = await fetchDashboardRequest();
      set({ dashboard, status: 'loaded' });
    } catch {
      set({ status: 'error' });
    }
  },
  refreshDashboard: async () => {
    set({ status: 'loading' });
    try {
      const dashboard = await fetchDashboardRequest();
      set({ dashboard, status: 'loaded' });
    } catch {
      set({ status: 'error' });
    }
  },
  restaurantsRanking: null,
  restaurantsRankingStatus: 'idle',
  fetchRestaurantsRanking: async () => {
    if (get().restaurantsRankingStatus === 'loading' || get().restaurantsRankingStatus === 'loaded') return;

    set({ restaurantsRankingStatus: 'loading' });
    try {
      const restaurantsRanking = await fetchRestaurantsRankingRequest();
      set({ restaurantsRanking, restaurantsRankingStatus: 'loaded' });
    } catch {
      set({ restaurantsRankingStatus: 'error' });
    }
  },
  refreshRestaurantsRanking: async () => {
    set({ restaurantsRankingStatus: 'loading' });
    try {
      const restaurantsRanking = await fetchRestaurantsRankingRequest();
      set({ restaurantsRanking, restaurantsRankingStatus: 'loaded' });
    } catch {
      set({ restaurantsRankingStatus: 'error' });
    }
  },
  beerMastersRanking: null,
  beerMastersRankingStatus: 'idle',
  fetchBeerMastersRanking: async () => {
    if (get().beerMastersRankingStatus === 'loading' || get().beerMastersRankingStatus === 'loaded') return;

    set({ beerMastersRankingStatus: 'loading' });
    try {
      const beerMastersRanking = await fetchBeerMastersRankingRequest();
      set({ beerMastersRanking, beerMastersRankingStatus: 'loaded' });
    } catch {
      set({ beerMastersRankingStatus: 'error' });
    }
  },
  refreshBeerMastersRanking: async () => {
    set({ beerMastersRankingStatus: 'loading' });
    try {
      const beerMastersRanking = await fetchBeerMastersRankingRequest();
      set({ beerMastersRanking, beerMastersRankingStatus: 'loaded' });
    } catch {
      set({ beerMastersRankingStatus: 'error' });
    }
  },
  ratings: null,
  ratingsStatus: 'idle',
  fetchRatings: async () => {
    if (get().ratingsStatus === 'loading' || get().ratingsStatus === 'loaded') return;

    set({ ratingsStatus: 'loading' });
    try {
      const ratings = await fetchRatingsRequest();
      set({ ratings, ratingsStatus: 'loaded' });
    } catch {
      set({ ratingsStatus: 'error' });
    }
  },
  refreshRatings: async () => {
    set({ ratingsStatus: 'loading' });
    try {
      const ratings = await fetchRatingsRequest();
      set({ ratings, ratingsStatus: 'loaded' });
    } catch {
      set({ ratingsStatus: 'error' });
    }
  },
}));
