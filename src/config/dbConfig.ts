import mongoose from "mongoose";
import { envConfig } from "./config";

async function dbConfig() {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database Connected!");
    });
    await mongoose.connect(envConfig.dbConnectionString as string);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default dbConfig;
