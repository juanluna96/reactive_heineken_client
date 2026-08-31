import styled from 'styled-components';

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SectionSubtitle = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const WeightSum = styled.span<{ $ok: boolean }>`
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 11px;
  font-weight: 700;
  background: ${({ $ok }) => ($ok ? 'rgba(112, 220, 141, 0.15)' : 'rgba(255, 179, 71, 0.16)')};
  color: ${({ theme, $ok }) => ($ok ? theme.colors.brandGreenLight : theme.colors.accentWarm)};
`;

export const Hint = styled.p`
  margin: 0;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.mutedText};
  opacity: 0.75;
`;

export const ComponentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ComponentRow = styled.div<{ $disabled?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 12px 16px;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBackground};
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};
`;

export const ComponentName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 1 160px;
  min-width: 0;
`;

export const KindBadge = styled.span<{ $manual?: boolean }>`
  align-self: flex-start;
  padding: 2px 7px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme, $manual }) => ($manual ? theme.colors.accentWarm : theme.colors.mutedText)};
`;

export const AutoLabel = styled.strong`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const NumberInput = styled.input`
  width: 80px;
  height: 36px;
  padding: 0 10px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.inputBackground};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandGreenLight};
  }
`;

export const TextInput = styled(NumberInput)`
  width: 100%;
`;

export const ToggleField = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mutedText};
  cursor: pointer;
  user-select: none;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${({ theme }) => theme.colors.brandGreen};
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  align-self: center;
  padding: 6px 10px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 107, 107, 0.12);
  color: ${({ theme }) => theme.colors.danger};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: rgba(255, 107, 107, 0.2);
  }
`;

export const AddButton = styled.button`
  align-self: flex-start;
  padding: 9px 14px;
  border: 1px dashed ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.brandGreenLight};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandGreenLight};
  }
`;

export const InputsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InputsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  background: ${({ theme }) => theme.colors.surface};
`;

export const InputsHeader = styled(InputsRow)`
  background: transparent;
  border: none;
  padding-bottom: 0;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const RestaurantCell = styled.span`
  flex: 1 1 180px;
  min-width: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ValueCell = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const ValueCaption = styled.span`
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.mutedText};
  opacity: 0.7;
`;

export const EmptyHint = styled.p`
  margin: 0;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px dashed ${({ theme }) => theme.colors.cardBorder};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
  text-align: center;
`;

export const StatusText = styled.p`
  padding: 24px 0;
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

/* --- add-component modal --- */

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const CancelButton = styled.button`
  padding: 10px 18px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.mutedText};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

export const SaveButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.brandGreen};
  color: ${({ theme }) => theme.colors.ctaText};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DangerButton = styled(SaveButton)`
  background: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
`;

export const ErrorText = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
`;

export const ConfirmMessage = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
