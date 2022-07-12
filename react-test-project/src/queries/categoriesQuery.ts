import { gql } from '@apollo/client';

export const getCategoriesQuery = () => gql`
  {
    categories {
      name
    }
  }
`;
