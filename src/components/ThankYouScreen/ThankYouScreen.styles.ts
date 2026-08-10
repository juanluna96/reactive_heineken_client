import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa6';
import styled from 'styled-components';

export const Screen = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100dvh;
  overflow-x: hidden;
  overflow-y: auto;
  background: #131313;
`;

export const Background = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  z-index: 0;
`;

export const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 15% top;
`;

export const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 512px;
  min-height: 100dvh;
  padding: clamp(24px, 6dvh, 48px) 20px clamp(16px, 4dvh, 24px);
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1 1 auto;
  min-height: 0;
  gap: 32px;
  padding-top: clamp(20px, 5dvh, 48px);
`;

export const IconCircle = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 96px;
  height: 96px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.brandGreen};
  box-shadow: 0 0 40px rgba(112, 220, 141, 0.3);
`;

export const CheckIcon = styled(FaCheck)`
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.ctaText};
`;

export const TextGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 36px;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: clamp(28px, 8vw, 36px);
  line-height: 1.17;
  letter-spacing: -0.9px;
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const Confirmation = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SupportingText = styled.p`
  margin: 0;
  max-width: 280px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const Footer = styled(motion.footer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: clamp(12px, 3dvh, 24px);
  padding-top: clamp(20px, 5dvh, 48px);
`;

export const Copyright = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1.2px;
  text-align: center;
  white-space: pre-line;
  opacity: 0.6;
  color: ${({ theme }) => theme.colors.mutedText};
`;
