import styled from 'styled-components';

import { ADMIN_MOBILE_BREAKPOINT } from '../AdminSidebar';

const NARROW_BREAKPOINT = ADMIN_MOBILE_BREAKPOINT;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Subject = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.brandGreenLight};
`;

export const Intro = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const TableScroll = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 260px;
  font-variant-numeric: tabular-nums;
`;

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 10px;
  padding-bottom: 6px;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.mutedText};
  opacity: 0.8;

  span:not(:first-child) {
    text-align: right;
    min-width: 40px;
  }
`;

export const Row = styled.div<{ $muted?: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 10px;
  padding: 7px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  font-size: 12px;
  color: ${({ theme, $muted }) => ($muted ? theme.colors.mutedText : theme.colors.textPrimary)};

  span:not(:first-child) {
    text-align: right;
    min-width: 40px;
  }
`;

export const StaffRow = styled(Row)`
  grid-template-columns: 1fr auto;
`;

export const StaffHeaderRow = styled(HeaderRow)`
  grid-template-columns: 1fr auto;
`;

export const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
`;

export const LabelText = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PendingTag = styled.span`
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-size: 8px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(255, 179, 71, 0.16);
  color: ${({ theme }) => theme.colors.accentWarm};
`;

export const CountRow = styled.div`
  padding-top: 8px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const TotalRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding-top: 12px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  font-variant-numeric: tabular-nums;

  @media (max-width: ${NARROW_BREAKPOINT}) {
    flex-wrap: wrap;
  }
`;

export const TotalLabel = styled.span`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: ${({ theme }) => theme.colors.mutedText};
`;

export const TotalValue = styled.span<{ $muted?: boolean }>`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme, $muted }) => ($muted ? theme.colors.accentWarm : theme.colors.brandGreenLight)};
`;

export const PartialHint = styled.p`
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.accentWarm};
`;

export const EmptyHint = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.mutedText};
`;
