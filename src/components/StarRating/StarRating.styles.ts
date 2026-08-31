import { motion } from 'framer-motion';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import styled from 'styled-components';

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Question = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Stars = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 0 8px;
`;

export const StarButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 4px;
  cursor: pointer;
`;

export const StarFilled = styled(FaStar)`
  width: 28px;
  height: 28px;
  color: ${({ theme }) => theme.colors.heinekenRed};
`;

export const StarEmpty = styled(FaRegStar)`
  width: 28px;
  height: 28px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const TierMessage = styled.p<{ $visible: boolean }>`
  margin: 0;
  height: 16px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1.2px;
  text-align: center;
  color: ${({ theme }) => theme.colors.accentWarm};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.2s ease;
`;

export const Error = styled(motion.p)`
  margin: 8px 0 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.danger};
`;
