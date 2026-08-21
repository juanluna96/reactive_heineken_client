import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronLeft, FaChevronRight, FaRegCalendar } from 'react-icons/fa6';
import styled, { css } from 'styled-components';
import { TABLET_BREAKPOINT } from '../../styles/breakpoints';

export const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Icon = styled.span`
  display: flex;
  width: 12px;
  height: 12px;
  color: ${({ theme }) => theme.colors.mutedText};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Trigger = styled.button<{ $hasError: boolean; $hasValue: boolean }>`
  display: block;
  width: 100%;
  height: 56px;
  padding: 0 41px 0 17px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme, $hasError }) => ($hasError ? theme.colors.danger : theme.colors.cardBorder)};
  background: ${({ theme }) => theme.colors.inputBackground};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 16px;
  text-align: left;
  color: ${({ theme, $hasValue }) => ($hasValue ? theme.colors.white : theme.colors.placeholderText)};
  cursor: pointer;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandGreenLight};
  }
`;

export const CalendarIcon = styled(FaRegCalendar)`
  position: absolute;
  top: 50%;
  right: 17px;
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.colors.placeholderText};
  transform: translateY(-50%);
  pointer-events: none;
`;

export const ErrorText = styled(motion.span)`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.danger};
`;

// Anchored dropdown under the field at tablet/desktop widths, same as
// AutocompleteField's Dropdown. Below TABLET_BREAKPOINT it instead becomes a
// full-viewport dimmed layer that flex-centers the Popover card — a
// centered modal reads much better than a cramped anchored dropdown on a
// phone screen. Positioning lives here (on the wrapper), not on Popover
// itself, so framer-motion is free to own Popover's `transform` for the
// entrance animation without a CSS `transform: translate(...)` fighting it.
export const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    position: fixed;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.6);
    pointer-events: auto;
  }
`;

export const Popover = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  pointer-events: auto;

  @media (max-width: ${TABLET_BREAKPOINT}) {
    position: static;
    width: 100%;
    max-width: 360px;
  }
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.05);
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.brandGreenLight};
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const PrevIcon = styled(FaChevronLeft)``;
export const NextIcon = styled(FaChevronRight)``;

export const MonthYearSelects = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
`;

export const MonthSelectWrapper = styled.div`
  position: relative;
  flex: 1.4;
  min-width: 116px;
`;

export const YearSelectWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  min-width: 92px;
`;

const selectStyles = css`
  appearance: none;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 8px 30px 8px 14px;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 13px;
  font-weight: 700;
  text-align: left;
  text-transform: capitalize;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandGreenLight};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandGreenLight};
  }
`;

// Trigger buttons for the month/year custom dropdowns below — replacing
// native <select>/<option>, whose option popup is rendered by the OS and
// can't be styled via CSS at all.
export const MonthSelect = styled.button`
  ${selectStyles}
`;

export const YearSelect = styled.button`
  ${selectStyles}
`;

export const SelectChevron = styled(FaChevronDown)`
  position: absolute;
  top: 50%;
  right: 12px;
  width: 10px;
  height: 10px;
  color: ${({ theme }) => theme.colors.mutedText};
  transform: translateY(-50%);
  pointer-events: none;
`;

export const OptionsDropdown = styled(motion.ul)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 10;
  max-height: 220px;
  overflow-y: auto;
  padding: 8px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
  list-style: none;

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
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme, $highlighted }) => ($highlighted ? theme.colors.surface : 'transparent')};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
`;

export const WeekdayLabel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

export const DayButton = styled.button<{ $isCurrentMonth: boolean; $isToday: boolean; $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  color: ${({ theme, $isCurrentMonth }) => ($isCurrentMonth ? theme.colors.textPrimary : theme.colors.placeholderText)};

  ${({ $isToday, theme }) =>
    $isToday &&
    css`
      box-shadow: inset 0 0 0 1px ${theme.colors.cardBorder};
    `}

  ${({ $isSelected, theme }) =>
    $isSelected &&
    css`
      background: ${theme.colors.brandGreen};
      color: ${theme.colors.ctaText};
      font-weight: 700;
    `}

  &:hover:not(:disabled) {
    background: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.brandGreen : theme.colors.surface)};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
