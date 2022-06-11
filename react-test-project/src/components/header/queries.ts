import { gql } from '@apollo/client';

export const getCurrencyQuery = () => gql`
  {
    currencies {
      label
      symbol
    }
  }
`;
