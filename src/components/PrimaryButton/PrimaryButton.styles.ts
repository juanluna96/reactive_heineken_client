import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.brandGreen};
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover,
  &:focus-visible {
    opacity: 0.8;
  }
`;

export const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.ctaText};
`;

export const Icon = styled.img`
  width: 12px;
  height: 12px;
`;
