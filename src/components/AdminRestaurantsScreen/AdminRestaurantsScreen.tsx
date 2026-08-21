import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background.png';
import backgroundImageLaptop from '../../assets/images/background-laptop.png';
import { AdminSidebar } from '../AdminSidebar';
import { ScreenOverlay } from '../ScreenOverlay';
import { Skeleton } from '../Skeleton';
import { TABLET_BREAKPOINT } from '../../styles/breakpoints';
import * as S from './AdminRestaurantsScreen.styles';
import { useAdminRestaurantsScreen } from './AdminRestaurantsScreen.hooks';

const SKELETON_ROWS = 6;

export const AdminRestaurantsScreen = () => {
  const {
    t,
    isLoading,
    isRefreshing,
    isError,
    isEmpty,
    hasNoSearchResults,
    items,
    ownCardRef,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    currentPage,
    pageCount,
    handlePrevPage,
    handleNextPage,
    handleRefresh,
  } = useAdminRestaurantsScreen();

  const sidebar = <AdminSidebar activeItem="restaurants" />;

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
              <S.PageTitle>{t.adminRestaurants.pageTitle}</S.PageTitle>
              <S.PageSubtitle>{t.adminRestaurants.pageSubtitle}</S.PageSubtitle>
            </S.TitleGroup>
          </S.TopBar>
          <S.Content initial="hidden" animate="visible" variants={staggerContainer}>
            <S.SearchFieldWrapper variants={staggerItem}>
              <Skeleton width="100%" height="44px" />
            </S.SearchFieldWrapper>
            {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
              <S.RankCard key={index} variants={staggerItem}>
                <S.RankIdentity>
                  <Skeleton width="28px" height="24px" />
                  <Skeleton width="48px" height="48px" />
                  <Skeleton width="160px" height="16px" />
                </S.RankIdentity>
                <Skeleton width="72px" height="40px" />
              </S.RankCard>
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
            <S.StatusTitle>{t.adminRestaurants.states.error}</S.StatusTitle>
            <S.RefreshButton type="button" onClick={handleRefresh} whileTap={{ scale: 0.96 }}>
              <S.RefreshIcon />
              {t.adminRestaurants.refreshLabel}
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
            <S.PageTitle>{t.adminRestaurants.pageTitle}</S.PageTitle>
            <S.PageSubtitle>{t.adminRestaurants.pageSubtitle}</S.PageSubtitle>
          </S.TitleGroup>
          <S.TopBarActions>
            <S.SortControl>
              <S.SortIcon />
              <S.SortSelect
                aria-label={t.adminRestaurants.sort.label}
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
              >
                <option value="rating">{t.adminRestaurants.sort.rating}</option>
                <option value="popularity">{t.adminRestaurants.sort.popularity}</option>
                <option value="newest">{t.adminRestaurants.sort.newest}</option>
              </S.SortSelect>
            </S.SortControl>
            <S.RefreshButton type="button" onClick={handleRefresh} $spinning={isRefreshing} whileTap={{ scale: 0.96 }}>
              <S.RefreshIcon />
              {t.adminRestaurants.refreshLabel}
            </S.RefreshButton>
          </S.TopBarActions>
        </S.TopBar>

        {isEmpty ? (
          <S.StatusScreen>
            <S.StatusTitle>{t.adminRestaurants.states.emptyTitle}</S.StatusTitle>
            <S.StatusSubtitle>{t.adminRestaurants.states.emptySubtitle}</S.StatusSubtitle>
          </S.StatusScreen>
        ) : (
          <S.Content initial="hidden" animate="visible" variants={staggerContainer}>
            <S.SearchFieldWrapper variants={staggerItem}>
              <S.SearchIcon />
              <S.SearchInput
                type="text"
                placeholder={t.adminRestaurants.search.placeholder}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </S.SearchFieldWrapper>

            {hasNoSearchResults ? (
              <S.EmptyMessage>{t.adminRestaurants.search.noResults.replace('{query}', searchQuery)}</S.EmptyMessage>
            ) : (
              <>
                {items.map((restaurant) => (
                  <S.RankCard
                    key={restaurant.id}
                    ref={restaurant.isOwn ? ownCardRef : undefined}
                    $isOwn={restaurant.isOwn}
                    variants={staggerItem}
                  >
                    <S.RankIdentity>
                      <S.RankNumber>{String(restaurant.rank).padStart(2, '0')}</S.RankNumber>
                      <S.RestaurantAvatar>{restaurant.initials}</S.RestaurantAvatar>
                      <S.RestaurantName>{restaurant.name}</S.RestaurantName>
                      {restaurant.isOwn && <S.OwnBadge>{t.adminRestaurants.ownRestaurantBadge}</S.OwnBadge>}
                    </S.RankIdentity>

                    <S.RankMeta>
                      {restaurant.hasRatings ? (
                        <S.RatingBlock>
                          <S.RatingRow>
                            <S.StarIcon />
                            <S.RatingValue>{restaurant.averageRating}</S.RatingValue>
                          </S.RatingRow>
                          <S.ReviewsLabel>{restaurant.ratingsCountLabel}</S.ReviewsLabel>
                        </S.RatingBlock>
                      ) : (
                        <S.NoRatingsBadge>{t.adminRestaurants.noRatings}</S.NoRatingsBadge>
                      )}

                      {restaurant.beerMasters.length > 0 && (
                        <S.BeerMastersDetails>
                          <S.BeerMastersSummary>
                            {restaurant.beerMastersToggleLabel}
                            <S.ChevronIcon />
                          </S.BeerMastersSummary>
                          <S.BeerMastersList>
                            {restaurant.beerMasters.map((master) => (
                              <S.BeerMasterRow key={master.name}>
                                <S.BeerMasterName>{master.name}</S.BeerMasterName>
                                <S.BeerMasterScore>{master.averageRating}</S.BeerMasterScore>
                              </S.BeerMasterRow>
                            ))}
                          </S.BeerMastersList>
                        </S.BeerMastersDetails>
                      )}
                    </S.RankMeta>
                  </S.RankCard>
                ))}

                {pageCount > 1 && (
                  <S.Pagination>
                    <S.PaginationButton
                      type="button"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      aria-label={t.adminRestaurants.pagination.previous}
                    >
                      <S.PrevPageIcon />
                    </S.PaginationButton>
                    <S.PaginationLabel>
                      {t.adminRestaurants.pagination.indicator
                        .replace('{current}', String(currentPage))
                        .replace('{total}', String(pageCount))}
                    </S.PaginationLabel>
                    <S.PaginationButton
                      type="button"
                      onClick={handleNextPage}
                      disabled={currentPage === pageCount}
                      aria-label={t.adminRestaurants.pagination.next}
                    >
                      <S.NextPageIcon />
                    </S.PaginationButton>
                  </S.Pagination>
                )}
              </>
            )}
          </S.Content>
        )}
      </S.Main>
    </S.Screen>
  );
};
