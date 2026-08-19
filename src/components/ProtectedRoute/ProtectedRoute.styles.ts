import styled from 'styled-components';

export const LoadingScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  background: #131313;
`;

export const LoadingText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mutedText};
`;
