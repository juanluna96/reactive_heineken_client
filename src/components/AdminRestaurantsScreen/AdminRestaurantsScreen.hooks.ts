import { useEffect, useMemo, useRef, useState } from 'react';
import { useAdminStore } from '../../admin';
import { useAuthStore } from '../../auth';
import type { ScoreStaffLine } from '../ScoreBreakdown';
import { useTranslation } from '../../i18n';
import { initialsFromName } from '../../utils/initialsFromName';

export type RestaurantSortOption = 'score' | 'rating' | 'popularity' | 'newest';

const PAGE_SIZE = 10;

export const useAdminRestaurantsScreen = () => {
  const { t } = useTranslation();

  const ranking = useAdminStore((state) => state.restaurantsRanking);
  const status = useAdminStore((state) => state.restaurantsRankingStatus);
  const fetchRestaurantsRanking = useAdminStore((state) => state.fetchRestaurantsRanking);
  const refreshRestaurantsRanking = useAdminStore((state) => state.refreshRestaurantsRanking);

  // Only the restaurant role has a restaurant_id of its own — owner/heineken
  // see the ranking with nothing highlighted.
  const currentUser = useAuthStore((state) => state.user);
  const myRestaurantId = currentUser?.role === 'restaurant' ? currentUser.restaurant_id : null;
  // Only the global admin roles get the click-to-expand score breakdown.
  const canExpand = currentUser?.role === 'owner' || currentUser?.role === 'heineken';

  const [sortBy, setSortBy] = useState<RestaurantSortOption>('score');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasJumpedToOwnRestaurant, setHasJumpedToOwnRestaurant] = useState(false);
  const [breakdownId, setBreakdownId] = useState<string | null>(null);
  const openBreakdown = (id: string) => setBreakdownId(id);
  const closeBreakdown = () => setBreakdownId(null);
  const ownCardRef = useRef<HTMLDivElement | null>(null);

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

    // The API returns rating desc as the baseline order — for the other
    // options we re-sort that same fetched list client-side, no round-trip.
    const sorted = [...ranking];
    if (sortBy === 'score') {
      // Score desc — fall back to the partial (rating-only) score so
      // restaurants still pending a growth final value sort sensibly;
      // restaurants with no ratings at all go last.
      const rank = (r: (typeof ranking)[number]) => r.score ?? r.partial_score ?? -1;
      sorted.sort((a, b) => rank(b) - rank(a));
    } else if (sortBy === 'popularity') {
      sorted.sort((a, b) => b.ratings_count - a.ratings_count);
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return sorted.map((restaurant, index) => {
      // Withheld full score → show the partial (non-growth) score instead,
      // flagged as "valor calculado" with a note (see AdminRestaurantsScreen).
      const shownScore = restaurant.is_partial ? restaurant.partial_score : restaurant.score;
      return {
        id: restaurant.id,
        rank: index + 1,
        initials: initialsFromName(restaurant.name),
        name: restaurant.name,
        isOwn: restaurant.id === myRestaurantId,
        score: shownScore,
        hasScore: shownScore != null,
        isPartialScore: restaurant.is_partial,
        scoreLabel: shownScore != null ? shownScore.toFixed(1) : t.adminRestaurants.scoreEmpty,
        scoreCaption: restaurant.is_partial
          ? t.adminRestaurants.scorePartialLabel
          : t.adminRestaurants.scoreLabel,
        scoreTotal: restaurant.score,
        partialTotal: restaurant.partial_score,
        ratingWeightPct: restaurant.rating_weight_pct,
        staffLines: restaurant.staff_scores.map(
          (staff): ScoreStaffLine => ({
            name: staff.name,
            ratingsCount: staff.ratings_count,
            score: staff.is_partial ? staff.partial_score : staff.score,
            isPartial: staff.is_partial,
          }),
        ),
      };
    });
  }, [ranking, sortBy, myRestaurantId, t]);

  // Resolved from the full list so the modal survives pagination / re-sort.
  const breakdownItem = useMemo(
    () => rankedItems.find((item) => item.id === breakdownId) ?? null,
    [rankedItems, breakdownId],
  );

  // A single banner next to the search field — repeating the same note on
  // every partial-score row would be noise.
  const partialScoreWarning = useMemo(() => {
    const partial = (ranking ?? []).filter((restaurant) => restaurant.is_partial);
    if (partial.length === 0) return null;
    return t.adminRestaurants.scorePartialNote.replace(
      '{pct}',
      String(Math.round(partial[0].rating_weight_pct)),
    );
  }, [ranking, t]);

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

  // One-time on load: jump straight to whichever page contains the logged-in
  // restaurant's own card, so they don't have to hunt for their rank.
  useEffect(() => {
    if (hasJumpedToOwnRestaurant || !myRestaurantId) return;
    const indexInList = filteredItems.findIndex((item) => item.id === myRestaurantId);
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
  const hasNoSearchResults = !isEmpty && filteredItems.length === 0;

  return {
    t,
    isLoading,
    isRefreshing,
    isError,
    isEmpty,
    hasNoSearchResults,
    items,
    partialScoreWarning,
    canExpand,
    breakdownItem,
    openBreakdown,
    closeBreakdown,
    ownCardRef,
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
