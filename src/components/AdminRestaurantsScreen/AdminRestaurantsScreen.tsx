import { AnimatePresence } from 'framer-motion';
import { FaFilter } from 'react-icons/fa6';
import { staggerContainer, staggerItem } from '../../animations/variants';
import backgroundImage from '../../assets/images/background.png';
import backgroundImageLaptop from '../../assets/images/background-laptop.png';
import { AdminSidebar } from '../AdminSidebar';
import { FilterDropdown } from '../FilterDropdown';
import { Modal } from '../Modal';
import { ScoreBreakdown } from '../ScoreBreakdown';
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
    partialScoreWarning,
    canExpand,
    breakdownItem,
    openBreakdown,
    closeBreakdown,
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
            <FilterDropdown
              icon={FaFilter}
              label={t.adminRestaurants.sort.label}
              value={sortBy}
              onChange={(value) => setSortBy(value as typeof sortBy)}
              options={[
                { value: 'score', label: t.adminRestaurants.sort.score },
                { value: 'rating', label: t.adminRestaurants.sort.rating },
                { value: 'popularity', label: t.adminRestaurants.sort.popularity },
                { value: 'newest', label: t.adminRestaurants.sort.newest },
              ]}
            />
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
            <S.SearchRow variants={staggerItem}>
              <S.SearchFieldWrapper>
                <S.SearchIcon />
                <S.SearchInput
                  type="text"
                  placeholder={t.adminRestaurants.search.placeholder}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </S.SearchFieldWrapper>
              {partialScoreWarning && (
                <S.WarningCard role="status">
                  <S.WarningIcon />
                  <span>{partialScoreWarning}</span>
                </S.WarningCard>
              )}
            </S.SearchRow>

            {hasNoSearchResults ? (
              <S.EmptyMessage>{t.adminRestaurants.search.noResults.replace('{query}', searchQuery)}</S.EmptyMessage>
            ) : (
              <>
                {items.map((restaurant) => {
                  const expandable = canExpand && restaurant.staffLines.length > 0;
                  return (
                    <S.RankCard
                      key={restaurant.id}
                      ref={restaurant.isOwn ? ownCardRef : undefined}
                      $isOwn={restaurant.isOwn}
                      $clickable={expandable}
                      variants={staggerItem}
                      onClick={expandable ? () => openBreakdown(restaurant.id) : undefined}
                      role={expandable ? 'button' : undefined}
                      tabIndex={expandable ? 0 : undefined}
                      onKeyDown={
                        expandable
                          ? (event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                openBreakdown(restaurant.id);
                              }
                            }
                          : undefined
                      }
                    >
                      <S.RankIdentity>
                        <S.RankNumber>{String(restaurant.rank).padStart(2, '0')}</S.RankNumber>
                        <S.RestaurantAvatar>{restaurant.initials}</S.RestaurantAvatar>
                        <S.RestaurantName>{restaurant.name}</S.RestaurantName>
                        {restaurant.isOwn && <S.OwnBadge>{t.adminRestaurants.ownRestaurantBadge}</S.OwnBadge>}
                      </S.RankIdentity>

                      <S.RankMeta>
                        <S.ScoreBlock title={t.adminRestaurants.scoreBreakdownToggle}>
                          <S.ScoreValue $muted={!restaurant.hasScore || restaurant.isPartialScore}>
                            {restaurant.scoreLabel}
                          </S.ScoreValue>
                          <S.ScoreLabel>{restaurant.scoreCaption}</S.ScoreLabel>
                        </S.ScoreBlock>
                      </S.RankMeta>
                    </S.RankCard>
                  );
                })}

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

      <AnimatePresence>
        {breakdownItem && (
          <Modal title={t.scoreBreakdown.staffTitle} onClose={closeBreakdown}>
            <ScoreBreakdown
              variant="staff"
              subject={breakdownItem.name}
              lines={breakdownItem.staffLines}
              total={breakdownItem.scoreTotal}
              partialTotal={breakdownItem.partialTotal}
              isPartial={breakdownItem.isPartialScore}
              ratingWeightPct={breakdownItem.ratingWeightPct}
            />
          </Modal>
        )}
      </AnimatePresence>
    </S.Screen>
  );
};
