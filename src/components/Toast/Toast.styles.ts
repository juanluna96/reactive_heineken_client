import { motion } from 'framer-motion';
import { FaCircleExclamation } from 'react-icons/fa6';
import styled from 'styled-components';

export const Wrapper = styled(motion.div)`
  position: fixed;
  top: max(16px, env(safe-area-inset-top));
  left: 20px;
  right: 20px;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 472px;
  margin: 0 auto;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  background: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
`;

export const Icon = styled(FaCircleExclamation)`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.danger};
`;

export const Message = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;
