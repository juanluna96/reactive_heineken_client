import { create } from 'zustand';
import { fetchCurrentUser } from '../api';
import type { AuthState } from './types';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  status: 'idle',
  checkSession: async () => {
    if (get().status === 'checking' || get().status === 'authenticated') return;

    set({ status: 'checking' });
    try {
      const user = await fetchCurrentUser();
      set({ user, status: 'authenticated' });
    } catch {
      set({ user: null, status: 'unauthenticated' });
    }
  },
  setUser: (user) => set({ user, status: 'authenticated' }),
  clearUser: () => set({ user: null, status: 'unauthenticated' }),
}));
