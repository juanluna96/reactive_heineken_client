import { motion } from 'framer-motion';
import { FaArrowsRotate, FaChevronDown, FaChevronLeft, FaChevronRight, FaFilter, FaMagnifyingGlass, FaStar } from 'react-icons/fa6';
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
  flex-wrap: wrap;
`;

export const SortControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const SortIcon = styled(FaFilter)`
  width: 12px;
  height: 12px;
  flex-shrink: 0;
`;

export const SortSelect = styled.select`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;

  &:focus-visible {
    outline: none;
  }

  option {
    color: #000;
  }
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

export const RefreshIcon = styled(FaArrowsRotate)``;

export const Content = styled.div`
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

export const SearchFieldWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 360px;
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

export const RankCard = styled.div`
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
`;

export const RankIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
`;

export const RankNumber = styled.span`
  flex-shrink: 0;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.brandGreenLight};
  opacity: 0.4;
`;

export const RestaurantAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(112, 220, 141, 0.15);
  color: ${({ theme }) => theme.colors.brandGreenLight};
  font-size: 14px;
  font-weight: 700;
`;

export const RestaurantName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const RankMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (min-width: 640px) {
    flex-shrink: 0;
  }
`;

export const RatingBlock = styled.div`
  text-align: center;
  min-width: 72px;
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

export const BeerMastersDetails = styled.details`
  ${glassPanel}
  padding: 8px 14px;

  &[open] summary svg {
    transform: rotate(180deg);
  }
`;

export const BeerMastersSummary = styled.summary`
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  cursor: pointer;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;

  &::-webkit-details-marker {
    display: none;
  }
`;

export const ChevronIcon = styled(FaChevronDown)`
  width: 10px;
  height: 10px;
  transition: transform 0.2s ease;
`;

export const BeerMastersList = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 220px;
`;

export const BeerMasterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
`;

export const BeerMasterName = styled.span`
  color: ${({ theme }) => theme.colors.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BeerMasterScore = styled.span`
  flex-shrink: 0;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const EmptyMessage = styled.p`
  margin: 0;
  padding: 8px 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
`;
