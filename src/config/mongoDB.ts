import mongoose from "mongoose";
import "dotenv/config";

export const mongoConnect = async () => {
  const DB_URI_LOCAL = <string>process.env.DB_URI_LOCAL;
  try {
    await mongoose.connect(DB_URI_LOCAL);
    console.log("DB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB\n", error);
  }
};

// export const mongoConnect = async () => {
//   const DB_URI_CLOUD = <string>process.env.DB_URI_CLOUD;
//   try {
//     await mongoose.connect(DB_URI_CLOUD);
//     console.log("DB connected");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB\n", error);
//   }
// };