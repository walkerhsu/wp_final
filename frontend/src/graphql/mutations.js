import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: UserInput!) {
    CreateUser(input: $input) {
      message
    }
  }
`;

export const VALIDATE_USER_MUTATION = gql`
  mutation ValidateUser($input: UserInput!) {
    ValidateUser(input: $input) {
      message
    }
  }
`;
