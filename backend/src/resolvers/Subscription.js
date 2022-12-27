const Subscription = {
  itemCreated: {
    subscribe: (parent, args, {pubSub}) => {
      return pubSub.subscribe('ITEM_CREATED');
    },
  },

  itemUpdated: {
    subscribe: (parent, args, {pubSub}) => {
      return pubSub.subscribe('ITEM_UPDATED');
    },
  },
  itemDeleted: {
    subscribe: (parent, args, {pubSub}) => {
      return pubSub.subscribe('ITEM_DELETED');
    },
  },
};

export default Subscription;
