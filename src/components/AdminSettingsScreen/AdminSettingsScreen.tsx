import { AnimatePresence } from 'framer-motion';
import { FaMedal, FaUtensils } from 'react-icons/fa6';
import { staggerContainer, staggerItem, tabPanelVariants } from '../../animations/variants';
import backgroundImage from '../../assets/images/background.png';
import backgroundImageLaptop from '../../assets/images/background-laptop.png';
import { initialsFromName } from '../../utils/initialsFromName';
import { AdminSidebar } from '../AdminSidebar';
import { AutocompleteField } from '../AutocompleteField';
import { Modal } from '../Modal';
import { ScoringSettingsPanel } from '../ScoringSettingsPanel';
import { ScreenOverlay } from '../ScreenOverlay';
import { Skeleton } from '../Skeleton';
import { TextField } from '../TextField';
import { TABLET_BREAKPOINT } from '../../styles/breakpoints';
import * as S from './AdminSettingsScreen.styles';
import { useAdminSettingsScreen } from './AdminSettingsScreen.hooks';

const SKELETON_ROWS = 6;

export const AdminSettingsScreen = () => {
  const {
    t,
    activeTab,
    tabDirection,
    handleTabChange,

    restaurants,
    restaurantsStatus,
    restaurantSearchQuery,
    setRestaurantSearchQuery,
    filteredRestaurants,
    paginatedRestaurants,
    restaurantsCurrentPage,
    restaurantsPageCount,
    handleRestaurantsPrevPage,
    handleRestaurantsNextPage,

    restaurantForm,
    restaurantFormName,
    setRestaurantFormName,
    restaurantFormError,
    isSavingRestaurant,
    openAddRestaurant,
    openEditRestaurant,
    closeRestaurantForm,
    submitRestaurantForm,

    restaurantDeleteTarget,
    restaurantDeleteError,
    isDeletingRestaurant,
    openDeleteRestaurant,
    closeDeleteRestaurant,
    confirmDeleteRestaurant,

    selectedRestaurantId,
    setSelectedRestaurantId,
    allBeerMasters,
    filteredBeerMasters,
    beerMastersStatus,
    paginatedBeerMasters,
    beerMastersCurrentPage,
    beerMastersPageCount,
    handleBeerMastersPrevPage,
    handleBeerMastersNextPage,

    beerMasterForm,
    beerMasterFormName,
    setBeerMasterFormName,
    beerMasterFormRestaurantId,
    setBeerMasterFormRestaurantId,
    beerMasterFormError,
    beerMasterFormRestaurantError,
    isSavingBeerMaster,
    openAddBeerMaster,
    openEditBeerMaster,
    closeBeerMasterForm,
    submitBeerMasterForm,

    beerMasterDeleteTarget,
    beerMasterDeleteError,
    isDeletingBeerMaster,
    openDeleteBeerMaster,
    closeDeleteBeerMaster,
    confirmDeleteBeerMaster,

    beerMasterTransferTarget,
    transferTargetRestaurantId,
    setTransferTargetRestaurantId,
    transferRestaurantOptions,
    transferError,
    isTransferringBeerMaster,
    openTransferBeerMaster,
    closeTransferBeerMaster,
    confirmTransferBeerMaster,
  } = useAdminSettingsScreen();

  const copy = t.adminSettings;

  const sidebar = <AdminSidebar activeItem="settings" />;

  const background = (
    <S.Background>
      <picture>
        <source media={`(min-width: ${TABLET_BREAKPOINT})`} srcSet={backgroundImageLaptop} />
        <S.BackgroundImage src={backgroundImage} alt="" />
      </picture>
      <ScreenOverlay />
    </S.Background>
  );

  const isLoading = restaurantsStatus === 'loading' && !restaurants;
  const isError = restaurantsStatus === 'error';

  if (isLoading) {
    return (
      <S.Screen>
        {background}
        {sidebar}
        <S.Main>
          <S.TopBar>
            <S.TitleGroup>
              <S.PageTitle>{copy.pageTitle}</S.PageTitle>
              <S.PageSubtitle>{copy.pageSubtitle}</S.PageSubtitle>
            </S.TitleGroup>
          </S.TopBar>
          <S.Content initial="hidden" animate="visible" variants={staggerContainer}>
            <S.ItemList variants={staggerContainer}>
              {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
                <S.ItemCard key={index} variants={staggerItem}>
                  <S.ItemIdentity>
                    <Skeleton width="40px" height="40px" />
                    <Skeleton width="160px" height="16px" />
                  </S.ItemIdentity>
                  <Skeleton width="76px" height="34px" />
                </S.ItemCard>
              ))}
            </S.ItemList>
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
            <S.StatusTitle>{copy.states.error}</S.StatusTitle>
          </S.StatusScreen>
        </S.Main>
      </S.Screen>
    );
  }

  const restaurantOptions = (restaurants ?? []).map((restaurant) => ({
    value: restaurant.id,
    label: restaurant.name,
  }));

  return (
    <S.Screen>
      {background}
      {sidebar}

      <S.Main>
        <S.TopBar>
          <S.TitleGroup>
            <S.PageTitle>{copy.pageTitle}</S.PageTitle>
            <S.PageSubtitle>{copy.pageSubtitle}</S.PageSubtitle>
          </S.TitleGroup>
          <S.TabList>
            <S.TabButton type="button" $active={activeTab === 'restaurants'} onClick={() => handleTabChange('restaurants')}>
              {copy.tabs.restaurants}
            </S.TabButton>
            <S.TabButton type="button" $active={activeTab === 'beerMasters'} onClick={() => handleTabChange('beerMasters')}>
              {copy.tabs.beerMasters}
            </S.TabButton>
            <S.TabButton type="button" $active={activeTab === 'scoring'} onClick={() => handleTabChange('scoring')}>
              {copy.tabs.scoring}
            </S.TabButton>
          </S.TabList>
        </S.TopBar>

        <S.Content initial="hidden" animate="visible" variants={staggerContainer}>
          <AnimatePresence mode="wait" custom={tabDirection} initial={false}>
            <S.TabPanel
              key={activeTab}
              custom={tabDirection}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabPanelVariants}
            >
              {activeTab === 'restaurants' ? (
                <>
                  <S.SectionHeader>
                    {(restaurants ?? []).length > 0 ? (
                      <S.SearchFieldWrapper>
                        <S.SearchIcon />
                        <S.SearchInput
                          type="text"
                          placeholder={copy.restaurants.search.placeholder}
                          value={restaurantSearchQuery}
                          onChange={(event) => setRestaurantSearchQuery(event.target.value)}
                        />
                      </S.SearchFieldWrapper>
                    ) : (
                      <div />
                    )}
                    <S.AddButton type="button" onClick={openAddRestaurant} whileTap={{ scale: 0.96 }}>
                      <S.AddIcon />
                      {copy.restaurants.addButton}
                    </S.AddButton>
                  </S.SectionHeader>

                  {(restaurants ?? []).length === 0 ? (
                    <S.EmptyState>
                      <S.EmptyTitle>{copy.restaurants.emptyTitle}</S.EmptyTitle>
                      <S.EmptySubtitle>{copy.restaurants.emptySubtitle}</S.EmptySubtitle>
                    </S.EmptyState>
                  ) : filteredRestaurants.length === 0 ? (
                    <S.EmptyState>
                      <S.EmptySubtitle>
                        {copy.restaurants.search.noResults.replace('{query}', restaurantSearchQuery)}
                      </S.EmptySubtitle>
                    </S.EmptyState>
                  ) : (
                    <>
                      <S.ItemList variants={staggerContainer}>
                        {paginatedRestaurants.map((restaurant) => (
                          <S.ItemCard key={restaurant.id} variants={staggerItem}>
                            <S.ItemIdentity>
                              <S.ItemAvatar>{initialsFromName(restaurant.name)}</S.ItemAvatar>
                              <S.ItemName>{restaurant.name}</S.ItemName>
                            </S.ItemIdentity>
                            <S.ItemActions>
                              <S.EditButton
                                type="button"
                                onClick={() => openEditRestaurant(restaurant)}
                                aria-label={copy.restaurants.editAction}
                              >
                                <S.EditIcon />
                              </S.EditButton>
                              <S.DeleteButton
                                type="button"
                                onClick={() => openDeleteRestaurant(restaurant)}
                                aria-label={copy.restaurants.deleteAction}
                              >
                                <S.DeleteIcon />
                              </S.DeleteButton>
                            </S.ItemActions>
                          </S.ItemCard>
                        ))}
                      </S.ItemList>

                      {restaurantsPageCount > 1 && (
                        <S.Pagination>
                          <S.PaginationButton
                            type="button"
                            onClick={handleRestaurantsPrevPage}
                            disabled={restaurantsCurrentPage === 1}
                            aria-label={t.adminRestaurants.pagination.previous}
                          >
                            <S.PrevPageIcon />
                          </S.PaginationButton>
                          <S.PaginationLabel>
                            {t.adminRestaurants.pagination.indicator
                              .replace('{current}', String(restaurantsCurrentPage))
                              .replace('{total}', String(restaurantsPageCount))}
                          </S.PaginationLabel>
                          <S.PaginationButton
                            type="button"
                            onClick={handleRestaurantsNextPage}
                            disabled={restaurantsCurrentPage === restaurantsPageCount}
                            aria-label={t.adminRestaurants.pagination.next}
                          >
                            <S.NextPageIcon />
                          </S.PaginationButton>
                        </S.Pagination>
                      )}
                    </>
                  )}
                </>
              ) : activeTab === 'beerMasters' ? (
                <>
                  <S.SectionHeader>
                    <S.RestaurantPickerWrapper>
                      <AutocompleteField
                        icon={FaUtensils}
                        label={copy.beerMasters.restaurantPicker.label}
                        placeholder={copy.beerMasters.restaurantPicker.placeholder}
                        options={restaurantOptions}
                        value={selectedRestaurantId}
                        onChange={setSelectedRestaurantId}
                        noResultsText={copy.beerMasters.restaurantPicker.noResults}
                      />
                    </S.RestaurantPickerWrapper>
                    <S.AddButton type="button" onClick={openAddBeerMaster} whileTap={{ scale: 0.96 }}>
                      <S.AddIcon />
                      {copy.beerMasters.addButton}
                    </S.AddButton>
                  </S.SectionHeader>

                  {beerMastersStatus === 'loading' && !allBeerMasters ? (
                    <S.ItemList variants={staggerContainer}>
                      {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
                        <S.ItemCard key={index} variants={staggerItem}>
                          <S.ItemIdentity>
                            <Skeleton width="40px" height="40px" />
                            <Skeleton width="160px" height="16px" />
                          </S.ItemIdentity>
                          <Skeleton width="76px" height="34px" />
                        </S.ItemCard>
                      ))}
                    </S.ItemList>
                  ) : beerMastersStatus === 'error' ? (
                    <S.EmptyState>
                      <S.EmptySubtitle>{copy.states.error}</S.EmptySubtitle>
                    </S.EmptyState>
                  ) : filteredBeerMasters.length === 0 ? (
                    <S.EmptyState>
                      <S.EmptyTitle>
                        {selectedRestaurantId ? copy.beerMasters.noRestaurantResultsTitle : copy.beerMasters.emptyTitle}
                      </S.EmptyTitle>
                      <S.EmptySubtitle>
                        {selectedRestaurantId
                          ? copy.beerMasters.noRestaurantResultsSubtitle
                          : copy.beerMasters.emptySubtitle}
                      </S.EmptySubtitle>
                    </S.EmptyState>
                  ) : (
                    <>
                      <S.ItemList variants={staggerContainer}>
                        {paginatedBeerMasters.map((beerMaster) => (
                          <S.ItemCard key={beerMaster.id} variants={staggerItem}>
                            <S.ItemIdentity>
                              <S.ItemAvatar>{initialsFromName(beerMaster.name)}</S.ItemAvatar>
                              <S.NameBlock>
                                <S.ItemName>{beerMaster.name}</S.ItemName>
                                <S.RestaurantLabel>{beerMaster.restaurant_name}</S.RestaurantLabel>
                              </S.NameBlock>
                            </S.ItemIdentity>
                            <S.ItemActions>
                              <S.EditButton
                                type="button"
                                onClick={() => openEditBeerMaster(beerMaster)}
                                aria-label={copy.beerMasters.editAction}
                              >
                                <S.EditIcon />
                              </S.EditButton>
                              <S.TransferButton
                                type="button"
                                onClick={() => openTransferBeerMaster(beerMaster)}
                                aria-label={copy.beerMasters.transferAction}
                              >
                                <S.TransferIcon />
                              </S.TransferButton>
                              <S.DeleteButton
                                type="button"
                                onClick={() => openDeleteBeerMaster(beerMaster)}
                                aria-label={copy.beerMasters.deleteAction}
                              >
                                <S.DeleteIcon />
                              </S.DeleteButton>
                            </S.ItemActions>
                          </S.ItemCard>
                        ))}
                      </S.ItemList>

                      {beerMastersPageCount > 1 && (
                        <S.Pagination>
                          <S.PaginationButton
                            type="button"
                            onClick={handleBeerMastersPrevPage}
                            disabled={beerMastersCurrentPage === 1}
                            aria-label={t.adminRestaurants.pagination.previous}
                          >
                            <S.PrevPageIcon />
                          </S.PaginationButton>
                          <S.PaginationLabel>
                            {t.adminRestaurants.pagination.indicator
                              .replace('{current}', String(beerMastersCurrentPage))
                              .replace('{total}', String(beerMastersPageCount))}
                          </S.PaginationLabel>
                          <S.PaginationButton
                            type="button"
                            onClick={handleBeerMastersNextPage}
                            disabled={beerMastersCurrentPage === beerMastersPageCount}
                            aria-label={t.adminRestaurants.pagination.next}
                          >
                            <S.NextPageIcon />
                          </S.PaginationButton>
                        </S.Pagination>
                      )}
                    </>
                  )}
                </>
              ) : (
                <ScoringSettingsPanel />
              )}
            </S.TabPanel>
          </AnimatePresence>
        </S.Content>
      </S.Main>

      <AnimatePresence>
        {restaurantForm && (
          <Modal
            title={restaurantForm.mode === 'edit' ? copy.restaurants.form.editTitle : copy.restaurants.form.addTitle}
            onClose={closeRestaurantForm}
          >
            <S.Form
              onSubmit={(event) => {
                event.preventDefault();
                submitRestaurantForm();
              }}
            >
              <TextField
                icon={FaUtensils}
                label={copy.restaurants.form.nameLabel}
                placeholder={copy.restaurants.form.namePlaceholder}
                value={restaurantFormName}
                onChange={setRestaurantFormName}
                error={restaurantFormError}
              />
              <S.FormActions>
                <S.CancelButton type="button" onClick={closeRestaurantForm} disabled={isSavingRestaurant}>
                  {copy.restaurants.form.cancel}
                </S.CancelButton>
                <S.SaveButton type="submit" disabled={isSavingRestaurant}>
                  {isSavingRestaurant ? copy.restaurants.form.saving : copy.restaurants.form.save}
                </S.SaveButton>
              </S.FormActions>
            </S.Form>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {restaurantDeleteTarget && (
          <Modal title={copy.restaurants.deleteConfirm.title} onClose={closeDeleteRestaurant}>
            <S.ConfirmMessage>
              {copy.restaurants.deleteConfirm.message.replace('{name}', restaurantDeleteTarget.name)}
            </S.ConfirmMessage>
            {restaurantDeleteError && <S.ConfirmError>{restaurantDeleteError}</S.ConfirmError>}
            <S.FormActions>
              <S.CancelButton type="button" onClick={closeDeleteRestaurant} disabled={isDeletingRestaurant}>
                {copy.restaurants.deleteConfirm.cancel}
              </S.CancelButton>
              <S.DangerButton type="button" onClick={confirmDeleteRestaurant} disabled={isDeletingRestaurant}>
                {isDeletingRestaurant ? copy.restaurants.deleteConfirm.deleting : copy.restaurants.deleteConfirm.confirm}
              </S.DangerButton>
            </S.FormActions>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {beerMasterForm && (
          <Modal
            title={beerMasterForm.mode === 'edit' ? copy.beerMasters.form.editTitle : copy.beerMasters.form.addTitle}
            onClose={closeBeerMasterForm}
          >
            <S.Form
              onSubmit={(event) => {
                event.preventDefault();
                submitBeerMasterForm();
              }}
            >
              {beerMasterForm?.mode === 'add' && (
                <AutocompleteField
                  icon={FaUtensils}
                  label={copy.beerMasters.form.restaurantLabel}
                  placeholder={copy.beerMasters.form.restaurantPlaceholder}
                  options={restaurantOptions}
                  value={beerMasterFormRestaurantId}
                  onChange={setBeerMasterFormRestaurantId}
                  noResultsText={copy.beerMasters.form.restaurantNoResults}
                  error={beerMasterFormRestaurantError}
                />
              )}
              <TextField
                icon={FaMedal}
                label={copy.beerMasters.form.nameLabel}
                placeholder={copy.beerMasters.form.namePlaceholder}
                value={beerMasterFormName}
                onChange={setBeerMasterFormName}
                error={beerMasterFormError}
              />
              <S.FormActions>
                <S.CancelButton type="button" onClick={closeBeerMasterForm} disabled={isSavingBeerMaster}>
                  {copy.beerMasters.form.cancel}
                </S.CancelButton>
                <S.SaveButton type="submit" disabled={isSavingBeerMaster}>
                  {isSavingBeerMaster ? copy.beerMasters.form.saving : copy.beerMasters.form.save}
                </S.SaveButton>
              </S.FormActions>
            </S.Form>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {beerMasterDeleteTarget && (
          <Modal title={copy.beerMasters.deleteConfirm.title} onClose={closeDeleteBeerMaster}>
            <S.ConfirmMessage>
              {copy.beerMasters.deleteConfirm.message.replace('{name}', beerMasterDeleteTarget.name)}
            </S.ConfirmMessage>
            {beerMasterDeleteError && <S.ConfirmError>{beerMasterDeleteError}</S.ConfirmError>}
            <S.FormActions>
              <S.CancelButton type="button" onClick={closeDeleteBeerMaster} disabled={isDeletingBeerMaster}>
                {copy.beerMasters.deleteConfirm.cancel}
              </S.CancelButton>
              <S.DangerButton type="button" onClick={confirmDeleteBeerMaster} disabled={isDeletingBeerMaster}>
                {isDeletingBeerMaster ? copy.beerMasters.deleteConfirm.deleting : copy.beerMasters.deleteConfirm.confirm}
              </S.DangerButton>
            </S.FormActions>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {beerMasterTransferTarget && (
          <Modal title={copy.beerMasters.transfer.title} onClose={closeTransferBeerMaster}>
            <S.ConfirmMessage>
              {copy.beerMasters.transfer.message.replace('{name}', beerMasterTransferTarget.name)}
            </S.ConfirmMessage>
            <S.Form
              onSubmit={(event) => {
                event.preventDefault();
                confirmTransferBeerMaster();
              }}
            >
              <AutocompleteField
                icon={FaUtensils}
                label={copy.beerMasters.transfer.restaurantLabel}
                placeholder={copy.beerMasters.transfer.restaurantPlaceholder}
                options={transferRestaurantOptions}
                value={transferTargetRestaurantId}
                onChange={setTransferTargetRestaurantId}
                noResultsText={copy.beerMasters.transfer.noResults}
                error={transferError}
              />
              <S.FormActions>
                <S.CancelButton type="button" onClick={closeTransferBeerMaster} disabled={isTransferringBeerMaster}>
                  {copy.beerMasters.transfer.cancel}
                </S.CancelButton>
                <S.SaveButton type="submit" disabled={isTransferringBeerMaster}>
                  {isTransferringBeerMaster ? copy.beerMasters.transfer.transferring : copy.beerMasters.transfer.confirm}
                </S.SaveButton>
              </S.FormActions>
            </S.Form>
          </Modal>
        )}
      </AnimatePresence>
    </S.Screen>
  );
};
