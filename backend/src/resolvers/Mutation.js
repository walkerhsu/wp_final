import hash from "../utils/hash.js"

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
  createUser: async (parent, { input }, { userModel }) => {
    console.log(input)
    input.password = hash(input.password, input.salt?input.salt:'')
    console.log(input.password)
    let newUser = await userModel.findOne({ username: input.username });
    if (!newUser) {
      console.log("create new user")
      newUser = new userModel(input);
      await newUser.save();
    }
    else {
      console.log("user already exists")
      return "User already exists";
    }
    /*
    pubSub.publish("USER_CREATED", {
      userCreated: newUser,
    });
    */
    console.log("User created")
    return "User created";
  },
  validateUser: async (parent, { input }, { userModel }) => {
    console.log(input)
    let User = await userModel.findOne({ username: input.username });
    if (!User) {
      console.log("user not found")
      return "User not found";
    }
    else {
      console.log("user found")
      if (User.password === hash(input.password, User.salt)) {
        console.log("password correct")
        return "Welcome!";
      }
      else {
        console.log("password incorrect")
        return "Password incorrect";
      }
    }
  },
};

export default Mutation;
