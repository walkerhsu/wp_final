import mongoose from "mongoose";

const responseSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    content: { type: String, required: true },
  },{
    collection: "response",
  }
);

export default mongoose.model("response", responseSchema);