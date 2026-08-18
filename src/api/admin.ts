import { apiRequest } from './client';
import type { BeerMasterRankingDto, DashboardDto, RestaurantRankingDto } from './types';

export const fetchDashboard = (): Promise<DashboardDto> => apiRequest<DashboardDto>('/admin/dashboard');

export const fetchRestaurantsRanking = (): Promise<RestaurantRankingDto[]> =>
  apiRequest<RestaurantRankingDto[]>('/admin/restaurants/ranking');

export const fetchBeerMastersRanking = (): Promise<BeerMasterRankingDto[]> =>
  apiRequest<BeerMasterRankingDto[]>('/admin/beer-masters/ranking');
