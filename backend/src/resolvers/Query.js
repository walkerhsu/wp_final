const Query = {
    items: async (parent, args, {itemModel}) => {
    const items = await itemModel.find().sort();
    console.log(items)
      return items;
    },
};

export default Query;
