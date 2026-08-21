import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background.png';
import backgroundImageLaptop from '../../assets/images/background-laptop.png';
import { TABLET_BREAKPOINT } from '../../styles/breakpoints';
import { AdminSidebar } from '../AdminSidebar';
import { ScreenOverlay } from '../ScreenOverlay';
import { Skeleton } from '../Skeleton';
import * as S from './AdminRatingsScreen.styles';

const SKELETON_STAT_CARDS = 3;
const SKELETON_REVIEW_CARDS = 6;
import {
  ALL_RATINGS,
  ALL_RESTAURANTS,
  useAdminRatingsScreen,
  type RatingFilterOption,
} from './AdminRatingsScreen.hooks';

export const AdminRatingsScreen = () => {
  const {
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
    setRestaurantFilter,
    restaurantOptions,
    ratingFilter,
    setRatingFilter,
    searchQuery,
    setSearchQuery,
    handleClearFilters,
    handleRefresh,
  } = useAdminRatingsScreen();

  const sidebar = <AdminSidebar activeItem="ratings" />;

  const background = (
    <S.Background>
      <picture>
        <source media={`(min-width: ${TABLET_BREAKPOINT})`} srcSet={backgroundImageLaptop} />
        <S.BackgroundImage src={backgroundImage} alt="" />
      </picture>
      <ScreenOverlay />
    </S.Background>
  );

  if (isLoading) {
    return (
      <S.Screen>
        {background}
        {sidebar}
        <S.Main>
          <S.TopBar>
            <S.TitleGroup>
              <S.PageTitle>{t.adminRatings.pageTitle}</S.PageTitle>
              <S.PageSubtitle>{t.adminRatings.pageSubtitle}</S.PageSubtitle>
            </S.TitleGroup>
          </S.TopBar>
          <S.Content initial="hidden" animate="visible" variants={staggerContainer}>
            <S.StatsGrid variants={staggerItem}>
              {Array.from({ length: SKELETON_STAT_CARDS }).map((_, index) => (
                <S.StatCard key={index}>
                  <Skeleton width="100px" height="12px" />
                  <Skeleton width="70px" height="28px" style={{ marginTop: '10px' }} />
                </S.StatCard>
              ))}
            </S.StatsGrid>
            {Array.from({ length: SKELETON_REVIEW_CARDS }).map((_, index) => (
              <S.ReviewCard key={index} variants={staggerItem}>
                <Skeleton width="44px" height="44px" radius="9999px" />
                <S.ReviewBody style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Skeleton width="140px" height="16px" />
                  <Skeleton width="90%" height="14px" />
                </S.ReviewBody>
              </S.ReviewCard>
            ))}
          </S.Content>
        </S.Main>
      </S.Screen>
    );
  }

  if (isError) {
    return (
      <S.Screen>
        {background}
        {sidebar}
        <S.Main>
          <S.StatusScreen>
            <S.StatusTitle>{t.adminRatings.states.error}</S.StatusTitle>
            <S.RefreshButton type="button" onClick={handleRefresh} whileTap={{ scale: 0.96 }}>
              <S.RefreshIcon />
              {t.adminRatings.refreshLabel}
            </S.RefreshButton>
          </S.StatusScreen>
        </S.Main>
      </S.Screen>
    );
  }

  return (
    <S.Screen>
      {background}
      {sidebar}

      <S.Main>
        <S.TopBar>
          <S.TitleGroup>
            <S.PageTitle>{t.adminRatings.pageTitle}</S.PageTitle>
            <S.PageSubtitle>{t.adminRatings.pageSubtitle}</S.PageSubtitle>
          </S.TitleGroup>
          <S.RefreshButton type="button" onClick={handleRefresh} $spinning={isRefreshing} whileTap={{ scale: 0.96 }}>
            <S.RefreshIcon />
            {t.adminRatings.refreshLabel}
          </S.RefreshButton>
        </S.TopBar>

        {isEmpty ? (
          <S.StatusScreen>
            <S.StatusTitle>{t.adminRatings.states.emptyTitle}</S.StatusTitle>
            <S.StatusSubtitle>{t.adminRatings.states.emptySubtitle}</S.StatusSubtitle>
          </S.StatusScreen>
        ) : (
          <S.Content initial="hidden" animate="visible" variants={staggerContainer}>
            {stats && (
              <S.StatsGrid variants={staggerItem}>
                <S.StatCard>
                  <S.StatLabel>{t.adminRatings.stats.averageLabel}</S.StatLabel>
                  <S.StatValueRow>
                    <S.StatValue>{stats.averageRating}</S.StatValue>
                    <S.StatStarIcon />
                  </S.StatValueRow>
                  {stats.trendLabel && stats.trendDirection && (
                    <S.StatTrend $direction={stats.trendDirection}>
                      {stats.trendDirection === 'up' ? <S.TrendUpIcon /> : <S.TrendDownIcon />}
                      {stats.trendLabel}
                    </S.StatTrend>
                  )}
                </S.StatCard>

                <S.StatCard>
                  <S.StatLabel>{t.adminRatings.stats.totalLabel}</S.StatLabel>
                  <S.StatValueRow>
                    <S.StatValuePlain>{stats.totalRatingsLabel}</S.StatValuePlain>
                  </S.StatValueRow>
                  <S.StatNote>{t.adminRatings.stats.totalNote}</S.StatNote>
                </S.StatCard>

                <S.StatCard $accent>
                  <S.StatLabel>{t.adminRatings.stats.positiveLabel}</S.StatLabel>
                  <S.StatValueRow>
                    <S.StatValue>{stats.positiveSharePct}%</S.StatValue>
                  </S.StatValueRow>
                  <S.StatTrack>
                    <S.StatFill $pct={stats.positiveSharePct} />
                  </S.StatTrack>
                  <S.StatNote>{t.adminRatings.stats.positiveNote}</S.StatNote>
                </S.StatCard>
              </S.StatsGrid>
            )}

            <S.FiltersBar>
              <S.SearchFieldWrapper>
                <S.SearchIcon />
                <S.SearchInput
                  type="text"
                  placeholder={t.adminRatings.search.placeholder}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </S.SearchFieldWrapper>

              {restaurantOptions.length > 1 && (
                <S.FilterControl>
                  <S.FilterSelect
                    aria-label={t.adminRatings.restaurantFilter.label}
                    value={restaurantFilter}
                    onChange={(event) => setRestaurantFilter(event.target.value)}
                  >
                    <option value={ALL_RESTAURANTS}>{t.adminRatings.restaurantFilter.all}</option>
                    {restaurantOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </S.FilterSelect>
                  <S.FilterIcon />
                </S.FilterControl>
              )}

              <S.FilterControl>
                <S.FilterSelect
                  aria-label={t.adminRatings.ratingFilter.label}
                  value={ratingFilter}
                  onChange={(event) => setRatingFilter(event.target.value as RatingFilterOption)}
                >
                  <option value={ALL_RATINGS}>{t.adminRatings.ratingFilter.all}</option>
                  <option value="5">{t.adminRatings.ratingFilter.five}</option>
                  <option value="4">{t.adminRatings.ratingFilter.four}</option>
                  <option value="3-">{t.adminRatings.ratingFilter.threeOrLess}</option>
                </S.FilterSelect>
                <S.FilterIcon />
              </S.FilterControl>

              <S.ClearFiltersButton type="button" onClick={handleClearFilters}>
                {t.adminRatings.clearFilters}
              </S.ClearFiltersButton>
            </S.FiltersBar>

            {hasNoResults ? (
              <S.EmptyMessage>{t.adminRatings.search.noResults}</S.EmptyMessage>
            ) : (
              <>
                {items.map((review) => (
                  <S.ReviewCard key={review.id} variants={staggerItem}>
                    <S.Avatar>{review.initials}</S.Avatar>
                    <S.ReviewBody>
                      <S.ReviewHeader>
                        <S.CustomerName>{review.customerName}</S.CustomerName>
                        <S.ReviewTime>{review.relativeTime}</S.ReviewTime>
                      </S.ReviewHeader>
                      <S.StarsRow>
                        {Array.from({ length: 5 }).map((_, index) =>
                          index < review.rating ? <S.StarFilled key={index} /> : <S.StarEmpty key={index} />,
                        )}
                      </S.StarsRow>
                      <S.CommentText>
                        {review.comment ? `"${review.comment}"` : t.adminDashboard.feed.noComment}
                      </S.CommentText>
                      <S.ReviewMeta>
                        <span>{t.adminRatings.restaurantLabel.replace('{restaurant}', review.restaurantName)}</span>
                        {review.beerMasterName && (
                          <span>{t.adminRatings.beerMasterLabel.replace('{name}', review.beerMasterName)}</span>
                        )}
                      </S.ReviewMeta>
                    </S.ReviewBody>
                  </S.ReviewCard>
                ))}

                {hasMore && (
                  <S.LoadMoreWrapper>
                    <S.LoadMoreButton type="button" onClick={handleLoadMore}>
                      {t.adminRatings.loadMore}
                      <S.FilterIcon />
                    </S.LoadMoreButton>
                  </S.LoadMoreWrapper>
                )}
              </>
            )}
          </S.Content>
        )}
      </S.Main>
    </S.Screen>
  );
};
