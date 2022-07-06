import { gql } from '@apollo/client';

export const getCurrentProductDataQuery = (id: string) => gql`
  {
    product(id: "${id}") {
      id
      category
      name
      inStock
      gallery
      description
      attributes {
        name
        type
        items {
          displayValue
          value
        }
      }
      brand
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;
