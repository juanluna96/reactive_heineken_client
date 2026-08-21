import { apiRequest } from './client';
import type { BeerMasterDto, BeerMasterWritePayload } from './types';

export const fetchBeerMasters = (restaurantId: string): Promise<BeerMasterDto[]> =>
  apiRequest<BeerMasterDto[]>(`/restaurants/${restaurantId}/beer-masters`);

export const createBeerMaster = (restaurantId: string, payload: BeerMasterWritePayload): Promise<BeerMasterDto> =>
  apiRequest<BeerMasterDto>(`/restaurants/${restaurantId}/beer-masters`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateBeerMaster = (
  restaurantId: string,
  beerMasterId: string,
  payload: BeerMasterWritePayload,
): Promise<BeerMasterDto> =>
  apiRequest<BeerMasterDto>(`/restaurants/${restaurantId}/beer-masters/${beerMasterId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteBeerMaster = (restaurantId: string, beerMasterId: string): Promise<void> =>
  apiRequest<void>(`/restaurants/${restaurantId}/beer-masters/${beerMasterId}`, { method: 'DELETE' });
