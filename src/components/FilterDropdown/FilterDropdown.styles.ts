import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa6';
import styled from 'styled-components';
import { ADMIN_MOBILE_BREAKPOINT } from '../AdminSidebar';

// Same pill shape as the admin filter selects it replaces (cardBackground,
// radii.md, 10px 14px padding, 8px gap, brandGreenLight icon/chevron,
// textPrimary/12px label) — but a real trigger + custom option list instead
// of a native <select>, whose OS-rendered option popup can't be styled.
export const Container = styled.div`
  position: relative;

  @media (max-width: ${ADMIN_MOBILE_BREAKPOINT}) {
    width: 100%;
  }
`;

export const Trigger = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.cardBackground};
  color: ${({ theme }) => theme.colors.brandGreenLight};
  cursor: pointer;

  &:focus-visible {
    outline: none;
  }
`;

export const Icon = styled.span`
  display: flex;
  flex-shrink: 0;
  width: 12px;
  height: 12px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Label = styled.span`
  flex: 1;
  min-width: 0;
  text-align: left;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: inherit;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Chevron = styled(FaChevronDown)<{ $open: boolean }>`
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  transition: transform 0.2s ease;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
`;

export const OptionsDropdown = styled(motion.ul)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 10;
  min-width: 100%;
  max-width: 280px;
  max-height: 260px;
  overflow-y: auto;
  margin: 0;
  padding: 8px;
  list-style: none;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.brandGreenLight} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.brandGreenLight};
    border-radius: ${({ theme }) => theme.radii.pill};
  }
`;

export const OptionItem = styled.li<{ $highlighted: boolean }>`
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: inherit;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme, $highlighted }) => ($highlighted ? theme.colors.surface : 'transparent')};
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;
