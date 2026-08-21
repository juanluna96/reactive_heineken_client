import { motion } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';
import styled from 'styled-components';

export const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
`;

export const Panel = styled(motion.div)`
  width: 100%;
  max-width: 420px;
  max-height: 90dvh;
  overflow-y: auto;
  background: #1a1a1a;
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.mutedText};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const CloseIcon = styled(FaXmark)``;
