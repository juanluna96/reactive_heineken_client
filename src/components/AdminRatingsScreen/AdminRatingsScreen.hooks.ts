import { useEffect, useMemo, useState } from 'react';
import { useAdminStore } from '../../admin';
import { useTranslation } from '../../i18n';
import { formatRelativeTime } from '../../utils/formatRelativeTime';
import { initialsFromName } from '../../utils/initialsFromName';

export type RatingFilterOption = 'all' | '5' | '4' | '3-';

const PAGE_SIZE = 10;
export const ALL_RESTAURANTS = 'all';
export const ALL_RATINGS = 'all';

export const useAdminRatingsScreen = () => {
  const { t, language } = useTranslation();
  const numberFormatter = useMemo(() => new Intl.NumberFormat(language), [language]);

  const ratings = useAdminStore((state) => state.ratings);
  const status = useAdminStore((state) => state.ratingsStatus);
  const fetchRatings = useAdminStore((state) => state.fetchRatings);
  const refreshRatings = useAdminStore((state) => state.refreshRatings);

  const [restaurantFilter, setRestaurantFilter] = useState<string>(ALL_RESTAURANTS);
  const [ratingFilter, setRatingFilter] = useState<RatingFilterOption>(ALL_RATINGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  const handleRefresh = () => {
    refreshRatings();
  };

  const resetPaging = () => setVisibleCount(PAGE_SIZE);

  const handleRestaurantFilterChange = (value: string) => {
    setRestaurantFilter(value);
    resetPaging();
  };

  const handleRatingFilterChange = (value: RatingFilterOption) => {
    setRatingFilter(value);
    resetPaging();
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    resetPaging();
  };

  const handleClearFilters = () => {
    setRestaurantFilter(ALL_RESTAURANTS);
    setRatingFilter(ALL_RATINGS);
    setSearchQuery('');
    resetPaging();
  };

  const handleLoadMore = () => setVisibleCount((count) => count + PAGE_SIZE);

  // Only ever contains the venues the backend actually returned reviews
  // for — for the restaurant role that's their own single venue (or none),
  // since /admin/ratings already scopes the data server-side.
  const restaurantOptions = useMemo(() => {
    if (!ratings) return [];
    const byId = new Map<string, string>();
    for (const review of ratings.reviews) {
      byId.set(review.restaurant_id, review.restaurant_name);
    }
    return Array.from(byId, ([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
  }, [ratings]);

  const reviewItems = useMemo(() => {
    if (!ratings) return [];
    return ratings.reviews.map((review) => ({
      id: review.id,
      initials: initialsFromName(review.customer_name),
      customerName: review.customer_name,
      rating: review.rating,
      comment: review.comment,
      restaurantId: review.restaurant_id,
      restaurantName: review.restaurant_name,
      beerMasterName: review.beer_master_name,
      relativeTime: formatRelativeTime(review.created_at, t.adminDashboard.time),
    }));
  }, [ratings, t]);

  const filteredItems = useMemo(() => {
    let result = reviewItems;
    if (restaurantFilter !== ALL_RESTAURANTS) {
      result = result.filter((item) => item.restaurantId === restaurantFilter);
    }
    if (ratingFilter === '5') {
      result = result.filter((item) => item.rating === 5);
    } else if (ratingFilter === '4') {
      result = result.filter((item) => item.rating === 4);
    } else if (ratingFilter === '3-') {
      result = result.filter((item) => item.rating <= 3);
    }
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (normalizedQuery) {
      result = result.filter(
        (item) =>
          item.customerName.toLowerCase().includes(normalizedQuery) ||
          item.comment?.toLowerCase().includes(normalizedQuery),
      );
    }
    return result;
  }, [reviewItems, restaurantFilter, ratingFilter, searchQuery]);

  const items = useMemo(() => filteredItems.slice(0, visibleCount), [filteredItems, visibleCount]);
  const hasMore = visibleCount < filteredItems.length;

  const stats = useMemo(() => {
    if (!ratings) return null;
    const trend = ratings.average_rating_trend;
    return {
      averageRating: ratings.average_rating.toFixed(2),
      totalRatingsLabel: numberFormatter.format(ratings.total_ratings),
      positiveSharePct: Math.round(ratings.positive_share_pct),
      trendLabel:
        trend === null
          ? null
          : trend >= 0
            ? t.adminRatings.stats.trendUp.replace('{value}', trend.toFixed(2))
            : t.adminRatings.stats.trendDown.replace('{value}', trend.toFixed(2)),
      trendDirection: trend === null ? null : trend >= 0 ? ('up' as const) : ('down' as const),
    };
  }, [ratings, numberFormatter, t]);

  const isLoading = status === 'loading' && !ratings;
  const isRefreshing = status === 'loading' && Boolean(ratings);
  const isError = status === 'error';
  const isEmpty = status === 'loaded' && ratings !== null && ratings.total_ratings === 0;
  const hasNoResults = !isEmpty && filteredItems.length === 0;

  return {
    t,
    isLoading,
    isRefreshing,
    isError,
    isEmpty,
    hasNoResults,
    stats,
    items,
    hasMore,
    handleLoadMore,
    restaurantFilter,
    setRestaurantFilter: handleRestaurantFilterChange,
    restaurantOptions,
    ratingFilter,
    setRatingFilter: handleRatingFilterChange,
    searchQuery,
    setSearchQuery: handleSearchChange,
    handleClearFilters,
    handleRefresh,
  };
};
