import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa6';
import styled, { css } from 'styled-components';

export const Button = styled(motion.button)<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.brandGreen};
  box-shadow: 0 0 10px rgba(1, 135, 66, 0.4);
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover,
  &:focus-visible {
    opacity: 0.85;
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      box-shadow: none;
      cursor: not-allowed;

      &:hover,
      &:focus-visible {
        opacity: 0.5;
      }
    `}
`;

export const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ctaText};
`;

export const Icon = styled(FaArrowRight)`
  width: 12px;
  height: 12px;
  color: ${({ theme }) => theme.colors.ctaText};
`;
