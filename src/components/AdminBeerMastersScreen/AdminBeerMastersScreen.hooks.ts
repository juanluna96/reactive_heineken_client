import { useEffect, useMemo, useState } from 'react';
import { useAdminStore } from '../../admin';
import { useAuthStore } from '../../auth';
import type { ScoreComponentLine } from '../ScoreBreakdown';
import { useTranslation } from '../../i18n';
import { initialsFromName } from '../../utils/initialsFromName';

export type BeerMasterSortOption = 'score' | 'popularity' | 'newest';

const PAGE_SIZE = 10;
export const ALL_RESTAURANTS = 'all';

export const useAdminBeerMastersScreen = () => {
  const { t } = useTranslation();

  const ranking = useAdminStore((state) => state.beerMastersRanking);
  const status = useAdminStore((state) => state.beerMastersRankingStatus);
  const fetchBeerMastersRanking = useAdminStore((state) => state.fetchBeerMastersRanking);
  const refreshBeerMastersRanking = useAdminStore((state) => state.refreshBeerMastersRanking);

  // Only the global admin roles get the click-to-expand score breakdown.
  const role = useAuthStore((state) => state.user?.role);
  const canExpand = role === 'owner' || role === 'heineken';

  const [sortBy, setSortBy] = useState<BeerMasterSortOption>('score');
  const [restaurantFilter, setRestaurantFilter] = useState<string>(ALL_RESTAURANTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [breakdownKey, setBreakdownKey] = useState<string | null>(null);
  const openBreakdown = (key: string) => setBreakdownKey(key);
  const closeBreakdown = () => setBreakdownKey(null);

  useEffect(() => {
    fetchBeerMastersRanking();
  }, [fetchBeerMastersRanking]);

  const handleRefresh = () => {
    refreshBeerMastersRanking();
  };

  const handleSortChange = (value: BeerMasterSortOption) => {
    setSortBy(value);
    setPage(1);
  };

  const handleRestaurantFilterChange = (value: string) => {
    setRestaurantFilter(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const restaurantOptions = useMemo(() => {
    if (!ranking) return [];
    const byId = new Map<string, string>();
    for (const beerMaster of ranking) {
      byId.set(beerMaster.restaurant_id, beerMaster.restaurant_name);
    }
    return Array.from(byId, ([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
  }, [ranking]);

  // Rank reflects the beer master's position in the full sorted list — it
  // must be computed before search/restaurant filters narrow it down, so
  // filtering still shows their real rank instead of "01".
  const rankedItems = useMemo(() => {
    if (!ranking) return [];

    // The API returns rating desc as the baseline order — we re-sort that
    // same fetched list client-side, no extra round-trip needed.
    const sorted = [...ranking];
    if (sortBy === 'score') {
      // Score desc; fall back to the partial score so staff still pending a
      // growth final value sort sensibly, and staff with no ratings go last.
      const rank = (b: (typeof ranking)[number]) => b.score ?? b.partial_score ?? -1;
      sorted.sort((a, b) => rank(b) - rank(a));
    } else if (sortBy === 'popularity') {
      sorted.sort((a, b) => b.ratings_count - a.ratings_count);
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return sorted.map((beerMaster, index) => {
      // While the staffer's restaurant has no growth "valor final" yet, the
      // API withholds the full composite and only sends partial_score — the
      // non-growth slice of the formula (rating_weight_pct % of it).
      const shownScore = beerMaster.is_partial ? beerMaster.partial_score : beerMaster.score;
      return {
        // Freehand-typed names have no registered id — key on restaurant+name
        // instead, which is unique per the backend's own grouping.
        key: beerMaster.id ?? `${beerMaster.restaurant_id}-${beerMaster.name}`,
        rank: index + 1,
        initials: initialsFromName(beerMaster.name),
        name: beerMaster.name,
        restaurantId: beerMaster.restaurant_id,
        restaurantName: beerMaster.restaurant_name,
        hasRatings: beerMaster.ratings_count > 0,
        hasScore: shownScore != null,
        isPartialScore: beerMaster.is_partial,
        scoreValue: shownScore != null ? shownScore.toFixed(1) : t.adminBeerMasters.score.empty,
        scoreCaption: beerMaster.is_partial
          ? t.adminBeerMasters.score.partialLabel
          : t.adminBeerMasters.score.label,
        scoreTotal: beerMaster.score,
        partialTotal: beerMaster.partial_score,
        ratingWeightPct: beerMaster.rating_weight_pct,
        breakdown: beerMaster.score_breakdown.map(
          (item): ScoreComponentLine => ({
            label: item.label,
            weightPct: item.weight_pct,
            cs: item.cs,
            contribution: item.contribution,
            pending: item.pending,
          }),
        ),
      };
    });
  }, [ranking, sortBy, t]);

  // Resolved from the full list (not the paginated slice) so the modal stays
  // open if the page changes underneath it.
  const breakdownItem = useMemo(
    () => rankedItems.find((item) => item.key === breakdownKey) ?? null,
    [rankedItems, breakdownKey],
  );

  // A single banner next to the search field — the per-card note would repeat
  // the same sentence on every partial-score row.
  const partialScoreWarning = useMemo(() => {
    const partial = (ranking ?? []).filter((beerMaster) => beerMaster.is_partial);
    if (partial.length === 0) return null;
    return t.adminBeerMasters.score.partialNote.replace(
      '{pct}',
      String(Math.round(partial[0].rating_weight_pct)),
    );
  }, [ranking, t]);

  const filteredItems = useMemo(() => {
    let result = rankedItems;
    if (restaurantFilter !== ALL_RESTAURANTS) {
      result = result.filter((item) => item.restaurantId === restaurantFilter);
    }
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (normalizedQuery) {
      result = result.filter((item) => item.name.toLowerCase().includes(normalizedQuery));
    }
    return result;
  }, [rankedItems, restaurantFilter, searchQuery]);

  const pageCount = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const items = useMemo(
    () => filteredItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filteredItems, currentPage],
  );

  const handlePrevPage = () => setPage((current) => Math.max(1, current - 1));
  const handleNextPage = () => setPage((current) => Math.min(pageCount, current + 1));

  const isLoading = status === 'loading' && !ranking;
  const isRefreshing = status === 'loading' && Boolean(ranking);
  const isError = status === 'error';
  const isEmpty = status === 'loaded' && ranking !== null && ranking.length === 0;
  const hasNoResults = !isEmpty && filteredItems.length === 0;
  const selectedRestaurantName =
    restaurantFilter === ALL_RESTAURANTS
      ? null
      : (restaurantOptions.find((option) => option.id === restaurantFilter)?.name ?? null);

  return {
    t,
    isLoading,
    isRefreshing,
    isError,
    isEmpty,
    hasNoResults,
    items,
    sortBy,
    setSortBy: handleSortChange,
    restaurantFilter,
    setRestaurantFilter: handleRestaurantFilterChange,
    restaurantOptions,
    selectedRestaurantName,
    searchQuery,
    setSearchQuery: handleSearchChange,
    currentPage,
    pageCount,
    handlePrevPage,
    handleNextPage,
    handleRefresh,
    partialScoreWarning,
    canExpand,
    breakdownItem,
    openBreakdown,
    closeBreakdown,
  };
};
