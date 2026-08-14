import { motion } from 'framer-motion';
import { FaArrowLeft, FaLock, FaPlay } from 'react-icons/fa6';
import ReactPlayer from 'react-player';
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

export const HeadingBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 800;
  font-size: clamp(28px, 8vw, 36px);
  line-height: 1.17;
  letter-spacing: -0.9px;
  text-align: center;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const Subtitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  white-space: pre-line;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const VideoCard = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  &:fullscreen,
  &:-webkit-full-screen {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    aspect-ratio: unset;
    border-radius: 0;
    border: none;
    box-shadow: none;
    background: #000;

    video {
      object-fit: contain !important;
    }
  }
`;

export const VideoThumbnail = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Player = styled(ReactPlayer)`
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
`;

export const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const PlayButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: 1px solid rgba(112, 220, 141, 0.4);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(112, 220, 141, 0.2);
  backdrop-filter: blur(6px);
  box-shadow: 0 0 20px rgba(112, 220, 141, 0.4);
  cursor: pointer;
`;

export const PlayIcon = styled(FaPlay)`
  width: 16px;
  height: 16px;
  margin-left: 3px;
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const AutoplayBanner = styled.div`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 13px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
`;

export const AutoplayText = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.white};
`;

export const DurationBadge = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  padding: 5px 13px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
`;

export const DurationText = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 10px;
  line-height: 15px;
  color: ${({ theme }) => theme.colors.white};
`;

export const TimerSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
`;

export const TimerRing = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 128px;
  height: 128px;
`;

export const TimerSvg = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

export const TimerTrack = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.timerTrack};
  stroke-width: 4;
`;

export const TimerProgress = styled.circle<{ $circumference: number; $dashoffset: number }>`
  fill: none;
  stroke: ${({ theme }) => theme.colors.brandGreenLight};
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: ${({ $circumference }) => $circumference};
  stroke-dashoffset: ${({ $dashoffset }) => $dashoffset};
  transition: stroke-dashoffset 1s linear;
`;

export const TimerText = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

export const TimeValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -1.2px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const TimeLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 9px;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const HelperText = styled.p`
  margin: 0;
  max-width: 320px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-style: italic;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  white-space: pre-line;
  opacity: 0.8;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const Footer = styled(motion.footer)`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: clamp(12px, 3dvh, 24px);
  padding-top: clamp(20px, 5dvh, 48px);
`;

export const LockedButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.lockedBackground};
  cursor: not-allowed;
`;

export const LockIcon = styled(FaLock)`
  width: 14px;
  height: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const LockedLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.mutedText};
`;
