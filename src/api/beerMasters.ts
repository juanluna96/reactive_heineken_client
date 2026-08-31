import { apiRequest } from './client';
import type { BeerMasterDto, BeerMasterWritePayload } from './types';

export const fetchBeerMasters = (restaurantId: string): Promise<BeerMasterDto[]> =>
  apiRequest<BeerMasterDto[]>(`/restaurants/${restaurantId}/bar-staff`);

export const createBeerMaster = (restaurantId: string, payload: BeerMasterWritePayload): Promise<BeerMasterDto> =>
  apiRequest<BeerMasterDto>(`/restaurants/${restaurantId}/bar-staff`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateBeerMaster = (
  restaurantId: string,
  beerMasterId: string,
  payload: BeerMasterWritePayload,
): Promise<BeerMasterDto> =>
  apiRequest<BeerMasterDto>(`/restaurants/${restaurantId}/bar-staff/${beerMasterId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteBeerMaster = (restaurantId: string, beerMasterId: string): Promise<void> =>
  apiRequest<void>(`/restaurants/${restaurantId}/bar-staff/${beerMasterId}`, { method: 'DELETE' });

export const transferBeerMaster = (
  restaurantId: string,
  beerMasterId: string,
  targetRestaurantId: string,
): Promise<BeerMasterDto> =>
  apiRequest<BeerMasterDto>(`/restaurants/${restaurantId}/bar-staff/${beerMasterId}/transfer`, {
    method: 'POST',
    body: JSON.stringify({ target_restaurant_id: targetRestaurantId }),
  });
