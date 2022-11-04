import mongoose from "mongoose";
import dotenv from "dotenv";
import findConfig from "find-config";

dotenv.config({ path: findConfig(".env") });
// const logger = require("./logger");

// TODO! change localDBName name to match your local db!!
const localDBName = "carhire";
const mongoAtlasUri =
  "mongodb+srv://admin:test123@cluster0.dc1milb.mongodb.net/?retryWrites=true&w=majority";

const { MONGODB_URI = `mongodb://localhost:27017/${localDBName}` } =
  process.env;

// console.log(`MONGODB_URI ${MONGODB_URI}`);

(async () => {
  try {
    const conn = await mongoose.connect(mongoAtlasUri);
    // console.log(`DB Connected to ${MONGODB_URI}`);
    console.log(`DB Connected to ${mongoAtlasUri}`);
    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  } catch (err) {
    console.log(`Connection error`, err);
  }
})();
