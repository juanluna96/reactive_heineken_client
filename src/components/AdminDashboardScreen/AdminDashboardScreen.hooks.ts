import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../admin';
import { logout as logoutRequest } from '../../api';
import { useAuthStore } from '../../auth';
import { useTranslation } from '../../i18n';
import { ROUTES } from '../../routes';
import { formatRelativeTime } from '../../utils/formatRelativeTime';
import { formatShortDate } from '../../utils/formatShortDate';

const initialsFromName = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const DONUT_RADIUS = 70;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

export const useAdminDashboardScreen = () => {
  const { t, language } = useTranslation();
  const numberFormatter = useMemo(() => new Intl.NumberFormat(language), [language]);
  const navigate = useNavigate();

  const dashboard = useAdminStore((state) => state.dashboard);
  const status = useAdminStore((state) => state.status);
  const fetchDashboard = useAdminStore((state) => state.fetchDashboard);
  const refreshDashboard = useAdminStore((state) => state.refreshDashboard);

  const currentUser = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } finally {
      clearUser();
      navigate(ROUTES.authLogin);
    }
  };

  const handleRefresh = () => {
    refreshDashboard();
  };

  const totals = useMemo(() => {
    if (!dashboard) return null;
    const raw = dashboard.totals;
    const trendDirection: 'up' | 'down' | null =
      raw.ratings_trend_pct === null ? null : raw.ratings_trend_pct >= 0 ? 'up' : 'down';

    return {
      totalRatings: numberFormatter.format(raw.total_ratings),
      averageRating: raw.average_rating.toFixed(2),
      averageRatingStars: Math.round(raw.average_rating),
      restaurantsCount: numberFormatter.format(raw.restaurants_count),
      beerMastersCount: numberFormatter.format(raw.beer_masters_count),
      trendDirection,
      trendLabel:
        raw.ratings_trend_pct === null
          ? null
          : `${raw.ratings_trend_pct >= 0 ? '+' : ''}${raw.ratings_trend_pct}%`,
      newRestaurantsLabel: t.adminDashboard.kpis.newRestaurants.replace('{count}', String(raw.new_restaurants_in_period)),
      newBeerMastersLabel: t.adminDashboard.kpis.newBeerMasters.replace('{count}', String(raw.new_beer_masters_in_period)),
    };
  }, [dashboard, numberFormatter, t]);

  const chartBars = useMemo(() => {
    if (!dashboard) return [];
    const points = dashboard.ratings_over_time;
    const maxCount = Math.max(1, ...points.map((point) => point.count));

    return points.map((point) => ({
      key: point.date,
      label: formatShortDate(point.date, language),
      heightPct: Math.round((point.count / maxCount) * 100),
      count: point.count,
      average: point.average_rating,
    }));
  }, [dashboard, language]);

  const topBeerMasters = useMemo(() => {
    if (!dashboard) return [];
    return dashboard.top_beer_masters.map((entry, index) => ({
      rank: index + 1,
      initials: initialsFromName(entry.name),
      name: entry.name,
      restaurantName: entry.restaurant_name,
      ratingsCount: numberFormatter.format(entry.ratings_count),
      averageRating: entry.average_rating.toFixed(2),
    }));
  }, [dashboard, numberFormatter]);

  const distribution = useMemo(() => {
    if (!dashboard) return null;
    const items = dashboard.rating_distribution;
    const total = items.reduce((sum, item) => sum + item.count, 0);
    const fiveStarCount = items.find((item) => item.rating === 5)?.count ?? 0;
    const fiveStarPct = total > 0 ? Math.round((fiveStarCount / total) * 100) : 0;

    return {
      items: items.map((item) => ({
        rating: item.rating,
        label: t.adminDashboard.distribution.ratingLabel.replace('{rating}', String(item.rating)),
        count: numberFormatter.format(item.count),
        pct: total > 0 ? Math.round((item.count / total) * 100) : 0,
      })),
      fiveStarPct,
      circumference: DONUT_CIRCUMFERENCE,
      dashOffset: DONUT_CIRCUMFERENCE * (1 - fiveStarPct / 100),
    };
  }, [dashboard, numberFormatter, t]);

  const recentRatings = useMemo(() => {
    if (!dashboard) return [];
    return dashboard.recent_ratings.map((entry) => ({
      id: entry.id,
      initials: initialsFromName(entry.customer_name),
      customerName: entry.customer_name,
      relativeTime: formatRelativeTime(entry.created_at, t.adminDashboard.time),
      stars: entry.rating,
      comment: entry.comment,
      restaurantName: entry.restaurant_name,
      beerMasterName: entry.beer_master_name,
    }));
  }, [dashboard, t]);

  const isLoading = status === 'loading' && !dashboard;
  const isRefreshing = status === 'loading' && Boolean(dashboard);
  const isError = status === 'error';
  const isEmpty = status === 'loaded' && dashboard !== null && dashboard.totals.total_ratings === 0;

  const currentUserInitials = currentUser ? initialsFromName(currentUser.full_name) : '';

  return {
    t,
    currentUser,
    currentUserInitials,
    isLoading,
    isRefreshing,
    isError,
    isEmpty,
    totals,
    chartBars,
    topBeerMasters,
    distribution,
    recentRatings,
    handleRefresh,
    handleLogout,
  };
};
