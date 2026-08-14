import type { RestaurantDto } from '../api';

export type RestaurantsStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface RestaurantsState {
  restaurants: RestaurantDto[];
  status: RestaurantsStatus;
  /** Fetches once and caches — safe to call from multiple screens, later callers are no-ops while loading/loaded. */
  fetchRestaurants: () => Promise<void>;
}
