import mongoose from "mongoose";
import { dataInit } from "./upload.js";

import "dotenv-defaults/config.js";

mongoose.set("strictQuery", true);

async function connect() {
  // TODO 1 Connect to your MongoDB and call dataInit()
        if (!process.env.MONGO_URL) {
            console.error("Missing MONGO_URL!!!");
            process.exit(1);
        }
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(async(res) => {
          console.log("mongo db connection created")
          dataInit();
        });
        mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  // TODO 1 End
}

export default { connect };
