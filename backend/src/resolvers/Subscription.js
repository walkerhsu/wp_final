const Subscription = {
  itemCreated: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.subscribe("ITEM_CREATED");
    },
  },

  itemUpdated: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.subscribe("ITEM_UPDATED");
    },
  },
  itemDeleted: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.subscribe("ITEM_DELETED");
    },
  },
  categoryAdded: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.subscribe("CATEGORY_ADDED");
    },
  },
  commentAdded: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.subscribe("COMMENT_ADDED");
    }
  },
  commentUpdated: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.subscribe("COMMENT_UPDATED");
    }
  },
  likeListUpdated: {
    subscribe: (parent, args, { pubSub }) => {
      return pubSub.subscribe("LIKELIST_UPDATED");
    }
  },
};

export default Subscription;
