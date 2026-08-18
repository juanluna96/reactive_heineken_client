import { create } from 'zustand';
import { fetchDashboard as fetchDashboardRequest } from '../api';
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
}));
