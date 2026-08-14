import { create } from 'zustand';
import type { RegistrationState } from './types';

const initialState = {
  name: '',
  email: '',
  restaurantId: '',
  accepted: false,
};

export const useRegistrationStore = create<RegistrationState>((set) => ({
  ...initialState,
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setRestaurantId: (restaurantId) => set({ restaurantId }),
  setAccepted: (accepted) => set({ accepted }),
  reset: () => set(initialState),
}));
