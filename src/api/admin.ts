import { apiRequest } from './client';
import type { DashboardDto } from './types';

export const fetchDashboard = (): Promise<DashboardDto> => apiRequest<DashboardDto>('/admin/dashboard');
