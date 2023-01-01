import { gql } from '@apollo/client';

export const ITEM_CREATED_SUBSCRIPTION = gql`
  subscription ItemCreated {
    itemCreated {
      id
      username
      name
      amount
      category
      date
      description
    }
  }
`;

export const ITEM_UPDATED_SUBSCRIPTION = gql`
  subscription ItemUpdated {
    itemUpdated {
      id
      username
      name
      amount
      category
      date
      description
    }
  }
`;

export const ITEM_DELETED_SUBSCRIPTION = gql`
  subscription ItemUpdated {
    itemDeleted
  }
`;