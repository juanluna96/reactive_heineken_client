import { motion } from 'framer-motion';
import { FaArrowsRotate, FaArrowTrendDown, FaArrowTrendUp, FaChevronDown, FaMagnifyingGlass, FaRegStar, FaStar } from 'react-icons/fa6';
import styled, { css } from 'styled-components';
import { ADMIN_DESKTOP_BREAKPOINT, ADMIN_MOBILE_BREAKPOINT, ADMIN_SIDEBAR_WIDTH } from '../AdminSidebar';

const DESKTOP_BREAKPOINT = ADMIN_DESKTOP_BREAKPOINT;
const MOBILE_BREAKPOINT = ADMIN_MOBILE_BREAKPOINT;

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

export const RefreshButton = styled(motion.button)<{ $spinning?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }

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

export const RefreshIcon = styled(FaArrowsRotate)``;

export const Content = styled(motion.div)`
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    padding: 40px;
  }
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

const glassPanel = css`
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: ${({ theme }) => theme.radii.md};
`;

/* Stats bento */

export const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StatCard = styled(motion.div)<{ $accent?: boolean }>`
  ${glassPanel}
  padding: 20px;
  display: flex;
  flex-direction: column;

  ${({ $accent }) =>
    $accent &&
    css`
      border-color: rgba(112, 220, 141, 0.3);
      background: rgba(1, 135, 66, 0.1);
    `}
`;

export const StatLabel = styled.p`
  margin: 0;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const StatValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 12px;
`;

export const StatValue = styled.span`
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const StatValuePlain = styled(StatValue)`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const StatStarIcon = styled(FaStar)`
  width: 18px;
  height: 18px;
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const StatTrend = styled.p<{ $direction: 'up' | 'down' }>`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 8px 0 0;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme, $direction }) => ($direction === 'up' ? theme.colors.brandGreenLight : theme.colors.danger)};

  svg {
    width: 11px;
    height: 11px;
  }
`;

export const StatNote = styled.p`
  margin: 8px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const StatTrack = styled.div`
  width: 100%;
  height: 6px;
  margin-top: 12px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.timerTrack};
  overflow: hidden;
`;

export const StatFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ theme }) => theme.colors.brandGreenLight};
`;

/* Filters */

export const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const filterSelect = css`
  flex: 1;
  appearance: none;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
  max-width: 160px;

  &:focus-visible {
    outline: none;
  }

  option {
    color: #000;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    max-width: none;
  }
`;

export const FilterControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.brandGreenLight};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

export const FilterIcon = styled(FaChevronDown)`
  width: 11px;
  height: 11px;
  flex-shrink: 0;
`;

export const FilterSelect = styled.select`
  ${filterSelect}
`;

export const ClearFiltersButton = styled.button`
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: transparent;
  color: ${({ theme }) => theme.colors.mutedText};
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandGreenLight};
    color: ${({ theme }) => theme.colors.brandGreenLight};
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

export const SearchFieldWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 360px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    max-width: none;
  }
`;

export const SearchIcon = styled(FaMagnifyingGlass)`
  position: absolute;
  top: 50%;
  left: 14px;
  width: 13px;
  height: 13px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.placeholderText};
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 14px 0 38px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.inputBackground};
  font-family: inherit;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.white};

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholderText};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandGreenLight};
  }
`;

/* Review cards */

export const ReviewCard = styled(motion.div)`
  ${glassPanel}
  padding: 20px;
  display: flex;
  gap: 16px;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(112, 220, 141, 0.5);
  }
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(112, 220, 141, 0.15);
  color: ${({ theme }) => theme.colors.brandGreenLight};
  font-size: 13px;
  font-weight: 700;
`;

export const ReviewBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ReviewHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
`;

export const CustomerName = styled.h4`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
`;

export const ReviewTime = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const StarsRow = styled.div`
  display: flex;
  gap: 2px;
  margin: 8px 0;
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

export const CommentText = styled.p`
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ReviewMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 8px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

export const LoadMoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  cursor: pointer;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandGreenLight};
    color: ${({ theme }) => theme.colors.brandGreenLight};
  }

  svg {
    width: 11px;
    height: 11px;
  }
`;

export const EmptyMessage = styled.p`
  margin: 0;
  padding: 8px 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const TrendUpIcon = styled(FaArrowTrendUp)``;
export const TrendDownIcon = styled(FaArrowTrendDown)``;
