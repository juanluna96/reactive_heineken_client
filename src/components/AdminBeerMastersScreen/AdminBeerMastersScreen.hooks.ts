import { useEffect, useMemo, useRef, useState } from 'react';
import { useAdminStore } from '../../admin';
import { useAuthStore } from '../../auth';
import { useTranslation } from '../../i18n';
import { initialsFromName } from '../../utils/initialsFromName';

export type BeerMasterSortOption = 'rating' | 'popularity' | 'newest';

const PAGE_SIZE = 10;
export const ALL_RESTAURANTS = 'all';

export const useAdminBeerMastersScreen = () => {
  const { t, language } = useTranslation();
  const numberFormatter = useMemo(() => new Intl.NumberFormat(language), [language]);

  const ranking = useAdminStore((state) => state.beerMastersRanking);
  const status = useAdminStore((state) => state.beerMastersRankingStatus);
  const fetchBeerMastersRanking = useAdminStore((state) => state.fetchBeerMastersRanking);
  const refreshBeerMastersRanking = useAdminStore((state) => state.refreshBeerMastersRanking);

  // Only the restaurant role has a restaurant_id of its own — owner/heineken
  // see the ranking with nothing highlighted.
  const currentUser = useAuthStore((state) => state.user);
  const myRestaurantId = currentUser?.role === 'restaurant' ? currentUser.restaurant_id : null;

  const [sortBy, setSortBy] = useState<BeerMasterSortOption>('rating');
  const [restaurantFilter, setRestaurantFilter] = useState<string>(ALL_RESTAURANTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasJumpedToOwnRestaurant, setHasJumpedToOwnRestaurant] = useState(false);
  const ownCardRef = useRef<HTMLDivElement | null>(null);

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

    // The API already returns rating desc as the baseline order — for the
    // other options we just re-sort that same fetched list client-side,
    // no extra round-trip needed.
    const sorted = [...ranking];
    if (sortBy === 'popularity') {
      sorted.sort((a, b) => b.ratings_count - a.ratings_count);
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return sorted.map((beerMaster, index) => ({
      // Freehand-typed names have no registered id — key on restaurant+name
      // instead, which is unique per the backend's own grouping.
      key: beerMaster.id ?? `${beerMaster.restaurant_id}-${beerMaster.name}`,
      rank: index + 1,
      initials: initialsFromName(beerMaster.name),
      name: beerMaster.name,
      restaurantId: beerMaster.restaurant_id,
      restaurantName: beerMaster.restaurant_name,
      isOwn: beerMaster.restaurant_id === myRestaurantId,
      hasRatings: beerMaster.ratings_count > 0,
      averageRating: beerMaster.average_rating.toFixed(2),
      ratingPct: Math.max(4, Math.round((beerMaster.average_rating / 5) * 100)),
      ratingsCountLabel: t.adminBeerMasters.ratingsCount.replace(
        '{count}',
        numberFormatter.format(beerMaster.ratings_count),
      ),
    }));
  }, [ranking, sortBy, myRestaurantId, numberFormatter, t]);

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

  // One-time on load: jump straight to whichever page contains the first of
  // the logged-in restaurant's own beer masters, so they don't have to hunt
  // for their rank.
  useEffect(() => {
    if (hasJumpedToOwnRestaurant || !myRestaurantId) return;
    const indexInList = filteredItems.findIndex((item) => item.isOwn);
    if (indexInList === -1) return;
    setPage(Math.floor(indexInList / PAGE_SIZE) + 1);
    setHasJumpedToOwnRestaurant(true);
  }, [hasJumpedToOwnRestaurant, myRestaurantId, filteredItems]);

  // Runs after the jump above lands on the right page and that card is
  // actually in `items` (and thus ownCardRef is attached).
  useEffect(() => {
    if (!hasJumpedToOwnRestaurant) return;
    ownCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [hasJumpedToOwnRestaurant, items]);

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
    ownCardRef,
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
  };
};
