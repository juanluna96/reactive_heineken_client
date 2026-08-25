import { useEffect, useState } from 'react';
import {
  ApiError,
  createBeerMaster,
  createRestaurant,
  deleteBeerMaster,
  deleteRestaurant,
  fetchAllBeerMasters,
  fetchRestaurants,
  transferBeerMaster,
  updateBeerMaster,
  updateRestaurant,
} from '../../api';
import type { AdminBeerMasterDto, RestaurantDto } from '../../api';
import { useTranslation } from '../../i18n';
import type { AutocompleteFieldOption } from '../AutocompleteField';

export type AdminSettingsTab = 'restaurants' | 'beerMasters';
type FetchStatus = 'idle' | 'loading' | 'loaded' | 'error';

// Order backs the tab-switch animation's direction (see handleTabChange) —
// sliding toward whichever side the newly active tab sits on.
const TAB_ORDER: AdminSettingsTab[] = ['restaurants', 'beerMasters'];

// Both lists here can only grow over time (every restaurant/beer master ever
// added, no filtering) — paginate so a large roster doesn't render as one
// giant unbroken list. See AdminRestaurantsScreen for the same page-size.
const PAGE_SIZE = 25;

type RestaurantFormState = { mode: 'add' } | { mode: 'edit'; restaurant: RestaurantDto } | null;
type BeerMasterFormState = { mode: 'add' } | { mode: 'edit'; beerMaster: AdminBeerMasterDto } | null;

export const useAdminSettingsScreen = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<AdminSettingsTab>('restaurants');
  // 1 when the newly selected tab sits to the right in TAB_ORDER, -1 when it
  // sits to the left — drives which way S.TabPanel slides in/out.
  const [tabDirection, setTabDirection] = useState(0);

  const handleTabChange = (tab: AdminSettingsTab) => {
    if (tab === activeTab) return;
    setTabDirection(TAB_ORDER.indexOf(tab) > TAB_ORDER.indexOf(activeTab) ? 1 : -1);
    setActiveTab(tab);
  };

  // Shared across both tabs: the restaurant list backs tab 1's CRUD list
  // and tab 2's restaurant picker, so it's fetched once here.
  const [restaurants, setRestaurants] = useState<RestaurantDto[] | null>(null);
  const [restaurantsStatus, setRestaurantsStatus] = useState<FetchStatus>('idle');

  const loadRestaurants = async () => {
    setRestaurantsStatus('loading');
    try {
      const data = await fetchRestaurants();
      setRestaurants(data);
      setRestaurantsStatus('loaded');
    } catch {
      setRestaurantsStatus('error');
    }
  };

  useEffect(() => {
    loadRestaurants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [restaurantsPage, setRestaurantsPage] = useState(1);
  const [restaurantSearchQuery, setRestaurantSearchQueryState] = useState('');

  const setRestaurantSearchQuery = (query: string) => {
    setRestaurantSearchQueryState(query);
    setRestaurantsPage(1);
  };

  const filteredRestaurants = (restaurants ?? []).filter((restaurant) =>
    restaurant.name.toLowerCase().includes(restaurantSearchQuery.trim().toLowerCase()),
  );
  const restaurantsPageCount = Math.max(1, Math.ceil(filteredRestaurants.length / PAGE_SIZE));
  const restaurantsCurrentPage = Math.min(restaurantsPage, restaurantsPageCount);
  const paginatedRestaurants = filteredRestaurants.slice(
    (restaurantsCurrentPage - 1) * PAGE_SIZE,
    restaurantsCurrentPage * PAGE_SIZE,
  );
  const handleRestaurantsPrevPage = () => setRestaurantsPage((page) => Math.max(1, page - 1));
  const handleRestaurantsNextPage = () => setRestaurantsPage((page) => Math.min(restaurantsPageCount, page + 1));

  // --- Restaurant form (add/edit) ---
  const [restaurantForm, setRestaurantForm] = useState<RestaurantFormState>(null);
  const [restaurantFormName, setRestaurantFormName] = useState('');
  const [restaurantFormError, setRestaurantFormError] = useState<string | undefined>(undefined);
  const [isSavingRestaurant, setIsSavingRestaurant] = useState(false);

  const openAddRestaurant = () => {
    setRestaurantForm({ mode: 'add' });
    setRestaurantFormName('');
    setRestaurantFormError(undefined);
  };

  const openEditRestaurant = (restaurant: RestaurantDto) => {
    setRestaurantForm({ mode: 'edit', restaurant });
    setRestaurantFormName(restaurant.name);
    setRestaurantFormError(undefined);
  };

  const closeRestaurantForm = () => {
    if (isSavingRestaurant) return;
    setRestaurantForm(null);
  };

  const submitRestaurantForm = async () => {
    const name = restaurantFormName.trim();
    if (!name) {
      setRestaurantFormError(t.adminSettings.restaurants.errors.nameRequired);
      return;
    }

    setIsSavingRestaurant(true);
    setRestaurantFormError(undefined);
    try {
      if (restaurantForm?.mode === 'edit') {
        await updateRestaurant(restaurantForm.restaurant.id, { name });
      } else {
        await createRestaurant({ name });
      }
      await loadRestaurants();
      setRestaurantForm(null);
    } catch (error) {
      setRestaurantFormError(
        error instanceof ApiError && error.status === 409
          ? t.adminSettings.restaurants.errors.duplicate
          : t.adminSettings.restaurants.errors.generic,
      );
    } finally {
      setIsSavingRestaurant(false);
    }
  };

  // --- Restaurant delete confirmation ---
  const [restaurantDeleteTarget, setRestaurantDeleteTarget] = useState<RestaurantDto | null>(null);
  const [restaurantDeleteError, setRestaurantDeleteError] = useState<string | undefined>(undefined);
  const [isDeletingRestaurant, setIsDeletingRestaurant] = useState(false);

  const openDeleteRestaurant = (restaurant: RestaurantDto) => {
    setRestaurantDeleteTarget(restaurant);
    setRestaurantDeleteError(undefined);
  };

  const closeDeleteRestaurant = () => {
    if (isDeletingRestaurant) return;
    setRestaurantDeleteTarget(null);
  };

  const confirmDeleteRestaurant = async () => {
    if (!restaurantDeleteTarget) return;
    setIsDeletingRestaurant(true);
    setRestaurantDeleteError(undefined);
    try {
      await deleteRestaurant(restaurantDeleteTarget.id);
      // Deleting a restaurant cascade-deletes its Stars Servers too (see
      // routers/restaurants.py) — reload the roster so they drop out, and
      // clear the filter if it pointed at the now-gone restaurant.
      if (selectedRestaurantId === restaurantDeleteTarget.id) {
        setSelectedRestaurantId('');
      }
      await Promise.all([loadRestaurants(), loadAllBeerMasters()]);
      setRestaurantDeleteTarget(null);
    } catch {
      setRestaurantDeleteError(t.adminSettings.restaurants.errors.generic);
    } finally {
      setIsDeletingRestaurant(false);
    }
  };

  // --- Beer masters tab: every registered Stars Server across every
  // restaurant, shown right away — the restaurant picker below narrows this
  // down to one restaurant instead of gating the list behind a selection.
  const [allBeerMasters, setAllBeerMasters] = useState<AdminBeerMasterDto[] | null>(null);
  const [beerMastersStatus, setBeerMastersStatus] = useState<FetchStatus>('idle');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const [beerMastersPage, setBeerMastersPage] = useState(1);

  const loadAllBeerMasters = async () => {
    setBeerMastersStatus('loading');
    try {
      const data = await fetchAllBeerMasters();
      setAllBeerMasters(data);
      setBeerMastersStatus('loaded');
    } catch {
      setBeerMastersStatus('error');
    }
  };

  useEffect(() => {
    loadAllBeerMasters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setBeerMastersPage(1);
  }, [selectedRestaurantId]);

  const filteredBeerMasters = selectedRestaurantId
    ? (allBeerMasters ?? []).filter((beerMaster) => beerMaster.restaurant_id === selectedRestaurantId)
    : (allBeerMasters ?? []);
  const beerMastersPageCount = Math.max(1, Math.ceil(filteredBeerMasters.length / PAGE_SIZE));
  const beerMastersCurrentPage = Math.min(beerMastersPage, beerMastersPageCount);
  const paginatedBeerMasters = filteredBeerMasters.slice(
    (beerMastersCurrentPage - 1) * PAGE_SIZE,
    beerMastersCurrentPage * PAGE_SIZE,
  );
  const handleBeerMastersPrevPage = () => setBeerMastersPage((page) => Math.max(1, page - 1));
  const handleBeerMastersNextPage = () => setBeerMastersPage((page) => Math.min(beerMastersPageCount, page + 1));

  // --- Beer master form (add/edit) ---
  const [beerMasterForm, setBeerMasterForm] = useState<BeerMasterFormState>(null);
  const [beerMasterFormName, setBeerMasterFormName] = useState('');
  const [beerMasterFormError, setBeerMasterFormError] = useState<string | undefined>(undefined);
  const [isSavingBeerMaster, setIsSavingBeerMaster] = useState(false);

  const openAddBeerMaster = () => {
    setBeerMasterForm({ mode: 'add' });
    setBeerMasterFormName('');
    setBeerMasterFormError(undefined);
  };

  const openEditBeerMaster = (beerMaster: AdminBeerMasterDto) => {
    setBeerMasterForm({ mode: 'edit', beerMaster });
    setBeerMasterFormName(beerMaster.name);
    setBeerMasterFormError(undefined);
  };

  const closeBeerMasterForm = () => {
    if (isSavingBeerMaster) return;
    setBeerMasterForm(null);
  };

  const submitBeerMasterForm = async () => {
    // Adding targets whichever restaurant is picked in the filter; editing
    // always targets the row's own restaurant, regardless of the filter.
    const restaurantId = beerMasterForm?.mode === 'edit' ? beerMasterForm.beerMaster.restaurant_id : selectedRestaurantId;
    if (!restaurantId) return;
    const name = beerMasterFormName.trim();
    if (!name) {
      setBeerMasterFormError(t.adminSettings.beerMasters.errors.nameRequired);
      return;
    }

    setIsSavingBeerMaster(true);
    setBeerMasterFormError(undefined);
    try {
      if (beerMasterForm?.mode === 'edit') {
        await updateBeerMaster(restaurantId, beerMasterForm.beerMaster.id, { name });
      } else {
        await createBeerMaster(restaurantId, { name });
      }
      await loadAllBeerMasters();
      setBeerMasterForm(null);
    } catch (error) {
      setBeerMasterFormError(
        error instanceof ApiError && error.status === 409
          ? t.adminSettings.beerMasters.errors.duplicate
          : t.adminSettings.beerMasters.errors.generic,
      );
    } finally {
      setIsSavingBeerMaster(false);
    }
  };

  // --- Beer master delete confirmation ---
  const [beerMasterDeleteTarget, setBeerMasterDeleteTarget] = useState<AdminBeerMasterDto | null>(null);
  const [beerMasterDeleteError, setBeerMasterDeleteError] = useState<string | undefined>(undefined);
  const [isDeletingBeerMaster, setIsDeletingBeerMaster] = useState(false);

  const openDeleteBeerMaster = (beerMaster: AdminBeerMasterDto) => {
    setBeerMasterDeleteTarget(beerMaster);
    setBeerMasterDeleteError(undefined);
  };

  const closeDeleteBeerMaster = () => {
    if (isDeletingBeerMaster) return;
    setBeerMasterDeleteTarget(null);
  };

  const confirmDeleteBeerMaster = async () => {
    if (!beerMasterDeleteTarget) return;
    setIsDeletingBeerMaster(true);
    setBeerMasterDeleteError(undefined);
    try {
      await deleteBeerMaster(beerMasterDeleteTarget.restaurant_id, beerMasterDeleteTarget.id);
      await loadAllBeerMasters();
      setBeerMasterDeleteTarget(null);
    } catch {
      setBeerMasterDeleteError(t.adminSettings.beerMasters.errors.generic);
    } finally {
      setIsDeletingBeerMaster(false);
    }
  };

  // --- Beer master transfer (move to a different restaurant) ---
  const [beerMasterTransferTarget, setBeerMasterTransferTarget] = useState<AdminBeerMasterDto | null>(null);
  const [transferTargetRestaurantId, setTransferTargetRestaurantId] = useState('');
  const [transferError, setTransferError] = useState<string | undefined>(undefined);
  const [isTransferringBeerMaster, setIsTransferringBeerMaster] = useState(false);

  // Excludes the restaurant the beer master already belongs to — the API
  // rejects transferring to the current restaurant anyway.
  const transferRestaurantOptions: AutocompleteFieldOption[] = (restaurants ?? [])
    .filter((restaurant) => restaurant.id !== beerMasterTransferTarget?.restaurant_id)
    .map((restaurant) => ({ value: restaurant.id, label: restaurant.name }));

  const openTransferBeerMaster = (beerMaster: AdminBeerMasterDto) => {
    setBeerMasterTransferTarget(beerMaster);
    setTransferTargetRestaurantId('');
    setTransferError(undefined);
  };

  const closeTransferBeerMaster = () => {
    if (isTransferringBeerMaster) return;
    setBeerMasterTransferTarget(null);
  };

  const confirmTransferBeerMaster = async () => {
    if (!beerMasterTransferTarget) return;
    if (!transferTargetRestaurantId) {
      setTransferError(t.adminSettings.beerMasters.transfer.errors.restaurantRequired);
      return;
    }

    setIsTransferringBeerMaster(true);
    setTransferError(undefined);
    try {
      await transferBeerMaster(beerMasterTransferTarget.restaurant_id, beerMasterTransferTarget.id, transferTargetRestaurantId);
      await loadAllBeerMasters();
      setBeerMasterTransferTarget(null);
    } catch (error) {
      setTransferError(
        error instanceof ApiError && error.status === 409
          ? t.adminSettings.beerMasters.transfer.errors.duplicate
          : t.adminSettings.beerMasters.transfer.errors.generic,
      );
    } finally {
      setIsTransferringBeerMaster(false);
    }
  };

  return {
    t,
    activeTab,
    tabDirection,
    handleTabChange,

    restaurants,
    restaurantsStatus,
    handleRefreshRestaurants: loadRestaurants,
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

    beerMasterTransferTarget,
    transferTargetRestaurantId,
    setTransferTargetRestaurantId,
    transferRestaurantOptions,
    transferError,
    isTransferringBeerMaster,
    openTransferBeerMaster,
    closeTransferBeerMaster,
    confirmTransferBeerMaster,
  };
};
