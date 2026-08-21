import { motion } from 'framer-motion';
import { FaMapLocationDot } from 'react-icons/fa6';
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

export const Header = styled(motion.header)`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  padding-bottom: clamp(20px, 5dvh, 48px);
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
  flex: 1 1 auto;
  min-height: 0;
  gap: clamp(16px, 4dvh, 32px);
`;

export const IconCircle = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 88px;
  height: 88px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(112, 220, 141, 0.15);
  box-shadow: 0 0 40px rgba(112, 220, 141, 0.15);
`;

export const MapIcon = styled(FaMapLocationDot)`
  width: 34px;
  height: 34px;
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const TextGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const Eyebrow = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 4px;
  color: ${({ theme }) => theme.colors.brandGreenLight};
  opacity: 0.7;
`;

export const Title = styled.h1`
  margin: 0;
  max-width: 340px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: clamp(24px, 7vw, 32px);
  line-height: 1.25;
  letter-spacing: -0.6px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;

export const Subtitle = styled.p`
  margin: 0;
  max-width: 320px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const Footer = styled(motion.footer)`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: clamp(12px, 3dvh, 24px);
  padding-top: clamp(20px, 5dvh, 48px);
`;
