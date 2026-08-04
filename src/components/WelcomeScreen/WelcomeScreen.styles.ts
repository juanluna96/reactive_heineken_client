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
`;

export const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.overlayStart},
    ${({ theme }) => theme.colors.overlayEnd}
  );
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

export const WelcomeText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: 8px;
  padding-bottom: clamp(20px, 5dvh, 48px);
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
  color: ${({ theme }) => theme.colors.white};
`;

export const Subtitle = styled.p`
  margin: 0;
  max-width: 280px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const LanguageList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 auto;
  min-height: 0;
  gap: 12px;
  padding: clamp(16px, 6dvh, 108px) 0;
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
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
