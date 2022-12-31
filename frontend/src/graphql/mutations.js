import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) 
  }
`;

export const VALIDATE_USER_MUTATION = gql`
  mutation validateUser($input: ValidateUserInput!) {
    validateUser(input: $input) 
  }
`;
