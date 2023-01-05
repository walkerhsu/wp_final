import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

mongoose.set("strictQuery", true);

async function connect() {
  if (!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL!!!");
    process.exit(1);
  }
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async (res) => {
      console.log("mongo db connection created");
      dataInit();
    });
  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
  );
}

export default { connect };
