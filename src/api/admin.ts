import { apiRequest } from './client';
import type { AdminBeerMasterDto, BeerMasterRankingDto, DashboardDto, RatingsDto, RestaurantRankingDto } from './types';

export const fetchDashboard = (): Promise<DashboardDto> => apiRequest<DashboardDto>('/admin/dashboard');

export const fetchRestaurantsRanking = (): Promise<RestaurantRankingDto[]> =>
  apiRequest<RestaurantRankingDto[]>('/admin/restaurants/ranking');

export const fetchAllBeerMasters = (): Promise<AdminBeerMasterDto[]> =>
  apiRequest<AdminBeerMasterDto[]>('/admin/beer-masters');

export const fetchBeerMastersRanking = (): Promise<BeerMasterRankingDto[]> =>
  apiRequest<BeerMasterRankingDto[]>('/admin/beer-masters/ranking');

export const fetchRatings = (): Promise<RatingsDto> => apiRequest<RatingsDto>('/admin/ratings');
