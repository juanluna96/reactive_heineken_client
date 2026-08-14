import { create } from 'zustand';
import { fetchRestaurants as fetchRestaurantsRequest } from '../api';
import type { RestaurantsState } from './types';

export const useRestaurantsStore = create<RestaurantsState>((set, get) => ({
  restaurants: [],
  status: 'idle',
  fetchRestaurants: async () => {
    if (get().status === 'loading' || get().status === 'loaded') return;

    set({ status: 'loading' });
    try {
      const restaurants = await fetchRestaurantsRequest();
      set({ restaurants, status: 'loaded' });
    } catch {
      set({ status: 'error' });
    }
  },
}));
