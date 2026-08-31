import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa6';
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
  padding: clamp(24px, 6dvh, 48px) 20px 0;
`;

export const Header = styled(motion.header)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding-bottom: clamp(20px, 5dvh, 48px);
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
  width: 169px;
  height: 96px;
  object-fit: contain;
`;

export const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 5dvh, 48px);
  flex: 1 1 auto;
  min-height: 0;
  padding-bottom: clamp(20px, 5dvh, 48px);
`;

export const ProfileSection = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: stretch;
  width: 100%;
  gap: 8px;
`;

export const RatingSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: clamp(16px, 4dvh, 32px);
`;

export const Subtitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedText};
  opacity: 0.6;
`;

export const RatingError = styled(motion.p)`
  margin: 8px 0 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.danger};
`;

export const OpinionSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const OpinionLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 10px;
  line-height: 15px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.mutedText};
  opacity: 0.6;
`;

export const OpinionCard = styled.div`
  position: relative;
  width: 100%;
  padding: 17px 17px 23px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 80px;
  border: none;
  background: none;
  resize: none;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.mutedText};
    opacity: 0.4;
  }

  &:focus-visible {
    outline: none;
  }
`;

export const CharCount = styled.span`
  position: absolute;
  right: 16px;
  bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 10px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.mutedText};
  opacity: 0.6;
`;

export const Footer = styled(motion.footer)`
  position: sticky;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: clamp(12px, 3dvh, 24px);
  padding-top: clamp(20px, 5dvh, 24px);
  padding-bottom: clamp(16px, 4dvh, 24px);
`;
