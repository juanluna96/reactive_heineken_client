import type { BeerMasterRankingDto, DashboardDto, RatingsDto, RestaurantRankingDto } from '../api';

export type DashboardStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface AdminState {
  dashboard: DashboardDto | null;
  status: DashboardStatus;
  /** Fetches once and caches — safe to call from multiple screens, later callers are no-ops while loading/loaded. */
  fetchDashboard: () => Promise<void>;
  /** Forces a fresh fetch, bypassing the cache (e.g. a manual refresh action). */
  refreshDashboard: () => Promise<void>;
  restaurantsRanking: RestaurantRankingDto[] | null;
  restaurantsRankingStatus: DashboardStatus;
  fetchRestaurantsRanking: () => Promise<void>;
  refreshRestaurantsRanking: () => Promise<void>;
  beerMastersRanking: BeerMasterRankingDto[] | null;
  beerMastersRankingStatus: DashboardStatus;
  fetchBeerMastersRanking: () => Promise<void>;
  refreshBeerMastersRanking: () => Promise<void>;
  ratings: RatingsDto | null;
  ratingsStatus: DashboardStatus;
  fetchRatings: () => Promise<void>;
  refreshRatings: () => Promise<void>;
}
