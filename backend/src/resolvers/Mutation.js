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
  { cat: "Add new category or subcategory", subcat: ["Others"] },
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
    input.password = hash(input.password, input.salt ? input.salt : "");
    let newUser = await userModel.findOne({ username: input.username });
    if (!newUser) {
      console.log("create new user");
      newUser = new userModel(input);
      console.log(newUser);
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
    return "User created";
  },
  updateUser: async (parent, { input }, { userModel, pubSub }) => {
    console.log(input);
    if (input.type === "password") {
      input.password = hash(input.password, input.salt ? input.salt : "");
      console.log(input.password);
      let User = await userModel.findOne({ username: input.username });
      if (User.password !== hash(input.curpassword, User.salt))
        return "Password incorrect";
      User = await userModel.findOneAndUpdate(
        { username: input.username },
        {
          $set: {
            password: input.password,
            salt: input.salt,
          }
        }
      );
      const newUser = {
        username:  input.username ?? User.username,
        hint: input.hint ?? User.hint,
        email: input.email ?? User.email,
      }
      pubSub.publish("USER_UPDATED", {
        userUpdated: newUser,
      });
      return "User password updated";
    } else if (input.type === "hint") {
      let User = await userModel.findOne({ username: input.username });
      if (User.password !== hash(input.curpassword, User.salt)) {
        return "Password incorrect";
      }
      User = await userModel.findOneAndUpdate(
        { username: input.username },
        { $set: { hint: input.hint } }
      );
      const newUser = {
        username:  input.username ?? User.username,
        hint: input.hint ?? User.hint,
        email: input.email ?? User.email,
      }
      // console.log("User hint updated");
      pubSub.publish("USER_UPDATED", {
        userUpdated: newUser,
      });
      return "User hint updated";
    } else if (input.type === "email") {
      let User = await userModel.findOne({ username: input.username });
      if (User.password !== hash(input.curpassword, User.salt)) {
        return "Password incorrect";
      }
      User = await userModel.findOneAndUpdate({ username: input.username }, { $set: { email: input.email } });
      // console.log("User email updated");
      const newUser = {
        username:  input.username ?? User.username,
        hint: input.hint ?? User.hint,
        email: input.email ?? User.email,
      }
      pubSub.publish("USER_UPDATED", {
        userUpdated: newUser,
      });
      return "User email updated";
    } 
  },
  validateUser: async (parent, { input }, { userModel }) => {
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
  validateHint: async (parent, { input }, { userModel }) => {
    let User = await userModel.findOne({ username: input.username });
    if (!User) {
      console.log("user not found");
      return "User not found";
    } else {
      console.log("user found");
      if (User.email === input.email) {
        console.log("email correct");
        return User.hint;
      } else {
        console.log("email incorrect");
        return "Email incorrect";
      }
    }
  },
  createCategory: async (parent, { input }, { categoryModel, pubSub }) => {
    let newCategory = await categoryModel.findOne({ username: input.username });
    if (!newCategory) {
      console.log("create new category");
      newCategory = new categoryModel({
        username: input.username,
        categories: defaultCategories,
      });
      await newCategory.save();
    }
    console.log(newCategory);
    return newCategory;
  },
  addNewCategory: async (parent, { input }, { categoryModel, pubSub }) => {
    let newCategory = await categoryModel.findOne({ username: input.username });
    if (!newCategory) {
      console.log("no category");
      return;
    }
    const newCategories = newCategory.categories;
    let newCategoryFlag = true;
    for (let i = 0; i < newCategories.length - 1; i++) {
      if (newCategories[i].cat.toLowerCase() === input.category.toLowerCase()) {
        console.log("Category already exists");
        newCategories[i].subcat.splice(
          newCategories[i].subcat.length - 1,
          0,
          input.subCategory
        );
        newCategoryFlag = false;
      }
    }
    if (newCategoryFlag) {
      console.log("Category not found");
      newCategories.splice(newCategories.length - 1, 0, {
        cat: input.category,
        subcat: [input.subCategory, "Others"],
      });
    }
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
  createComment: async (parent, { input }, { commentModel, pubSub }) => {
    const newComment = new commentModel({ ...input, likeList: [] });
    await newComment.save();
    console.log("New comment saved");
    pubSub.publish("COMMENT_ADDED", {
      commentAdded: newComment,
    });
    return newComment;
  },
  updateComment: async (parent, { input }, { commentModel, pubSub }) => {
    const updatedComment = await commentModel.findOneAndUpdate(
      { id: input.id },
      { likeNum: input.likeNum },
      { new: true }
    );
    console.log("Comment updated");
    pubSub.publish("COMMENT_UPDATED", {
      commentUpdated: updatedComment,
    });
    return updatedComment;
  },
  updateLikeList: async (parent, { input }, { commentModel, pubSub }) => {
    const Comment = await commentModel.findOne({ id: input.id });
    // console.log(likeList.likeList)
    let newLikeList = Comment.likeList;
    // console.log(newLikeList);
    // like --> dislike
    if (Comment.likeList.includes(input.username)) {
      newLikeList = newLikeList.filter(
        (username) => username !== input.username
      );
    }
    // dislike --> like
    else {
      newLikeList.push(input.username);
    }

    const newComment = await commentModel.findOneAndUpdate(
      { id: input.id },
      { likeList: newLikeList },
      { new: true }
    );
    console.log("likeList updated");
    pubSub.publish("LIKELIST_UPDATED", {
      likeListUpdated: newComment,
    });
    return newComment;
  },
  sendResponse: async (parent, { input }, { responseModel, pubSub }) => {
    const newResponse = new responseModel(input)
    await newResponse.save();
    console.log('response send')
    return newResponse;
  }
};

export default Mutation;
