import { AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaMedal, FaUtensils } from 'react-icons/fa6';
import backgroundImage from '../../assets/images/background.png';
import backgroundImageLaptop from '../../assets/images/background-laptop.png';
import { initialsFromName } from '../../utils/initialsFromName';
import { AdminSidebar } from '../AdminSidebar';
import { Modal } from '../Modal';
import { ScreenOverlay } from '../ScreenOverlay';
import { SelectField } from '../SelectField';
import { TextField } from '../TextField';
import { TABLET_BREAKPOINT } from '../../styles/breakpoints';
import * as S from './AdminSettingsScreen.styles';
import { useAdminSettingsScreen } from './AdminSettingsScreen.hooks';

export const AdminSettingsScreen = () => {
  const {
    t,
    activeTab,
    setActiveTab,

    restaurants,
    restaurantsStatus,

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
    beerMasters,
    beerMastersStatus,

    beerMasterForm,
    beerMasterFormName,
    setBeerMasterFormName,
    beerMasterFormError,
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
          <S.StatusScreen>
            <S.StatusSubtitle>{copy.states.loading}</S.StatusSubtitle>
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
            <S.TabButton type="button" $active={activeTab === 'restaurants'} onClick={() => setActiveTab('restaurants')}>
              {copy.tabs.restaurants}
            </S.TabButton>
            <S.TabButton type="button" $active={activeTab === 'beerMasters'} onClick={() => setActiveTab('beerMasters')}>
              {copy.tabs.beerMasters}
            </S.TabButton>
          </S.TabList>
        </S.TopBar>

        <S.Content>
          {activeTab === 'restaurants' ? (
            <>
              <S.SectionHeader>
                <div />
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
              ) : (
                <S.ItemList>
                  {(restaurants ?? []).map((restaurant) => (
                    <S.ItemCard key={restaurant.id}>
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
              )}
            </>
          ) : (
            <>
              <S.SectionHeader>
                <S.RestaurantPickerWrapper>
                  <SelectField
                    icon={FaUtensils}
                    chevronIcon={FaChevronDown}
                    label={copy.beerMasters.restaurantPicker.label}
                    placeholder={copy.beerMasters.restaurantPicker.placeholder}
                    options={restaurantOptions}
                    value={selectedRestaurantId}
                    onChange={setSelectedRestaurantId}
                  />
                </S.RestaurantPickerWrapper>
                <S.AddButton
                  type="button"
                  onClick={openAddBeerMaster}
                  disabled={!selectedRestaurantId}
                  whileTap={selectedRestaurantId ? { scale: 0.96 } : undefined}
                >
                  <S.AddIcon />
                  {copy.beerMasters.addButton}
                </S.AddButton>
              </S.SectionHeader>

              {!selectedRestaurantId ? (
                <S.EmptyState>
                  <S.EmptyTitle>{copy.beerMasters.selectRestaurantTitle}</S.EmptyTitle>
                  <S.EmptySubtitle>{copy.beerMasters.selectRestaurantSubtitle}</S.EmptySubtitle>
                </S.EmptyState>
              ) : beerMastersStatus === 'loading' && !beerMasters ? (
                <S.EmptyState>
                  <S.EmptySubtitle>{copy.states.loading}</S.EmptySubtitle>
                </S.EmptyState>
              ) : beerMastersStatus === 'error' ? (
                <S.EmptyState>
                  <S.EmptySubtitle>{copy.states.error}</S.EmptySubtitle>
                </S.EmptyState>
              ) : (beerMasters ?? []).length === 0 ? (
                <S.EmptyState>
                  <S.EmptyTitle>{copy.beerMasters.emptyTitle}</S.EmptyTitle>
                  <S.EmptySubtitle>{copy.beerMasters.emptySubtitle}</S.EmptySubtitle>
                </S.EmptyState>
              ) : (
                <S.ItemList>
                  {(beerMasters ?? []).map((beerMaster) => (
                    <S.ItemCard key={beerMaster.id}>
                      <S.ItemIdentity>
                        <S.ItemAvatar>{initialsFromName(beerMaster.name)}</S.ItemAvatar>
                        <S.ItemName>{beerMaster.name}</S.ItemName>
                      </S.ItemIdentity>
                      <S.ItemActions>
                        <S.EditButton
                          type="button"
                          onClick={() => openEditBeerMaster(beerMaster)}
                          aria-label={copy.beerMasters.editAction}
                        >
                          <S.EditIcon />
                        </S.EditButton>
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
              )}
            </>
          )}
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
    </S.Screen>
  );
};
