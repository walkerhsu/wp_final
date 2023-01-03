import hash from "../utils/hash.js";
// import defaultCategory from "../utils/defaultCategory.js"

const defaultCategories = [
  { cat: "Income", subcat: ["Salary", "Bonus", "Others"] },
  { cat: "Food", subcat: ["Breakfast", "Lunch", "Dinner", "Others"] },
  { cat: "Clothing", subcat: ["Shirt", "Pants", "Shoes", "Others"] },
  { cat: "Housing", subcat: ["Rent", "Mortgage", "Utilities", "Others"] },
  {
    cat: "Transport",
    subcat: [
      "Public Transportation",
      "Gas",
      "Parking",
      "Maintenance",
      "Others",
    ],
  },
  {
    cat: "Entertainment",
    subcat: ["Movies", "Games", "Sports", "Music", "Others"],
  },
  {
    cat: "Education",
    subcat: ["Books", "Tuition", "Cram School", "Supplies", "Others"],
  },
  {
    cat: "Necessities",
    subcat: ["Groceries", "Toiletries", "Cleaning Supplies", "Others"],
  },
  { cat: "Electronics", subcat: ["Phone", "Computer", "Tablet", "Others"] },
  { cat: "Health", subcat: ["Doctor", "Medicine", "Dental", "Gym", "Others"] },
  { cat: "Others", subcat: ["Others"] },
];

const Mutation = {
  createItem: async (parent, { input }, { itemModel, pubSub }) => {
    console.log(input);
    const newItem = new itemModel(input);
    await newItem.save();
    pubSub.publish("ITEM_CREATED", {
      itemCreated: newItem,
    });
    return newItem;
  },
  updateItem: async (parent, { input }, { itemModel, pubSub }) => {
    console.log(input);
    const item = await itemModel.findOneAndUpdate(
      { id: input.id },
      {
        $set: {
          username: input.username,
          name: input.name,
          money: input.money,
          category: input.category,
          subCategory: input.subCategory,
          time: input.time,
          description: input.description,
        },
      }
    );
    const newItem = {
      id: input.id ?? item.id,
      username: input.username ?? item.username,
      name: input.name ?? item.name,
      money: input.money ?? item.money,
      category: input.category ?? item.category,
      subCategory: input.subCategory ?? item.subCategory,
      time: input.time ?? item.time,
      description: input.description ?? item.description,
    };
    console.log(newItem);
    pubSub.publish("ITEM_UPDATED", {
      itemUpdated: newItem,
    });
    return newItem;
  },
  deleteItem: async (parent, { input }, { itemModel, pubSub }) => {
    console.log(input);
    await itemModel.deleteOne({ id: input });
    pubSub.publish("ITEM_DELETED", {
      itemDeleted: input,
    });
    return input;
  },
  createUser: async (parent, { input }, { userModel }) => {
    console.log(input);
    input.password = hash(input.password, input.salt ? input.salt : "");
    console.log(input.password);
    let newUser = await userModel.findOne({ username: input.username });
    if (!newUser) {
      console.log("create new user");
      newUser = new userModel(input);
      await newUser.save();
    } else {
      console.log("user already exists");
      return "User already exists";
    }
    /*
    pubSub.publish("USER_CREATED", {
      userCreated: newUser,
    });
    */
    console.log("User created");
    return "User created";
  },
  updateUser: async (parent, { input }, { userModel }) => {
    console.log(input);
    input.password = hash(input.password, input.salt ? input.salt : "");
    console.log(input.password);
    let User = await userModel.findOne({ username: input.username });
    if(User.password !== hash(input.curpassword, User.salt)) return "Password incorrect";
    delete input.curpassword;
    input.email = User.email;
    if(!User) return "error";
    await userModel.deleteOne(User)
    const newUser = new userModel(input);
    await newUser.save();
    return "User password updated";
  },
  validateUser: async (parent, { input }, { userModel }) => {
    console.log(input);
    let User = await userModel.findOne({ username: input.username });
    if (!User) {
      console.log("user not found");
      return "User not found";
    } else {
      console.log("user found");
      if (User.password === hash(input.password, User.salt)) {
        console.log("password correct");
        return "Welcome!";
      } else {
        console.log("password incorrect");
        return "Password incorrect";
      }
    }
  },
  createCategory: async (parent, { input }, { categoryModel, pubSub }) => {
    console.log(input.username);
    let newCategory = await categoryModel.findOne({ username: input.username });
    if (!newCategory) {
      console.log("create new category");
      newCategory = new categoryModel({
        username: input.username,
        categories: defaultCategories,
      });
      await newCategory.save();
    }
    return newCategory;
  },
  addNewCategory: async (parent, { input }, { categoryModel, pubSub }) => {
    console.log(input);
    
    let newCategory = await categoryModel.findOne({ username: input.username })
    if (!newCategory) {
      console.log("no category");
      return;
    }
    const newCategories = newCategory.categories;
    newCategories.splice(newCategories.length - 1, 0, {
      cat: input.category,
      subcat: [input.subCategory, "Others"],
    });
    newCategory = await categoryModel.findOneAndUpdate(
      {
        username: input.username,
      },
      {
        $set: {
          categories: newCategories,
        },
      },
      { new: true }
    );
    console.log("Category added");
    pubSub.publish("CATEGORY_ADDED", {
      categoryAdded: newCategory,
    });
    return newCategory;
  },
};

export default Mutation;
