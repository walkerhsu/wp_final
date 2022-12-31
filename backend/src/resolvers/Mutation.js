const Mutation = {
  createItem: async (parent, { input }, { itemModel, pubSub}) => {
    const newItem = new itemModel(input);
    await newItem.save();
    pubSub.publish("ITEM_CREATED", {
      itemCreated: newItem,
    });
    return newItem;
  },

  updateItem: async (parent, { input }, { itemModel, pubSub}) => {
    const item = await itemModel.findOneAndUpdate(
      { id: input.id },
      {
        $set: {
          name: input.name,
          amount: input.amount,
          category: input.category,
          date: input.date,
          description: input.description,
        },
      }
    );
    const newItem = {
      id: input.id ?? item.id,
      name: input.name ?? item.name,
      amount: input.amount ?? item.amount,
      category: input.category ?? item.category,
      date: input.date ?? item.date,
      description: input.description ?? item.description,
    }
    pubSub.publish("ITEM_UPDATED", {
      itemUpdated: newItem,
    });
    return newItem;
  },
  deleteItem: async(parent, { input }, { itemModel, pubSub }) => {
    await itemModel.deleteOne({ id: input });
    pubSub.publish("ITEM_DELETED", {
      itemDeleted: input,
    });
    return input;
  },
  createUser: async (parent, { input }, { userModel, pubSub}) => {
    const newUser = new userModel(input);
    await newUser.save();
    /*
    pubSub.publish("USER_CREATED", {
      userCreated: newUser,
    });
    */
    return "User created";
  },
};

export default Mutation;
