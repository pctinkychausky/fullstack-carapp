import mongoose from "mongoose";
import dotenv from "dotenv";
import findConfig from "find-config";

dotenv.config({ path: findConfig(".env") });
// const logger = require("./logger");

// TODO! change localDBName name to match your local db!!
const localDBName = "car-rental";
const { MONGODB_URI = `mongodb://localhost:27017/${localDBName}` } =
  process.env;

console.log(`MONGODB_URI ${MONGODB_URI}`);

(async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`DB Connected to ${MONGODB_URI}`);
    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  } catch (err) {
    console.log(`Connection error`, err);
  }
})();
