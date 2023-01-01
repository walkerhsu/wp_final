import { gql } from "@apollo/client";

export const GET_ITEMS_QUERY = gql`
  query GET_ITEMS_QUERY {
    items {
      id
      username
      name
      money
      category
      subCategory
      time
      description
    }
  }
`;
