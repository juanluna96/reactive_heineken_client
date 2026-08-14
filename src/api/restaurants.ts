import { apiRequest } from './client';
import type { RestaurantDto } from './types';

export const fetchRestaurants = (): Promise<RestaurantDto[]> => apiRequest<RestaurantDto[]>('/restaurants');
