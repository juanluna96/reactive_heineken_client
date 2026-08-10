import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const Dots = styled.div`
  display: flex;
  gap: 8px;
`;

export const Dot = styled.span<{ $active: boolean }>`
  width: 32px;
  height: 6px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $active }) => ($active ? theme.colors.brandGreenLight : theme.colors.cardBorder)};
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
