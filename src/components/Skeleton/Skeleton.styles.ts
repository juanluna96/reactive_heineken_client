import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

export const Bar = styled.div<{ $width?: string; $height?: string; $radius?: string }>`
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height ?? '16px'};
  border-radius: ${({ $radius, theme }) => $radius ?? theme.radii.md};
  flex-shrink: 0;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.cardBackground} 25%,
    ${({ theme }) => theme.colors.cardBorder} 37%,
    ${({ theme }) => theme.colors.cardBackground} 50%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.6s ease-in-out infinite;
`;
