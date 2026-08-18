import backgroundImage from '../../assets/images/background.png';
import { AdminSidebar } from '../AdminSidebar';
import { ScreenOverlay } from '../ScreenOverlay';
import * as S from './AdminBeerMastersScreen.styles';
import { ALL_RESTAURANTS, useAdminBeerMastersScreen } from './AdminBeerMastersScreen.hooks';

export const AdminBeerMastersScreen = () => {
  const {
    t,
    isLoading,
    isRefreshing,
    isError,
    isEmpty,
    hasNoResults,
    items,
    ownCardRef,
    sortBy,
    setSortBy,
    restaurantFilter,
    setRestaurantFilter,
    restaurantOptions,
    selectedRestaurantName,
    searchQuery,
    setSearchQuery,
    currentPage,
    pageCount,
    handlePrevPage,
    handleNextPage,
    handleRefresh,
  } = useAdminBeerMastersScreen();

  const sidebar = <AdminSidebar activeItem="beerMasters" />;

  const background = (
    <S.Background>
      <S.BackgroundImage src={backgroundImage} alt="" />
      <ScreenOverlay />
    </S.Background>
  );

  if (isLoading) {
    return (
      <S.Screen>
        {background}
        {sidebar}
        <S.Main>
          <S.StatusScreen>
            <S.StatusSubtitle>{t.adminBeerMasters.states.loading}</S.StatusSubtitle>
          </S.StatusScreen>
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
            <S.StatusTitle>{t.adminBeerMasters.states.error}</S.StatusTitle>
            <S.RefreshButton type="button" onClick={handleRefresh} whileTap={{ scale: 0.96 }}>
              <S.RefreshIcon />
              {t.adminBeerMasters.refreshLabel}
            </S.RefreshButton>
          </S.StatusScreen>
        </S.Main>
      </S.Screen>
    );
  }

  const emptyResultsMessage = searchQuery
    ? t.adminBeerMasters.search.noResults.replace('{query}', searchQuery)
    : t.adminBeerMasters.restaurantFilter.empty.replace('{restaurant}', selectedRestaurantName ?? '');

  return (
    <S.Screen>
      {background}
      {sidebar}

      <S.Main>
        <S.TopBar>
          <S.TitleGroup>
            <S.PageTitle>{t.adminBeerMasters.pageTitle}</S.PageTitle>
            <S.PageSubtitle>{t.adminBeerMasters.pageSubtitle}</S.PageSubtitle>
          </S.TitleGroup>
          <S.TopBarActions>
            <S.RestaurantFilterControl>
              <S.RestaurantFilterIcon />
              <S.RestaurantFilterSelect
                aria-label={t.adminBeerMasters.restaurantFilter.label}
                value={restaurantFilter}
                onChange={(event) => setRestaurantFilter(event.target.value)}
              >
                <option value={ALL_RESTAURANTS}>{t.adminBeerMasters.restaurantFilter.all}</option>
                {restaurantOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </S.RestaurantFilterSelect>
            </S.RestaurantFilterControl>
            <S.SortControl>
              <S.SortIcon />
              <S.SortSelect
                aria-label={t.adminBeerMasters.sort.label}
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as typeof sortBy)}
              >
                <option value="rating">{t.adminBeerMasters.sort.rating}</option>
                <option value="popularity">{t.adminBeerMasters.sort.popularity}</option>
                <option value="newest">{t.adminBeerMasters.sort.newest}</option>
              </S.SortSelect>
            </S.SortControl>
            <S.RefreshButton type="button" onClick={handleRefresh} $spinning={isRefreshing} whileTap={{ scale: 0.96 }}>
              <S.RefreshIcon />
              {t.adminBeerMasters.refreshLabel}
            </S.RefreshButton>
          </S.TopBarActions>
        </S.TopBar>

        {isEmpty ? (
          <S.StatusScreen>
            <S.StatusTitle>{t.adminBeerMasters.states.emptyTitle}</S.StatusTitle>
            <S.StatusSubtitle>{t.adminBeerMasters.states.emptySubtitle}</S.StatusSubtitle>
          </S.StatusScreen>
        ) : (
          <S.Content>
            <S.SearchFieldWrapper>
              <S.SearchIcon />
              <S.SearchInput
                type="text"
                placeholder={t.adminBeerMasters.search.placeholder}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </S.SearchFieldWrapper>

            {hasNoResults ? (
              <S.EmptyMessage>{emptyResultsMessage}</S.EmptyMessage>
            ) : (
              <>
                {items.map((beerMaster) => (
                  <S.RankCard
                    key={beerMaster.key}
                    ref={beerMaster.isOwn ? ownCardRef : undefined}
                    $isOwn={beerMaster.isOwn}
                  >
                    <S.RankIdentity>
                      <S.RankNumber>{String(beerMaster.rank).padStart(2, '0')}</S.RankNumber>
                      <S.Avatar>{beerMaster.initials}</S.Avatar>
                      <S.NameBlock>
                        <S.BeerMasterName>{beerMaster.name}</S.BeerMasterName>
                        <S.RestaurantLabel>{beerMaster.restaurantName}</S.RestaurantLabel>
                      </S.NameBlock>
                      {beerMaster.isOwn && <S.OwnBadge>{t.adminBeerMasters.ownBadge}</S.OwnBadge>}
                    </S.RankIdentity>

                    <S.RankMeta>
                      {beerMaster.hasRatings ? (
                        <S.RatingBlock>
                          <S.RatingRow>
                            <S.StarIcon />
                            <S.RatingValue>{beerMaster.averageRating}</S.RatingValue>
                          </S.RatingRow>
                          <S.RatingTrack>
                            <S.RatingFill $pct={beerMaster.ratingPct} />
                          </S.RatingTrack>
                          <S.ReviewsLabel>{beerMaster.ratingsCountLabel}</S.ReviewsLabel>
                        </S.RatingBlock>
                      ) : (
                        <S.NoRatingsBadge>{t.adminBeerMasters.noRatings}</S.NoRatingsBadge>
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
                      aria-label={t.adminBeerMasters.pagination.previous}
                    >
                      <S.PrevPageIcon />
                    </S.PaginationButton>
                    <S.PaginationLabel>
                      {t.adminBeerMasters.pagination.indicator
                        .replace('{current}', String(currentPage))
                        .replace('{total}', String(pageCount))}
                    </S.PaginationLabel>
                    <S.PaginationButton
                      type="button"
                      onClick={handleNextPage}
                      disabled={currentPage === pageCount}
                      aria-label={t.adminBeerMasters.pagination.next}
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
