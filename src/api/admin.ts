import { apiRequest } from './client';
import type { DashboardDto, RestaurantRankingDto } from './types';

export const fetchDashboard = (): Promise<DashboardDto> => apiRequest<DashboardDto>('/admin/dashboard');

export const fetchRestaurantsRanking = (): Promise<RestaurantRankingDto[]> =>
  apiRequest<RestaurantRankingDto[]>('/admin/restaurants/ranking');
