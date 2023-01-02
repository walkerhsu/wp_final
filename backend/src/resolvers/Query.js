const Query = {
    items: async (parent, args, {itemModel}) => {
    const items = await itemModel.find().sort();
    console.log(items)
      return items;
  },
  category: async (parent, { username }, { categoryModel }) => {
    const categories = await categoryModel.findOne({username: username});
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
  }
};

export default Query;
