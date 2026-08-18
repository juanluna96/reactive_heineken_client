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

export const Input = styled.input<{ $hasError: boolean; $hasToggle: boolean }>`
  width: 100%;
  height: 56px;
  padding: ${({ $hasToggle }) => ($hasToggle ? '0 48px 0 17px' : '0 17px')};
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

export const ToggleVisibilityButton = styled.button`
  position: absolute;
  top: 50%;
  right: 17px;
  display: flex;
  width: 18px;
  height: 18px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.placeholderText};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.mutedText};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brandGreenLight};
    outline-offset: 2px;
  }
`;

export const ErrorText = styled(motion.span)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.danger};
`;
