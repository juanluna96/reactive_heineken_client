import { useEffect, useMemo, useState } from 'react';
import { useAdminStore } from '../../admin';
import { useTranslation } from '../../i18n';
import { initialsFromName } from '../../utils/initialsFromName';

export type RestaurantSortOption = 'rating' | 'popularity' | 'newest';

const PAGE_SIZE = 10;

export const useAdminRestaurantsScreen = () => {
  const { t, language } = useTranslation();
  const numberFormatter = useMemo(() => new Intl.NumberFormat(language), [language]);

  const ranking = useAdminStore((state) => state.restaurantsRanking);
  const status = useAdminStore((state) => state.restaurantsRankingStatus);
  const fetchRestaurantsRanking = useAdminStore((state) => state.fetchRestaurantsRanking);
  const refreshRestaurantsRanking = useAdminStore((state) => state.refreshRestaurantsRanking);

  const [sortBy, setSortBy] = useState<RestaurantSortOption>('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchRestaurantsRanking();
  }, [fetchRestaurantsRanking]);

  const handleRefresh = () => {
    refreshRestaurantsRanking();
  };

  const handleSortChange = (value: RestaurantSortOption) => {
    setSortBy(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  // Rank reflects the restaurant's position in the full sorted list — it
  // must be computed before search filters the list down, so searching
  // for a lower-ranked place still shows its real rank instead of "01".
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

    return sorted.map((restaurant, index) => ({
      id: restaurant.id,
      rank: index + 1,
      initials: initialsFromName(restaurant.name),
      name: restaurant.name,
      hasRatings: restaurant.ratings_count > 0,
      averageRating: restaurant.average_rating.toFixed(2),
      ratingsCountLabel: t.adminRestaurants.ratingsCount.replace(
        '{count}',
        numberFormatter.format(restaurant.ratings_count),
      ),
      beerMastersToggleLabel: t.adminRestaurants.beerMasters.toggle.replace(
        '{count}',
        String(restaurant.beer_masters.length),
      ),
      beerMasters: restaurant.beer_masters.map((master) => ({
        name: master.name,
        averageRating: master.average_rating.toFixed(2),
      })),
    }));
  }, [ranking, sortBy, numberFormatter, t]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return rankedItems;
    return rankedItems.filter((item) => item.name.toLowerCase().includes(normalizedQuery));
  }, [rankedItems, searchQuery]);

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
  const hasNoSearchResults = !isEmpty && filteredItems.length === 0;

  return {
    t,
    isLoading,
    isRefreshing,
    isError,
    isEmpty,
    hasNoSearchResults,
    items,
    sortBy,
    setSortBy: handleSortChange,
    searchQuery,
    setSearchQuery: handleSearchChange,
    currentPage,
    pageCount,
    handlePrevPage,
    handleNextPage,
    handleRefresh,
  };
};
