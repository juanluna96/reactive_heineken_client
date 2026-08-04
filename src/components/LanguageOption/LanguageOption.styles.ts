import styled, { css } from 'styled-components';

export const Option = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 64px;
  padding: 12px 28px 12px 25px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  backdrop-filter: blur(10px);
  cursor: pointer;
  text-align: left;

  ${({ $selected, theme }) =>
    $selected &&
    css`
      border-color: ${theme.colors.brandGreenLight};
    `}
`;

export const Content = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Flag = styled.span`
  font-size: 24px;
  line-height: 32px;
`;

export const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.white};
`;

export const CheckIcon = styled.img<{ $selected: boolean }>`
  width: 20px;
  height: 20px;
  opacity: ${({ $selected }) => ($selected ? 1 : 0)};
  transition: opacity 0.2s ease;
`;
