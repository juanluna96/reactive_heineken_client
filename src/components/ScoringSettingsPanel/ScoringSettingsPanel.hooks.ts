import { useEffect, useMemo, useState } from 'react';
import {
  createScoreComponent,
  deleteScoreComponent,
  fetchScoringConfig,
  setRestaurantScoreInput,
  updateScoreComponent,
} from '../../api';
import type { ScoreComponentDto, ScoreComponentUpdatePayload, ScoringConfigDto } from '../../api';
import { useTranslation } from '../../i18n';

type FetchStatus = 'idle' | 'loading' | 'loaded' | 'error';

type AddFormState = {
  label: string;
  weight: string;
  isGrowthPct: boolean;
  ceiling: string;
  error?: string;
  saving: boolean;
} | null;

const RATING_KINDS = new Set(['rating_skills', 'rating_service', 'rating_experience']);

export const useScoringSettingsPanel = () => {
  const { t } = useTranslation();
  const copy = t.adminSettings.scoring;

  const [config, setConfig] = useState<ScoringConfigDto | null>(null);
  const [status, setStatus] = useState<FetchStatus>('idle');

  const load = async () => {
    setStatus('loading');
    try {
      setConfig(await fetchScoringConfig());
      setStatus('loaded');
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const components = useMemo(() => config?.components ?? [], [config]);
  const manualComponents = useMemo(() => components.filter((c) => c.kind === 'manual'), [components]);

  // Sum of the ENABLED weights, as a percentage — the compute layer normalises
  // over exactly this set, so this is what the owner is really tuning.
  const weightSumPct = useMemo(
    () => Math.round(components.filter((c) => c.enabled).reduce((sum, c) => sum + c.weight, 0) * 100),
    [components],
  );

  const patchComponentLocal = (id: string, patch: Partial<ScoreComponentDto>) => {
    setConfig((prev) =>
      prev ? { ...prev, components: prev.components.map((c) => (c.id === id ? { ...c, ...patch } : c)) } : prev,
    );
  };

  // Optimistic: update the row locally, fire the PUT, resync from server on failure.
  const saveComponent = async (id: string, payload: ScoreComponentUpdatePayload) => {
    patchComponentLocal(id, payload as Partial<ScoreComponentDto>);
    try {
      const updated = await updateScoreComponent(id, payload);
      patchComponentLocal(id, updated);
    } catch {
      load();
    }
  };

  const isRating = (c: ScoreComponentDto) => RATING_KINDS.has(c.kind);

  // --- add-component modal ---
  const [addForm, setAddForm] = useState<AddFormState>(null);
  const openAddForm = () =>
    setAddForm({ label: '', weight: '0.1', isGrowthPct: false, ceiling: '40', saving: false });
  const closeAddForm = () => setAddForm((f) => (f?.saving ? f : null));
  const patchAddForm = (patch: Partial<NonNullable<AddFormState>>) =>
    setAddForm((f) => (f ? { ...f, ...patch, error: undefined } : f));

  const submitAddForm = async () => {
    if (!addForm) return;
    const label = addForm.label.trim();
    const weight = Number(addForm.weight);
    const ceiling = Number(addForm.ceiling);
    if (!label) return patchAddForm({ error: copy.errors.labelRequired });
    if (!Number.isFinite(weight) || weight < 0 || weight > 1) return patchAddForm({ error: copy.errors.weightInvalid });
    if (addForm.isGrowthPct && (!Number.isFinite(ceiling) || ceiling <= 0))
      return patchAddForm({ error: copy.errors.ceilingRequired });

    setAddForm((f) => (f ? { ...f, saving: true, error: undefined } : f));
    try {
      await createScoreComponent({
        label,
        weight,
        is_growth_pct: addForm.isGrowthPct,
        ceiling_pct: addForm.isGrowthPct ? ceiling : null,
      });
      await load();
      setAddForm(null);
    } catch {
      setAddForm((f) => (f ? { ...f, saving: false, error: copy.errors.generic } : f));
    }
  };

  // --- delete-component confirm ---
  const [deleteTarget, setDeleteTarget] = useState<ScoreComponentDto | null>(null);
  const [deleteError, setDeleteError] = useState<string | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState(false);
  const openDelete = (component: ScoreComponentDto) => {
    setDeleteTarget(component);
    setDeleteError(undefined);
  };
  const closeDelete = () => {
    if (!isDeleting) setDeleteTarget(null);
  };
  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setDeleteError(undefined);
    try {
      await deleteScoreComponent(deleteTarget.id);
      await load();
      setDeleteTarget(null);
    } catch {
      setDeleteError(copy.errors.generic);
    } finally {
      setIsDeleting(false);
    }
  };

  // --- per-restaurant manual inputs ---
  const inputValue = (restaurantId: string, componentId: string): number | null => {
    const row = config?.restaurant_inputs.find(
      (i) => i.restaurant_id === restaurantId && i.component_id === componentId,
    );
    return row ? row.value : null;
  };

  const saveInput = async (restaurantId: string, componentId: string, raw: string) => {
    const value = Number(raw);
    if (raw.trim() === '' || !Number.isFinite(value)) return;
    setConfig((prev) => {
      if (!prev) return prev;
      const others = prev.restaurant_inputs.filter(
        (i) => !(i.restaurant_id === restaurantId && i.component_id === componentId),
      );
      return { ...prev, restaurant_inputs: [...others, { restaurant_id: restaurantId, component_id: componentId, value }] };
    });
    try {
      await setRestaurantScoreInput({ restaurant_id: restaurantId, component_id: componentId, value });
    } catch {
      load();
    }
  };

  return {
    copy,
    status,
    isLoading: status === 'loading' && !config,
    isError: status === 'error',
    components,
    manualComponents,
    restaurants: config?.restaurants ?? [],
    weightSumPct,
    isRating,
    saveComponent,
    openDelete,

    addForm,
    openAddForm,
    closeAddForm,
    patchAddForm,
    submitAddForm,

    deleteTarget,
    deleteError,
    isDeleting,
    closeDelete,
    confirmDelete,

    inputValue,
    saveInput,
  };
};
