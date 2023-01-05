import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    content: { type: String, required: true },
    likeNum: { type: Number, required: true },
    likeList: { type: Array, required: true },
  },
  {
    collection: "comment",
  }
);

export default mongoose.model("comment", commentSchema);
