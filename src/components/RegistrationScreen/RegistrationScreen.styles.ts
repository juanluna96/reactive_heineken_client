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

export const DarkOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
`;

export const GlowOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(112, 220, 141, 0.15), rgba(112, 220, 141, 0) 70%);
`;

export const GrainOverlay = styled.div<{ $texture: string }>`
  position: absolute;
  inset: 0;
  background-image: ${({ $texture }) => `url(${$texture})`};
  background-size: 24px 22px;
  background-repeat: repeat;
  mix-blend-mode: overlay;
  opacity: 0.2;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 512px;
  min-height: 100dvh;
  padding: clamp(24px, 6dvh, 48px) 20px clamp(16px, 4dvh, 24px);
`;

export const Header = styled.header`
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
  gap: clamp(20px, 5dvh, 48px);
  flex: 1 1 auto;
  min-height: 0;
`;

export const HeadingBlock = styled.div`
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

export const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 25px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBackground};
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: clamp(12px, 3dvh, 24px);
  padding-top: clamp(20px, 5dvh, 48px);
`;
