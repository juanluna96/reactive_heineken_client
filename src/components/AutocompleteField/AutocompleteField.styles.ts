import { motion } from 'framer-motion';
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

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input<{ $hasError: boolean }>`
  width: 100%;
  height: 56px;
  padding: 0 41px 0 17px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.cardBorder)};
  background: ${({ theme }) => theme.colors.inputBackground};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholderText};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandGreenLight};
  }
`;

export const SearchIcon = styled.span`
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

export const Dropdown = styled(motion.ul)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 10;
  max-height: 220px;
  overflow-y: auto;
  margin: 0;
  padding: 8px;
  list-style: none;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
`;

export const Option = styled.li<{ $highlighted: boolean }>`
  padding: 12px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme, $highlighted }) => ($highlighted ? theme.colors.surface : 'transparent')};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const NoResults = styled.li`
  padding: 12px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.placeholderText};
  text-align: center;
`;

export const ErrorText = styled(motion.span)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.danger};
`;
