import { useEffect, useMemo, useState } from 'react';
import {
  createScoreComponent,
  deleteScoreComponent,
  fetchScoringConfig,
  setRestaurantScoreInput,
  updateScoreComponent,
} from '../../api';
import type { ScoreComponentDto, ScoreComponentUpdatePayload, ScoringConfigDto } from '../../api';
import { useAdminStore } from '../../admin';
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
  // Any scoring-config edit changes every score and the "≈ X%" figure, so
  // drop the cached rankings — they refetch next time those screens open.
  const invalidateScoreData = useAdminStore((s) => s.invalidateScoreData);

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

  // Weight inputs are edited as raw strings so the "Suma de pesos" badge can
  // update on every keystroke; a change only persists on blur, and only when
  // the enabled weights add up to exactly 100% (see handleWeightBlur).
  const [weightDrafts, setWeightDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    // Seed a draft for each component, keeping any in-progress edit.
    setWeightDrafts((prev) => {
      const next: Record<string, string> = {};
      for (const c of config?.components ?? []) {
        next[c.id] = c.id in prev ? prev[c.id] : String(c.weight);
      }
      return next;
    });
  }, [config]);

  const draftWeight = (c: ScoreComponentDto): number => {
    const raw = weightDrafts[c.id];
    if (raw === undefined) return c.weight;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const weightValue = (id: string): string => {
    if (weightDrafts[id] !== undefined) return weightDrafts[id];
    const component = components.find((c) => c.id === id);
    return component ? String(component.weight) : '';
  };

  // Live sum of the ENABLED weights, as a percentage — recomputed on every
  // keystroke from the drafts. The compute layer normalises over exactly this
  // set, so this is what the owner is really tuning.
  const weightSumPct = useMemo(
    () => Math.round(components.filter((c) => c.enabled).reduce((sum, c) => sum + draftWeight(c), 0) * 100),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [components, weightDrafts],
  );
  const weightsBalanced = weightSumPct === 100;

  const handleWeightChange = (id: string, raw: string) => {
    setWeightDrafts((prev) => ({ ...prev, [id]: raw }));
  };

  const handleWeightBlur = async (id: string) => {
    const component = components.find((c) => c.id === id);
    if (!component) return;
    const value = Number(weightDrafts[id]);

    // Invalid entry → snap the field back to the saved value.
    if (!Number.isFinite(value) || value < 0 || value > 1) {
      setWeightDrafts((prev) => ({ ...prev, [id]: String(component.weight) }));
      return;
    }
    setWeightDrafts((prev) => ({ ...prev, [id]: String(value) }));

    // Only persist once the enabled weights add up to exactly 100%.
    const enabledSum = components
      .filter((c) => c.enabled)
      .reduce((sum, c) => sum + (c.id === id ? value : draftWeight(c)), 0);
    if (Math.round(enabledSum * 100) !== 100) return;

    // Balanced: persist every component whose draft weight moved.
    const changed = components.filter((c) => {
      const w = c.id === id ? value : draftWeight(c);
      return Math.abs(w - c.weight) > 1e-9;
    });
    for (const c of changed) {
      await saveComponent(c.id, { weight: c.id === id ? value : draftWeight(c) });
    }
  };

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
    } finally {
      invalidateScoreData();
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
      invalidateScoreData();
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
      invalidateScoreData();
      setDeleteTarget(null);
    } catch {
      setDeleteError(copy.errors.generic);
    } finally {
      setIsDeleting(false);
    }
  };

  // --- per-restaurant manual inputs ---
  const findInput = (restaurantId: string, componentId: string) =>
    config?.restaurant_inputs.find(
      (i) => i.restaurant_id === restaurantId && i.component_id === componentId,
    ) ?? null;

  // Non-growth manual components: a single raw 0–100 value.
  const inputValue = (restaurantId: string, componentId: string): number | null =>
    findInput(restaurantId, componentId)?.value ?? null;

  // Growth components: the owner enters an initial + final sales figure and the
  // server derives the growth % (see app/scoring.py).
  const growthInput = (
    restaurantId: string,
    componentId: string,
  ): { initial: number | null; final: number | null } => {
    const row = findInput(restaurantId, componentId);
    return { initial: row?.initial_value ?? null, final: row?.final_value ?? null };
  };

  const patchInputLocal = (
    restaurantId: string,
    componentId: string,
    patch: Partial<Pick<ScoringConfigDto['restaurant_inputs'][number], 'value' | 'initial_value' | 'final_value'>>,
  ) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const existing = prev.restaurant_inputs.find(
        (i) => i.restaurant_id === restaurantId && i.component_id === componentId,
      );
      const others = prev.restaurant_inputs.filter((i) => i !== existing);
      const next = {
        restaurant_id: restaurantId,
        component_id: componentId,
        value: existing?.value ?? 0,
        initial_value: existing?.initial_value ?? null,
        final_value: existing?.final_value ?? null,
        ...patch,
      };
      return { ...prev, restaurant_inputs: [...others, next] };
    });
  };

  const saveInput = async (restaurantId: string, componentId: string, raw: string) => {
    const value = Number(raw);
    if (raw.trim() === '' || !Number.isFinite(value)) return;
    patchInputLocal(restaurantId, componentId, { value });
    try {
      await setRestaurantScoreInput({ restaurant_id: restaurantId, component_id: componentId, value });
    } catch {
      load();
    } finally {
      invalidateScoreData();
    }
  };

  const saveGrowthInput = async (
    restaurantId: string,
    componentId: string,
    field: 'initial' | 'final',
    raw: string,
  ) => {
    const current = growthInput(restaurantId, componentId);
    const parsed = raw.trim() === '' ? null : Number(raw);
    if (parsed !== null && !Number.isFinite(parsed)) return;
    const initial = field === 'initial' ? parsed : current.initial;
    const finalValue = field === 'final' ? parsed : current.final;
    patchInputLocal(restaurantId, componentId, { initial_value: initial, final_value: finalValue });
    try {
      await setRestaurantScoreInput({
        restaurant_id: restaurantId,
        component_id: componentId,
        initial_value: initial,
        final_value: finalValue,
      });
    } catch {
      load();
    } finally {
      invalidateScoreData();
    }
  };

  // The growth % a completed initial/final pair works out to — shown read-only
  // next to the inputs so the owner sees what feeds the score.
  const growthPct = (restaurantId: string, componentId: string): number | null => {
    const { initial, final } = growthInput(restaurantId, componentId);
    if (initial == null || initial === 0 || final == null) return null;
    return Math.round(((final - initial) / initial) * 1000) / 10;
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
    weightsBalanced,
    weightValue,
    handleWeightChange,
    handleWeightBlur,
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
    growthInput,
    saveGrowthInput,
    growthPct,
  };
};
