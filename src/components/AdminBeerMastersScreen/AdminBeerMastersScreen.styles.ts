import { motion } from 'framer-motion';
import {
  FaArrowsRotate,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaLocationDot,
  FaMagnifyingGlass,
  FaStar,
} from 'react-icons/fa6';
import styled, { css, keyframes } from 'styled-components';
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

export const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

const filterControl = css`
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

export const SortControl = styled.div`
  ${filterControl}
`;

export const RestaurantFilterControl = styled.div`
  ${filterControl}
`;

export const SortIcon = styled(FaFilter)`
  width: 12px;
  height: 12px;
  flex-shrink: 0;
`;

export const RestaurantFilterIcon = styled(FaLocationDot)`
  width: 12px;
  height: 12px;
  flex-shrink: 0;
`;

const filterSelect = css`
  flex: 1;
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

export const SortSelect = styled.select`
  ${filterSelect}
`;

export const RestaurantFilterSelect = styled.select`
  ${filterSelect}
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

export const SearchFieldWrapper = styled(motion.div)`
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

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-top: 8px;
`;

export const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    border-color: ${({ theme }) => theme.colors.brandGreenLight};
  }

  svg {
    width: 11px;
    height: 11px;
  }
`;

export const PrevPageIcon = styled(FaChevronLeft)``;
export const NextPageIcon = styled(FaChevronRight)``;

export const PaginationLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.colors.mutedText};
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

const ownBeerMasterPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(112, 220, 141, 0.45);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(112, 220, 141, 0);
  }
`;

export const RankCard = styled(motion.div)<{ $isOwn?: boolean }>`
  ${glassPanel}
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(112, 220, 141, 0.5);
  }

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  ${({ $isOwn, theme }) =>
    $isOwn &&
    css`
      border-color: ${theme.colors.brandGreenLight};
      animation: ${ownBeerMasterPulse} 1.4s ease-out 3;
    `}
`;

export const RankIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
`;

export const OwnBadge = styled.span`
  flex-shrink: 0;
  padding: 3px 8px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(112, 220, 141, 0.15);
  color: ${({ theme }) => theme.colors.brandGreenLight};
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

export const RankNumber = styled.span`
  flex-shrink: 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.brandGreenLight};
  opacity: 0.4;
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(112, 220, 141, 0.15);
  color: ${({ theme }) => theme.colors.brandGreenLight};
  font-size: 14px;
  font-weight: 700;
  border: 2px solid rgba(112, 220, 141, 0.3);
`;

export const NameBlock = styled.div`
  min-width: 0;
`;

export const BeerMasterName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RestaurantLabel = styled.p`
  margin: 2px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RankMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (min-width: 640px) {
    flex-shrink: 0;
  }

  // Below 640px RankCard stacks to a column (see above) — let this row's
  // rating block grow to use the full width instead of sitting narrow at
  // its own content size.
  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;

    & > * {
      flex: 1;
    }
  }
`;

export const RatingBlock = styled.div`
  min-width: 88px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const StarIcon = styled(FaStar)`
  width: 13px;
  height: 13px;
`;

export const RatingValue = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const RatingTrack = styled.div`
  width: 100%;
  max-width: 80px;
  height: 4px;
  margin-top: 6px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.timerTrack};
  overflow: hidden;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    max-width: none;
  }
`;

export const RatingFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const ReviewsLabel = styled.p`
  margin: 2px 0 0;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const NoRatingsBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.colors.mutedText};
  opacity: 0.7;
`;

export const EmptyMessage = styled.p`
  margin: 0;
  padding: 8px 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
`;
