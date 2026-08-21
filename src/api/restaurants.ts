import { apiRequest } from './client';
import type { RestaurantDto, RestaurantWritePayload } from './types';

export const fetchRestaurants = (): Promise<RestaurantDto[]> => apiRequest<RestaurantDto[]>('/restaurants');

export const createRestaurant = (payload: RestaurantWritePayload): Promise<RestaurantDto> =>
  apiRequest<RestaurantDto>('/restaurants', { method: 'POST', body: JSON.stringify(payload) });

export const updateRestaurant = (restaurantId: string, payload: RestaurantWritePayload): Promise<RestaurantDto> =>
  apiRequest<RestaurantDto>(`/restaurants/${restaurantId}`, { method: 'PUT', body: JSON.stringify(payload) });

export const deleteRestaurant = (restaurantId: string): Promise<void> =>
  apiRequest<void>(`/restaurants/${restaurantId}`, { method: 'DELETE' });
