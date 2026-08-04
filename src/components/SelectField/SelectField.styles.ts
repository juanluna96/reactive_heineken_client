import styled from 'styled-components';

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Icon = styled.span`
  display: flex;
  width: 12px;
  height: 12px;
  color: ${({ theme }) => theme.colors.mutedText};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Select = styled.select<{ $hasValue: boolean; $hasError: boolean }>`
  width: 100%;
  height: 56px;
  padding: 0 41px 0 17px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.cardBorder)};
  background: ${({ theme }) => theme.colors.inputBackground};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  color: ${({ theme, $hasValue }) => ($hasValue ? theme.colors.textPrimary : theme.colors.placeholderText)};
  appearance: none;
  cursor: pointer;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandGreenLight};
  }
`;

export const ChevronIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 17px;
  display: flex;
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.placeholderText};
  transform: translateY(-50%);
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const ErrorText = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.danger};
`;
