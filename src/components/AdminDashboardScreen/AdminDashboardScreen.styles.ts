import { motion } from 'framer-motion';
import { FaArrowsRotate, FaCalendarDays, FaMedal, FaRegStar, FaStar, FaUtensils } from 'react-icons/fa6';
import styled, { css } from 'styled-components';
import { ADMIN_DESKTOP_BREAKPOINT, ADMIN_SIDEBAR_WIDTH } from '../AdminSidebar';

const DESKTOP_BREAKPOINT = ADMIN_DESKTOP_BREAKPOINT;

export const Screen = styled.div`
  position: relative;
  min-height: 100dvh;
  background: #131313;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.heading};
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
  object-position: top;
`;

export const Main = styled.main`
  position: relative;
  z-index: 1;
  min-height: 100dvh;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    margin-left: ${ADMIN_SIDEBAR_WIDTH};
  }
`;

export const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.surfaceBorder};

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    padding: 20px 40px;
  }
`;

export const TitleGroup = styled.div``;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 700;
`;

export const PageSubtitle = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PeriodBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.mutedText};
  font-size: 12px;
  font-weight: 500;
`;

export const PeriodIcon = styled(FaCalendarDays)`
  width: 12px;
  height: 12px;
`;

export const RefreshButton = styled(motion.button)<{ $spinning?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px 16px;
  background: ${({ theme }) => theme.colors.brandGreenLight};
  color: #003918;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  cursor: pointer;

  svg {
    width: 13px;
    height: 13px;
    animation: ${({ $spinning }) => ($spinning ? 'spin 0.8s linear infinite' : 'none')};
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    padding: 40px;
  }
`;

const glassPanel = css`
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const KpiCard = styled.div`
  ${glassPanel}
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

export const KpiIconBackdrop = styled.span`
  position: absolute;
  right: -8px;
  bottom: -8px;
  opacity: 0.06;

  svg {
    width: 72px;
    height: 72px;
  }
`;

export const KpiLabel = styled.p`
  margin: 0 0 10px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const KpiValueRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
`;

export const KpiValue = styled.h3<{ $accent?: boolean }>`
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: ${({ theme, $accent }) => ($accent ? theme.colors.brandGreenLight : theme.colors.textPrimary)};
`;

export const TrendBadge = styled.span<{ $direction: 'up' | 'down' }>`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme, $direction }) => ($direction === 'up' ? theme.colors.brandGreenLight : theme.colors.danger)};

  svg {
    width: 11px;
    height: 11px;
  }
`;

export const SubtleBadge = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const StarsRow = styled.div`
  display: flex;
  gap: 2px;
`;

export const StarFilled = styled(FaStar)`
  width: 13px;
  height: 13px;
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const StarEmpty = styled(FaRegStar)`
  width: 13px;
  height: 13px;
  color: ${({ theme }) => theme.colors.mutedText};
  opacity: 0.5;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 1100px) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const AnalyticsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

export const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

export const Panel = styled.div`
  ${glassPanel}
  padding: 24px;
`;

export const PanelHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
`;

export const PanelTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

export const PanelSubtitle = styled.p`
  margin: 4px 0 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const ChartArea = styled.div`
  height: 220px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 4px;
  padding: 0 4px 12px;
`;

export const ChartBar = styled.div<{ $heightPct: number }>`
  flex: 1 1 0;
  min-width: 4px;
  height: ${({ $heightPct }) => Math.max(4, $heightPct)}%;
  border-radius: 4px 4px 0 0;
  background: ${({ theme }) => theme.colors.brandGreenLight};
  opacity: ${({ $heightPct }) => 0.25 + ($heightPct / 100) * 0.65};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

export const ChartAxis = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const EmptyMessage = styled.p`
  margin: 0;
  padding: 32px 0;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const TableScroll = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const Thead = styled.thead`
  background: rgba(255, 255, 255, 0.05);
`;

export const Th = styled.th`
  padding: 12px 16px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${({ theme }) => theme.colors.mutedText};
  white-space: nowrap;
`;

export const Tr = styled.tr`
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const Td = styled.td`
  padding: 12px 16px;
  font-size: 13px;
  vertical-align: middle;
`;

export const RankBadge = styled.span<{ $isTop?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 10px;
  font-weight: 700;

  ${({ $isTop, theme }) =>
    $isTop
      ? css`
          background: ${theme.colors.brandGreenLight};
          color: #003918;
        `
      : css`
          border: 1px solid ${theme.colors.surfaceBorder};
          color: ${theme.colors.textPrimary};
        `}
`;

export const MasterCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.div<{ $size?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size }) => $size ?? 36}px;
  height: ${({ $size }) => $size ?? 36}px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(112, 220, 141, 0.15);
  color: ${({ theme }) => theme.colors.brandGreenLight};
  font-size: 11px;
  font-weight: 700;
`;

export const MasterName = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 700;
`;

export const RestaurantText = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const RatingCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const RatingValue = styled.span`
  font-size: 13px;
  font-weight: 700;
`;

export const DonutWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

export const DonutSvg = styled.svg`
  width: 160px;
  height: 160px;
  transform: rotate(-90deg);
`;

export const DonutTrack = styled.circle`
  fill: transparent;
  stroke: rgba(255, 255, 255, 0.05);
  stroke-width: 12;
`;

export const DonutValue = styled.circle`
  fill: transparent;
  stroke: ${({ theme }) => theme.colors.brandGreen};
  stroke-width: 12;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.4s ease;
`;

export const DonutCenter = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DonutPct = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

export const DonutCaption = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const DistributionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DistributionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
`;

export const DistributionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DistributionDot = styled.span<{ $rating: number }>`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $rating }) => {
    if ($rating >= 5) return theme.colors.brandGreenLight;
    if ($rating >= 4) return `${theme.colors.brandGreenLight}99`;
    return 'rgba(255, 255, 255, 0.2)';
  }};
`;

export const DistributionCount = styled.span`
  font-weight: 700;
`;

export const FeedPanel = styled(Panel)`
  display: flex;
  flex-direction: column;
  max-height: 600px;
  padding: 0;
`;

export const FeedHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const FeedList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FeedCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(112, 220, 141, 0.3);
  }
`;

export const FeedCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;

export const FeedMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FeedName = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 700;
`;

export const FeedTime = styled.p`
  margin: 0;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const FeedContext = styled.p`
  margin: 0;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const FeedComment = styled.p`
  margin: 0;
  font-size: 12px;
  font-style: italic;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const StatusScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  padding: 24px;
  text-align: center;
`;

export const StatusTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
`;

export const StatusSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const RestaurantIcon = styled(FaUtensils)``;
export const BeerMasterIcon = styled(FaMedal)``;
export const RatingIcon = styled(FaStar)``;
export const RefreshIcon = styled(FaArrowsRotate)``;
