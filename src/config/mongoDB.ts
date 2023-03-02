import mongoose from "mongoose";

const USERNAME = "devocamp";
const PASSWORD = "devocamp";
const dbName = "devocamp";

const mongoConnect = async () => {
  const DB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}aMh7N9S8Uetm9biy@cluster0.mbqycb3.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(DB_URI);
    console.log("DB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB");
    console.error(error);
  }
};
export default mongoConnect;
