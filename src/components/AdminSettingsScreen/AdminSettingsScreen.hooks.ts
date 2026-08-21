import { useEffect, useState } from 'react';
import {
  ApiError,
  createBeerMaster,
  createRestaurant,
  deleteBeerMaster,
  deleteRestaurant,
  fetchBeerMasters,
  fetchRestaurants,
  updateBeerMaster,
  updateRestaurant,
} from '../../api';
import type { BeerMasterDto, RestaurantDto } from '../../api';
import { useTranslation } from '../../i18n';

export type AdminSettingsTab = 'restaurants' | 'beerMasters';
type FetchStatus = 'idle' | 'loading' | 'loaded' | 'error';

// Both lists here can only grow over time (every restaurant/beer master ever
// added, no filtering) — paginate so a large roster doesn't render as one
// giant unbroken list. See AdminRestaurantsScreen for the same page-size.
const PAGE_SIZE = 25;

type RestaurantFormState = { mode: 'add' } | { mode: 'edit'; restaurant: RestaurantDto } | null;
type BeerMasterFormState = { mode: 'add' } | { mode: 'edit'; beerMaster: BeerMasterDto } | null;

export const useAdminSettingsScreen = () => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<AdminSettingsTab>('restaurants');

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
  const restaurantsPageCount = Math.max(1, Math.ceil((restaurants?.length ?? 0) / PAGE_SIZE));
  const restaurantsCurrentPage = Math.min(restaurantsPage, restaurantsPageCount);
  const paginatedRestaurants = (restaurants ?? []).slice(
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
      // The deleted restaurant may be the one currently picked in the beer
      // masters tab — drop that selection so it doesn't point at nothing.
      if (selectedRestaurantId === restaurantDeleteTarget.id) {
        setSelectedRestaurantId('');
        setBeerMasters(null);
      }
      await loadRestaurants();
      setRestaurantDeleteTarget(null);
    } catch {
      setRestaurantDeleteError(t.adminSettings.restaurants.errors.generic);
    } finally {
      setIsDeletingRestaurant(false);
    }
  };

  // --- Beer masters tab: scoped to a picked restaurant ---
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const [beerMasters, setBeerMasters] = useState<BeerMasterDto[] | null>(null);
  const [beerMastersStatus, setBeerMastersStatus] = useState<FetchStatus>('idle');
  const [beerMastersPage, setBeerMastersPage] = useState(1);

  const loadBeerMasters = async (restaurantId: string) => {
    setBeerMastersStatus('loading');
    try {
      const data = await fetchBeerMasters(restaurantId);
      setBeerMasters(data);
      setBeerMastersStatus('loaded');
    } catch {
      setBeerMastersStatus('error');
    }
  };

  useEffect(() => {
    setBeerMastersPage(1);
    if (!selectedRestaurantId) {
      setBeerMasters(null);
      setBeerMastersStatus('idle');
      return;
    }
    loadBeerMasters(selectedRestaurantId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRestaurantId]);

  const beerMastersPageCount = Math.max(1, Math.ceil((beerMasters?.length ?? 0) / PAGE_SIZE));
  const beerMastersCurrentPage = Math.min(beerMastersPage, beerMastersPageCount);
  const paginatedBeerMasters = (beerMasters ?? []).slice(
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

  const openEditBeerMaster = (beerMaster: BeerMasterDto) => {
    setBeerMasterForm({ mode: 'edit', beerMaster });
    setBeerMasterFormName(beerMaster.name);
    setBeerMasterFormError(undefined);
  };

  const closeBeerMasterForm = () => {
    if (isSavingBeerMaster) return;
    setBeerMasterForm(null);
  };

  const submitBeerMasterForm = async () => {
    if (!selectedRestaurantId) return;
    const name = beerMasterFormName.trim();
    if (!name) {
      setBeerMasterFormError(t.adminSettings.beerMasters.errors.nameRequired);
      return;
    }

    setIsSavingBeerMaster(true);
    setBeerMasterFormError(undefined);
    try {
      if (beerMasterForm?.mode === 'edit') {
        await updateBeerMaster(selectedRestaurantId, beerMasterForm.beerMaster.id, { name });
      } else {
        await createBeerMaster(selectedRestaurantId, { name });
      }
      await loadBeerMasters(selectedRestaurantId);
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
  const [beerMasterDeleteTarget, setBeerMasterDeleteTarget] = useState<BeerMasterDto | null>(null);
  const [beerMasterDeleteError, setBeerMasterDeleteError] = useState<string | undefined>(undefined);
  const [isDeletingBeerMaster, setIsDeletingBeerMaster] = useState(false);

  const openDeleteBeerMaster = (beerMaster: BeerMasterDto) => {
    setBeerMasterDeleteTarget(beerMaster);
    setBeerMasterDeleteError(undefined);
  };

  const closeDeleteBeerMaster = () => {
    if (isDeletingBeerMaster) return;
    setBeerMasterDeleteTarget(null);
  };

  const confirmDeleteBeerMaster = async () => {
    if (!beerMasterDeleteTarget || !selectedRestaurantId) return;
    setIsDeletingBeerMaster(true);
    setBeerMasterDeleteError(undefined);
    try {
      await deleteBeerMaster(selectedRestaurantId, beerMasterDeleteTarget.id);
      await loadBeerMasters(selectedRestaurantId);
      setBeerMasterDeleteTarget(null);
    } catch {
      setBeerMasterDeleteError(t.adminSettings.beerMasters.errors.generic);
    } finally {
      setIsDeletingBeerMaster(false);
    }
  };

  return {
    t,
    activeTab,
    setActiveTab,

    restaurants,
    restaurantsStatus,
    handleRefreshRestaurants: loadRestaurants,
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
    beerMasters,
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
  };
};
