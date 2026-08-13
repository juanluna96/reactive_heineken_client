import { apiRequest } from './client';
import type { BeerMasterDto } from './types';

export const fetchBeerMasters = (restaurantId: number): Promise<BeerMasterDto[]> =>
  apiRequest<BeerMasterDto[]>(`/restaurants/${restaurantId}/beer-masters`);
