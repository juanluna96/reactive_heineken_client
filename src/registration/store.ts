import { create } from 'zustand';
import type { RegistrationState } from './types';

const initialState = {
  name: '',
  email: '',
  restaurant: '',
  accepted: false,
};

export const useRegistrationStore = create<RegistrationState>((set) => ({
  ...initialState,
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setRestaurant: (restaurant) => set({ restaurant }),
  setAccepted: (accepted) => set({ accepted }),
  reset: () => set(initialState),
}));
