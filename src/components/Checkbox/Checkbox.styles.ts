import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Wrapper = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  cursor: pointer;
`;

export const Input = styled(motion.input)<{ $hasError: boolean }>`
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  margin-top: 4px;
  appearance: none;
  position: relative;
  border-radius: 2px;
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.placeholderText)};
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;

  &:checked {
    border-color: ${({ theme }) => theme.colors.brandGreen};
    background: ${({ theme }) => theme.colors.brandGreen};
  }

  &:checked::after {
    content: '';
    position: absolute;
    left: 5px;
    top: 2px;
    width: 3px;
    height: 7px;
    border: solid ${({ theme }) => theme.colors.white};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brandGreenLight};
    outline-offset: 2px;
  }
`;

export const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const LinkText = styled.span`
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const ErrorText = styled(motion.span)`
  margin-left: 32px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.danger};
`;
