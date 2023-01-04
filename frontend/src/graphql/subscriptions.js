import { gql } from "@apollo/client";

export const ITEM_CREATED_SUBSCRIPTION = gql`
  subscription ItemCreated {
    itemCreated {
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

export const ITEM_UPDATED_SUBSCRIPTION = gql`
  subscription ItemUpdated {
    itemUpdated {
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

export const ITEM_DELETED_SUBSCRIPTION = gql`
  subscription ItemUpdated {
    itemDeleted
  }
`;

export const CATEGORY_ADDED_SUBSCRIPTION = gql`
  subscription CategoryAdded {
    categoryAdded {
      categories {
        cat
        subcat
      }
    }
  }
`;

export const COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription CommentAdded {
    commentAdded {
      id
      name
      rating
      content
      likeNum
      likeList
    }
  }
`

export const COMMENT_UPDATED_SUBSCRIPTION = gql`
  subscription CommentUpdated {
    commentUpdated {
      id
      name
      rating
      content
      likeNum
      likeList
    }
  }
`

export const LIKELIST_UPDATED_SUBSCRIPTION = gql`
  subscription LikeListUpdated {
    likeListUpdated {
      id
      name
      rating
      content
      likeNum
      likeList
    }
  }
`
