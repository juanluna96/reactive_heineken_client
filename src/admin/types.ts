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
  /** Clears every cached slice back to idle — call on login/logout so a
   *  role switch can't show the previous session's (differently-scoped) data. */
  resetAdminData: () => void;
  /** Drops the cached rankings back to idle (keeping the data, so no flash)
   *  so the next screen visit refetches — call after editing the STAR SERVE
   *  scoring config, which changes every score/`rating_weight_pct`. */
  invalidateScoreData: () => void;
}
