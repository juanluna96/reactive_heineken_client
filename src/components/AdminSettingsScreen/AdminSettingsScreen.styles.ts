import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaPen, FaPlus, FaTrash } from 'react-icons/fa6';
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

export const TabList = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px 16px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  cursor: pointer;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex: 1;
  }

  ${({ $active, theme }) =>
    $active
      ? css`
          background: ${theme.colors.brandGreenLight};
          color: #003918;
        `
      : css`
          background: ${theme.colors.cardBackground};
          color: ${theme.colors.mutedText};
        `}
`;

export const Content = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    padding: 40px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const RestaurantPickerWrapper = styled.div`
  max-width: 360px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    max-width: none;
    width: 100%;
  }
`;

export const AddButton = styled(motion.button)`
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

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const AddIcon = styled(FaPlus)``;

const glassPanel = css`
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const ItemList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ItemCard = styled(motion.div)`
  ${glassPanel}
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: rgba(112, 220, 141, 0.5);
  }
`;

export const ItemIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
`;

export const ItemAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(112, 220, 141, 0.15);
  color: ${({ theme }) => theme.colors.brandGreenLight};
  font-size: 13px;
  font-weight: 700;
`;

export const ItemName = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ItemActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const iconButtonBase = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;

  svg {
    width: 13px;
    height: 13px;
  }
`;

export const EditButton = styled.button`
  ${iconButtonBase}
  color: ${({ theme }) => theme.colors.mutedText};

  &:hover {
    color: ${({ theme }) => theme.colors.brandGreenLight};
  }
`;

export const DeleteButton = styled.button`
  ${iconButtonBase}
  color: ${({ theme }) => theme.colors.mutedText};

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

export const EditIcon = styled(FaPen)``;
export const DeleteIcon = styled(FaTrash)``;

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

export const EmptyState = styled.div`
  ${glassPanel}
  padding: 40px 24px;
  text-align: center;
`;

export const EmptyTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
`;

export const EmptySubtitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

// --- Form (used inside Modal for add/edit) ---

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column-reverse;
    align-items: stretch;
  }
`;

export const CancelButton = styled.button`
  border: none;
  background: none;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.mutedText};
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.white};
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

export const SaveButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.brandGreenLight};
  color: #003918;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

// --- Delete confirmation (used inside Modal) ---

export const ConfirmMessage = styled.p`
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ConfirmError = styled.p`
  margin: -8px 0 16px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
`;

export const DangerButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.danger};
  color: #2a0a0a;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

// --- Pagination (same shape as AdminRestaurantsScreen's) ---

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
