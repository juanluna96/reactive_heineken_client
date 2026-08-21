import { FaFilter, FaLocationDot } from 'react-icons/fa6';
import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background.png';
import backgroundImageLaptop from '../../assets/images/background-laptop.png';
import { AdminSidebar } from '../AdminSidebar';
import { FilterDropdown } from '../FilterDropdown';
import { ScreenOverlay } from '../ScreenOverlay';
import { Skeleton } from '../Skeleton';
import { TABLET_BREAKPOINT } from '../../styles/breakpoints';
import * as S from './AdminBeerMastersScreen.styles';
import { ALL_RESTAURANTS, useAdminBeerMastersScreen } from './AdminBeerMastersScreen.hooks';

const SKELETON_ROWS = 6;

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
              <S.PageTitle>{t.adminBeerMasters.pageTitle}</S.PageTitle>
              <S.PageSubtitle>{t.adminBeerMasters.pageSubtitle}</S.PageSubtitle>
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
                  <Skeleton width="48px" height="48px" radius="9999px" />
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
            <FilterDropdown
              icon={FaLocationDot}
              label={t.adminBeerMasters.restaurantFilter.label}
              value={restaurantFilter}
              onChange={setRestaurantFilter}
              options={[
                { value: ALL_RESTAURANTS, label: t.adminBeerMasters.restaurantFilter.all },
                ...restaurantOptions.map((option) => ({ value: option.id, label: option.name })),
              ]}
            />
            <FilterDropdown
              icon={FaFilter}
              label={t.adminBeerMasters.sort.label}
              value={sortBy}
              onChange={(value) => setSortBy(value as typeof sortBy)}
              options={[
                { value: 'rating', label: t.adminBeerMasters.sort.rating },
                { value: 'popularity', label: t.adminBeerMasters.sort.popularity },
                { value: 'newest', label: t.adminBeerMasters.sort.newest },
              ]}
            />
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
          <S.Content initial="hidden" animate="visible" variants={staggerContainer}>
            <S.SearchFieldWrapper variants={staggerItem}>
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
                    variants={staggerItem}
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
