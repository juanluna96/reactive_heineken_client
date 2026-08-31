import styled from 'styled-components';

/** Sits the country dial-code picker and the national-number field on one
 *  line. Both children render a single full-width root (S.Field), so they're
 *  sized here; they wrap to two lines only when the row gets very narrow. */
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 12px;
  width: 100%;

  & > *:first-child {
    flex: 1 1 120px;
  }

  & > *:last-child {
    flex: 2 1 168px;
  }
`;
