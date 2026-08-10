import { FaArrowLeft, FaRegStar, FaStar } from 'react-icons/fa6';
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

export const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 512px;
  min-height: 100dvh;
  padding: clamp(24px, 6dvh, 48px) 20px 0;
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
  align-items: center;
  justify-content: center;
  gap: clamp(24px, 5dvh, 48px);
  flex: 1 1 auto;
  min-height: 0;
  padding-bottom: clamp(24px, 5dvh, 48px);
`;

export const ProfileSection = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: stretch;
  gap: 8px;
`;

export const NameInput = styled.input<{ $hasError: boolean }>`
  grid-column: 1;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  text-align: center;
  padding: 13px 17px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.cardBorder)};
  background: rgba(14, 14, 14, 0.8);
  backdrop-filter: blur(20px);
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.textPrimary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholderText};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandGreenLight};
  }
`;

export const NameError = styled.span`
  grid-column: 1;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.danger};
`;

export const BeerMasterLabel = styled.span`
  grid-column: 1;
  width: max-content;
  justify-self: center;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.mutedText};
  opacity: 0.8;
`;

export const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Subtitle = styled.p`
  margin: 4px 0 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mutedText};
  opacity: 0.6;
`;

export const Stars = styled.div`
  display: flex;
  gap: 8px;
  padding: 24px 0 16px;
`;

export const StarButton = styled.button`
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

export const RatingError = styled.p`
  margin: 8px 0 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.danger};
`;

export const OpinionSection = styled.div`
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

export const Footer = styled.footer`
  position: sticky;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: clamp(12px, 3dvh, 24px);
  margin: 0 -20px;
  padding: clamp(20px, 5dvh, 24px) 20px clamp(16px, 4dvh, 24px);
  background: rgba(14, 14, 14, 0.8);
  backdrop-filter: blur(20px);
`;
