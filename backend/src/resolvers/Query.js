const Query = {
    items: async (parent, { username }, {itemModel}) => {
      console.log("in")
    const items = await itemModel.find({username: username}).sort();
    console.log("items")
      return items;
  },
  category: async (parent, { username }, { categoryModel }) => {
    const categories = await categoryModel.findOne({ username: username });
    console.log("in query categories")
    console.log(categories)
    if (!categories) {
      console.log("no category");
      return {
        username: username,
        categories: [
          {
            cat: "",
            subcat: [""],
          }
        ]
      }
    }
    return categories;
  },
  comments: async (parent, args, { commentModel }) => {
    const comments = await commentModel.find();
    console.log(comments);
    return comments;
  }
};

export default Query;
