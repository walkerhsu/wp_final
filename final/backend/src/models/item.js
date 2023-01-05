import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    username: { type: String, required: true},
    name: { type: String, required: true },
    money: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true,  },
    time: { type: Date, required: true},
    description: String,
  },
  {
    collection: "item",
  }
);

export default mongoose.model("item", itemSchema);
