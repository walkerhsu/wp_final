import { gql } from "@apollo/client";

export const GET_ACCOUNT_QUERY = gql`
  query account($username: String!) {
    account(username: $username) {
      username
      hint
      email
    }
  }
`;

export const GET_ITEMS_QUERY = gql`
  query GET_ITEMS_QUERY ($username: String!){
    items (username: $username){
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

export const GET_CATEGORY_QUERY = gql`
  query category($username: String!) {
    category(username: $username) {
      categories {
        cat
        subcat
      }
    }
  }
`;

export const GET_COMMENTS_QUERY = gql`
  query getAllComments {
    comments {
      id
      name
      rating
      content
      likeNum
      likeList
    }
  }
`
