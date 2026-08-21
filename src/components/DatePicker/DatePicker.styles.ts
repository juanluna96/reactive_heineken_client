import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaRegCalendar } from 'react-icons/fa6';
import styled, { css } from 'styled-components';

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

export const Popover = styled(motion.div)`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 10;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
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

const selectStyles = css`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 6px 8px;
  background: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 13px;
  font-weight: 700;
  text-transform: capitalize;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brandGreenLight};
    outline-offset: 1px;
  }

  option {
    color: #000;
    text-transform: capitalize;
  }
`;

export const MonthSelect = styled.select`
  ${selectStyles}
  flex: 1;
  min-width: 0;
`;

export const YearSelect = styled.select`
  ${selectStyles}
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
