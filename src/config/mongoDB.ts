import mongoose from "mongoose";
import "dotenv/config";

const mongoConnect = async () => {
  const DB_URI_LOCAL = <string>process.env.DB_URI_LOCAL;
  try {
    await mongoose.connect(DB_URI_LOCAL);
    console.log("DB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    console.error(error);
  }
};
export default mongoConnect;
