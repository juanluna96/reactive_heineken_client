import { create } from 'zustand';
import type { RegistrationState } from './types';

const initialState = {
  name: '',
  phone: '',
  // ISO 3166-1 alpha-2 — Panama (+507) by default, this is a Panamanian activation.
  phoneCountry: 'PA',
  restaurantId: '',
  accepted: false,
};

export const useRegistrationStore = create<RegistrationState>((set) => ({
  ...initialState,
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setPhoneCountry: (phoneCountry) => set({ phoneCountry }),
  setRestaurantId: (restaurantId) => set({ restaurantId }),
  setAccepted: (accepted) => set({ accepted }),
  reset: () => set(initialState),
}));
