import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  {
    collection: "category",
  }
);

export default mongoose.model("category", categorySchema);
