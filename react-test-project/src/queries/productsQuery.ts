import { gql } from '@apollo/client';

export const getProductsQuery = (title: string) => gql`
  {
    category(input: { title: "${title}" }) {
      name
      products {
        id
        name
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        category
        brand
      }
    }
  }
`;
