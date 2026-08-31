import { AnimatePresence } from 'framer-motion';
import { Modal } from '../Modal';
import * as S from './ScoringSettingsPanel.styles';
import { useScoringSettingsPanel } from './ScoringSettingsPanel.hooks';

export const ScoringSettingsPanel = () => {
  const {
    copy,
    isLoading,
    isError,
    components,
    manualComponents,
    restaurants,
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
  } = useScoringSettingsPanel();

  if (isLoading) return <S.StatusText>{copy.title}…</S.StatusText>;
  if (isError) return <S.StatusText>{copy.errors.generic}</S.StatusText>;

  return (
    <S.Panel>
      <S.Section>
        <S.SectionHeader>
          <S.SectionTitle>{copy.componentsTitle}</S.SectionTitle>
          <S.WeightSum $ok={weightSumPct === 100}>
            {copy.weightSum.replace('{sum}', String(weightSumPct))}
          </S.WeightSum>
        </S.SectionHeader>
        <S.SectionSubtitle>{copy.componentsSubtitle}</S.SectionSubtitle>
        <S.Hint>{copy.weightSumHint}</S.Hint>

        <S.ComponentList>
          {components.map((component) => {
            const manual = component.kind === 'manual';
            return (
              <S.ComponentRow key={component.id} $disabled={!component.enabled}>
                <S.ComponentName>
                  <S.KindBadge $manual={manual}>{manual ? copy.manualBadge : copy.autoBadge}</S.KindBadge>
                  {manual ? (
                    <S.TextInput
                      defaultValue={component.label}
                      onBlur={(event) => {
                        const label = event.target.value.trim();
                        if (label && label !== component.label) saveComponent(component.id, { label });
                      }}
                    />
                  ) : (
                    <S.AutoLabel>{component.label}</S.AutoLabel>
                  )}
                </S.ComponentName>

                <S.Field>
                  {copy.weightLabel}
                  <S.NumberInput
                    type="number"
                    min={0}
                    max={1}
                    step={0.05}
                    defaultValue={component.weight}
                    onBlur={(event) => {
                      const weight = Number(event.target.value);
                      if (Number.isFinite(weight) && weight >= 0 && weight <= 1 && weight !== component.weight) {
                        saveComponent(component.id, { weight });
                      }
                    }}
                  />
                </S.Field>

                {isRating(component) && (
                  <S.Field>
                    {copy.kLabel}
                    <S.NumberInput
                      type="number"
                      min={0}
                      step={1}
                      defaultValue={component.confidence_k ?? 20}
                      onBlur={(event) => {
                        const confidence_k = Number(event.target.value);
                        if (Number.isInteger(confidence_k) && confidence_k >= 0 && confidence_k !== component.confidence_k) {
                          saveComponent(component.id, { confidence_k });
                        }
                      }}
                    />
                  </S.Field>
                )}

                {manual && (
                  <>
                    <S.ToggleField>
                      <S.Checkbox
                        type="checkbox"
                        checked={component.is_growth_pct}
                        onChange={(event) => saveComponent(component.id, { is_growth_pct: event.target.checked })}
                      />
                      {copy.growthPctLabel}
                    </S.ToggleField>
                    {component.is_growth_pct && (
                      <S.Field>
                        {copy.ceilingLabel}
                        <S.NumberInput
                          type="number"
                          min={1}
                          step={1}
                          defaultValue={component.ceiling_pct ?? 40}
                          onBlur={(event) => {
                            const ceiling_pct = Number(event.target.value);
                            if (Number.isFinite(ceiling_pct) && ceiling_pct > 0 && ceiling_pct !== component.ceiling_pct) {
                              saveComponent(component.id, { ceiling_pct });
                            }
                          }}
                        />
                      </S.Field>
                    )}
                  </>
                )}

                <S.ToggleField>
                  <S.Checkbox
                    type="checkbox"
                    checked={component.enabled}
                    onChange={(event) => saveComponent(component.id, { enabled: event.target.checked })}
                  />
                  {copy.enabledLabel}
                </S.ToggleField>

                {manual && (
                  <S.DeleteButton type="button" onClick={() => openDelete(component)}>
                    {copy.deleteAction}
                  </S.DeleteButton>
                )}
              </S.ComponentRow>
            );
          })}
        </S.ComponentList>

        <S.AddButton type="button" onClick={openAddForm}>
          + {copy.addButton}
        </S.AddButton>
      </S.Section>

      <S.Section>
        <S.SectionTitle>{copy.inputsTitle}</S.SectionTitle>
        <S.SectionSubtitle>{copy.inputsSubtitle}</S.SectionSubtitle>

        {manualComponents.length === 0 ? (
          <S.EmptyHint>{copy.noManualComponents}</S.EmptyHint>
        ) : (
          <S.InputsGrid>
            <S.InputsHeader>
              <S.RestaurantCell>{copy.restaurantColumn}</S.RestaurantCell>
              {manualComponents.map((component) => (
                <S.ValueCell key={component.id}>{component.label}</S.ValueCell>
              ))}
            </S.InputsHeader>
            {restaurants.map((restaurant) => (
              <S.InputsRow key={restaurant.id}>
                <S.RestaurantCell>{restaurant.name}</S.RestaurantCell>
                {manualComponents.map((component) => (
                  <S.ValueCell key={component.id}>
                    <S.ValueCaption>{component.is_growth_pct ? '%' : '0–100'}</S.ValueCaption>
                    <S.NumberInput
                      type="number"
                      step={component.is_growth_pct ? 1 : 5}
                      placeholder={copy.inputPlaceholder}
                      defaultValue={inputValue(restaurant.id, component.id) ?? ''}
                      onBlur={(event) => saveInput(restaurant.id, component.id, event.target.value)}
                    />
                  </S.ValueCell>
                ))}
              </S.InputsRow>
            ))}
          </S.InputsGrid>
        )}
      </S.Section>

      <AnimatePresence>
        {addForm && (
          <Modal title={copy.form.addTitle} onClose={closeAddForm}>
            <S.Form
              onSubmit={(event) => {
                event.preventDefault();
                submitAddForm();
              }}
            >
              <S.Field>
                {copy.form.labelLabel}
                <S.TextInput
                  value={addForm.label}
                  placeholder={copy.form.labelPlaceholder}
                  onChange={(event) => patchAddForm({ label: event.target.value })}
                />
              </S.Field>
              <S.Field>
                {copy.form.weightLabel}
                <S.NumberInput
                  type="number"
                  min={0}
                  max={1}
                  step={0.05}
                  value={addForm.weight}
                  onChange={(event) => patchAddForm({ weight: event.target.value })}
                />
              </S.Field>
              <S.ToggleField>
                <S.Checkbox
                  type="checkbox"
                  checked={addForm.isGrowthPct}
                  onChange={(event) => patchAddForm({ isGrowthPct: event.target.checked })}
                />
                {copy.form.growthPctLabel}
              </S.ToggleField>
              {addForm.isGrowthPct && (
                <S.Field>
                  {copy.form.ceilingLabel}
                  <S.NumberInput
                    type="number"
                    min={1}
                    step={1}
                    value={addForm.ceiling}
                    onChange={(event) => patchAddForm({ ceiling: event.target.value })}
                  />
                </S.Field>
              )}
              {addForm.error && <S.ErrorText>{addForm.error}</S.ErrorText>}
              <S.FormActions>
                <S.CancelButton type="button" onClick={closeAddForm} disabled={addForm.saving}>
                  {copy.form.cancel}
                </S.CancelButton>
                <S.SaveButton type="submit" disabled={addForm.saving}>
                  {addForm.saving ? copy.form.saving : copy.form.save}
                </S.SaveButton>
              </S.FormActions>
            </S.Form>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget && (
          <Modal title={copy.deleteConfirm.title} onClose={closeDelete}>
            <S.Form onSubmit={(event) => event.preventDefault()}>
              <S.ConfirmMessage>
                {copy.deleteConfirm.message.replace('{name}', deleteTarget.label)}
              </S.ConfirmMessage>
              {deleteError && <S.ErrorText>{deleteError}</S.ErrorText>}
              <S.FormActions>
                <S.CancelButton type="button" onClick={closeDelete} disabled={isDeleting}>
                  {copy.deleteConfirm.cancel}
                </S.CancelButton>
                <S.DangerButton type="button" onClick={confirmDelete} disabled={isDeleting}>
                  {isDeleting ? copy.deleteConfirm.deleting : copy.deleteConfirm.confirm}
                </S.DangerButton>
              </S.FormActions>
            </S.Form>
          </Modal>
        )}
      </AnimatePresence>
    </S.Panel>
  );
};
