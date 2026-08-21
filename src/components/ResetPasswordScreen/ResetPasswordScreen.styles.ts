import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaTriangleExclamation } from 'react-icons/fa6';
import styled, { css } from 'styled-components';

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
  padding: clamp(16px, 4dvh, 40px) 20px clamp(12px, 3dvh, 24px);
`;

export const Header = styled(motion.header)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding-bottom: clamp(8px, 2dvh, 24px);
`;

export const BackButton = styled.button`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
`;

export const BackIcon = styled(FaArrowLeft)`
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Logo = styled.img`
  width: 110px;
  height: 62px;
  object-fit: contain;
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 3dvh, 32px);
  flex: 1 1 auto;
  min-height: 0;
`;

export const HeadingBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: clamp(28px, 8vw, 36px);
  line-height: 1.17;
  letter-spacing: -0.9px;
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const Subtitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  line-height: 24px;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const FormCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 20px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBackground};
`;

export const Footer = styled(motion.footer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: clamp(8px, 2dvh, 16px);
  padding-top: clamp(8px, 2dvh, 24px);
`;

export const SwitchRow = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const SwitchLink = styled.button`
  border: none;
  background: none;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.brandGreenLight};
  cursor: pointer;
`;

export const ConfirmationHero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1 1 auto;
  min-height: 0;
  gap: clamp(16px, 4dvh, 32px);
  padding-top: clamp(20px, 4dvh, 40px);
`;

export const IconCircle = styled(motion.div)<{ $variant?: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.radii.pill};

  ${({ $variant, theme }) =>
    $variant === 'error'
      ? css`
          background: ${theme.colors.danger};
          box-shadow: 0 0 40px rgba(255, 107, 107, 0.3);
        `
      : css`
          background: ${theme.colors.brandGreen};
          box-shadow: 0 0 40px rgba(112, 220, 141, 0.3);
        `}
`;

export const CheckIcon = styled(FaCheck)`
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.colors.ctaText};
`;

export const WarningIcon = styled(FaTriangleExclamation)`
  width: 28px;
  height: 28px;
  color: #2a0a0a;
`;

export const TextGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const ConfirmationTitle = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: clamp(24px, 7vw, 30px);
  line-height: 1.2;
  text-align: center;
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const ConfirmationMessage = styled.p`
  margin: 0;
  max-width: 320px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedText};
`;
